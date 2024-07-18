import { CrearProductoComponent } from './crear-producto.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { ProductosService } from '../../../../services/productos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CrearProductoComponent', () => {
  let component: CrearProductoComponent;
  let fixture: ComponentFixture<CrearProductoComponent>;
  let productosService: ProductosService;
  let formBuilder: FormBuilder;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearProductoComponent],
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
    fixture = TestBed.createComponent(CrearProductoComponent);
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

  it('postProductos should return success message and data', () => {
    const requestBody = {
      "id": "dos",
      "name": "Operador_PE",
      "description": "wilooooooooooooo",
      "logo": "wwww",
      "date_release": "2024-07-18",
      "date_revision": "2025-07-18"
    };

    const expectedResponse = {
      "message": "Product added successfully",
      "data": {
        "id": "dos",
        "name": "Operador_PE",
        "description": "wilooooooooooooo",
        "logo": "wwww",
        "date_release": "2024-07-18",
        "date_revision": "2025-07-18"
      }
    };

    productosService.postProductos(requestBody).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toEqual('POST'); 
    req.flush(expectedResponse);
  });


});


