import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ListarComponent } from './listar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { ProductosService } from '../../../../services/productos.service';
import { By } from '@angular/platform-browser';

describe('ListarComponent', () => {
  let component: ListarComponent;
  let fixture: ComponentFixture<ListarComponent>;
  let productosService: ProductosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarComponent],
      imports: [RouterTestingModule, HttpClientModule], // Importa los módulos necesarios
      providers: [ProductosService] // Provee el servicio necesario
    }).compileComponents();

    fixture = TestBed.createComponent(ListarComponent);
    component = fixture.componentInstance;
    productosService = TestBed.inject(ProductosService); // Inyecta el servicio
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Ejemplo de prueba para getProductos()
  it('getProductos should populate listProductosBase', () => {
    const mockProductos = [
      { id: 1, name: 'Producto 1', description: 'Descripción del Producto 1' },
      { id: 2, name: 'Producto 2', description: 'Descripción del Producto 2' }
    ];

    // Utiliza jest.spyOn para simular la respuesta del servicio getProductos()
    jest.spyOn(productosService, 'getProductos').mockReturnValue(of({ data: mockProductos }));

    component.getProductos();

    expect(component.listProductosBase).toEqual(mockProductos);
  });

  it('should render listProductos', waitForAsync(() => {
    const mockProductos = [
      { id: 1, name: 'Producto 1', description: 'Descripción del Producto 1' },
      { id: 2, name: 'Producto 2', description: 'Descripción del Producto 2' }
    ];

    // Simula la respuesta del servicio getProductos()
    jest.spyOn(productosService, 'getProductos').mockReturnValue(of({ data: mockProductos }));

    // Llama a getProductos y espera a que se resuelva
    component.getProductos();
    fixture.detectChanges();

    // Espera a que Angular complete cualquier operación asíncrona
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const trs = fixture.debugElement.queryAll(By.css('tbody tr'));
      expect(trs.length).toBe(2);
    });
  }));

  // Agrega más pruebas según sea necesario para las funciones de tu componente
});
