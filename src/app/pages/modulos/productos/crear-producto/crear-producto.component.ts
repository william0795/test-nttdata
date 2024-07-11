import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/pages/validator/custom-validators';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  formulario:any;
  fechaLiberacionTmp :any;
  constructor(
    private formBuilder: FormBuilder,
    private productoService:ProductosService,
    private router:Router
  ) {
    this.formulario = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)],[CustomValidators.idValidator(this.productoService)]],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      fechaLiberacion: ['', [Validators.required, this.fechaLiberacionValidator]],
      fechaRevision: ['', [Validators.required, this.fechaRevisionValidator]]
    });
  }

  ngOnInit() {
    
  }
  fechaLiberacionValidator(control: any) {
    const fechaLiberacion = new Date(control.value);
     // Aumentar la fecha de liberación en un día
     fechaLiberacion.setDate(fechaLiberacion.getDate() + 1);
    const hoy = new Date();
    console.log('fechaLiberacion:', fechaLiberacion);
    console.log('hoy:', hoy);

    return fechaLiberacion >= hoy ? null : { invalidFechaLiberacion: true };
  }

  
  fechaRevisionValidator = (control: any) => {
    if (!this.formulario) {
      return null;
    }

    const fechaLiberacion = new Date(this.formulario.get('fechaLiberacion')?.value);
    const fechaRevision = new Date(control.value);
    const unAnioDespues = new Date(fechaLiberacion);
    unAnioDespues.setFullYear(unAnioDespues.getFullYear() + 1);

    return fechaRevision.getTime() === unAnioDespues.getTime() ? null : { invalidFechaRevision: true };
  }

  return = () =>{
    this.router.navigateByUrl("productos/listar-productos")
  }

  onSubmit(customerData:any) {
    // this.formulario.reset();

    
    let objSend = {
      "id": customerData.id,
      "name": customerData.nombre,
      "description": customerData.descripcion,
      "logo": customerData.logo,
      "date_release": customerData.fechaLiberacion,
      "date_revision": customerData.fechaRevision
     }

    console.log('Your order has been submitted', customerData);
    console.log('Your order has been objSend', objSend);

    this.productoService.postProductos(objSend)
    .subscribe(resp =>{
      
      console.log(resp);
      this.router.navigateByUrl("productos/listar-productos")

    });

  }
  resetForm = ()=> {
    this.formulario.reset();
  }
}

