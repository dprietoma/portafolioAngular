import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoDescripcion } from 'src/app/entidades/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  producto: ProductoDescripcion;
  idProductos: string;
  constructor(
    private route: ActivatedRoute,
    private productoService: ProductosService
    ) {

    }

  ngOnInit() {

    this.route.params.subscribe( parametros => {
      this.productoService.getProductos(parametros['id']).subscribe( (producto: ProductoDescripcion) => {
      this.idProductos = parametros['id'];
      this.producto = producto;
      });
    });
  }

}
