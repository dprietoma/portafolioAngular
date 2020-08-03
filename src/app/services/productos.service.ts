import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from 'src/app/entidades/producto.interface';



@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productoFiltrado: Producto[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

     return new Promise( (resolve, reject ) => {

       this.http.get('https://angular-html-9dc43.firebaseio.com/productos_idx.json').subscribe( (resp: Producto[]) => {
         this.productos = resp;
         setTimeout(() => {
           this.cargando = false;
         }, 2000);
         resolve();
        });
     });


  }

  getProductos(id: string) {
   return this.http.get(`https://angular-html-9dc43.firebaseio.com/productos/${id}.json`);

  }

  buscarProducto( termino: string) {

    if(this.productos.length === 0) {
      //cargar productos
      this.cargarProductos().then( () => {
        //ejecutar despues de tener los productos
        // aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      // aplicar filtro
      this.filtrarProductos(termino);
    }

  }

  private filtrarProductos(termino: string) {
    this.productoFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0) {
        this.productoFiltrado.push(prod);
      }
    });

  }


}
