import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  constructor(private productoService:ProductosService,private router:Router,) { }
  listProductos:any [] = [];
  listProductosBase:any [] = [];
  nameProductoElim = '';
  idProductoElim:any;

  cantidadMostrar = 5;

  toggleDropdown(i:any) {
    let objTxt = document.getElementById(`drop_${i}`) as HTMLTextAreaElement;
    if (objTxt) {
      if (objTxt.classList.contains('show')) {
        objTxt.classList.remove('show')
      } else {
        objTxt.classList.add('show')
      }
    }
  }
  ngOnInit(): void {
    
    this.getProductos ()

  }
  getProductos (){
    this.productoService.getProductos()
    .subscribe(resp =>{
      this.listProductosBase=resp['data']
      this.listProductos = this.listProductosBase.slice(0, this.cantidadMostrar);
      console.log(resp['data']);
    });
  }
  crearProducto(){
    console.log('crear producto')
    this.router.navigateByUrl("productos/crear-productos")
  }
  editarProducto(producto:any){
    localStorage.setItem('productoEdit', JSON.stringify(producto))
    this.router.navigateByUrl("productos/editar-productos/"+producto.id)
  }
  buscarPorTexto(event:any){
    let valSearch = event.target.value
    if (valSearch) {
      this.listProductos = this.listProductosBase.filter(p => p.name.toLowerCase().includes(valSearch.toLowerCase()))
    } else{
      this.listProductos =this.listProductosBase
    }


    console.log(event.target.value)
  }

  showTable(event:any){
    let value = event.target.value
    if (value > this.listProductosBase.length) {
      this.cantidadMostrar = this.listProductosBase.length
    } else {
      this.cantidadMostrar = event.target.value
    }
    console.log(event.target.value)
    this.listProductos = this.listProductosBase.slice(0, this.cantidadMostrar);
  }

  eliminarProducto(item:any){
    this.nameProductoElim = item.name
    this.idProductoElim = item.id
  
    this.openModal() 
  }

 openModal() {
  const modal = document.getElementById('eliminarProductoModal');
  if (modal) {
    modal.style.display = 'block';
  }
}

 closeModal() {
  const modal = document.getElementById('eliminarProductoModal');
  if (modal) {
    modal.style.display = 'none';
  }
}


confirmDelete() {
  this.productoService.deleteProductos(this.idProductoElim)
  .subscribe(resp =>{
    console.log('Producto eliminado');
    console.log(resp);
    this.closeModal();
    this.getProductos();
  });
  
}

}
