import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarProductoComponent } from './editar-producto.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { ProductosService } from '../../../../services/productos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('EditarProductoComponent', () => {
  let component: EditarProductoComponent;
  let fixture: ComponentFixture<EditarProductoComponent>;
  let productosService: ProductosService;
  let formBuilder: FormBuilder;
  let httpMock: HttpTestingController;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [EditarProductoComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientModule,
        ReactiveFormsModule, 
        FormsModule
      ],
      providers: [
        ProductosService,
        FormBuilder
      ]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EditarProductoComponent);
    component = fixture.componentInstance;
    productosService = TestBed.inject(ProductosService); 
    formBuilder = TestBed.inject(FormBuilder); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('updateProductos should return success message and updated data', () => {
    const requestBody = {
      "name": "Admin Total",
      "description": "ROL PARA USUARIOS ADMINISTRADORES DE ÁREA CONTABLE",
      "logo": "will producto",
      "date_release": "2024-07-18",
      "date_revision": "2025-07-18"
    };

    const idProducto = 'uno';

    const expectedResponse = {
      "message": "Product updated successfully",
      "data": {
        "name": "Admin Total",
        "description": "ROL PARA USUARIOS ADMINISTRADORES DE ÁREA CONTABLE",
        "logo": "will producto",
        "date_release": "2024-07-18",
        "date_revision": "2025-07-18"
      }
    };

    // Realiza la llamada al método updateProductos
    productosService.upadateProductos(requestBody, idProducto).subscribe((response) => {
      expect(response).toEqual(expectedResponse); // Verifica que la respuesta sea la esperada
    });

    // Intercepta la solicitud HTTP PUT esperada y simula una respuesta
    const url = `http://localhost:3002/bp/products/${idProducto}`;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('PUT'); // Verifica que se hizo una solicitud PUT
    req.flush(expectedResponse); // Simula la respuesta del servidor
  });


});
