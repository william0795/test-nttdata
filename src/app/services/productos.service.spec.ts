import { TestBed } from '@angular/core/testing';
import { ProductosService } from './productos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Importa HttpTestingController si necesitas simular peticiones HTTP

describe('ProductosService', () => {
  let service: ProductosService;
  let httpMock: HttpTestingController; // Necesario si simulas peticiones HTTP

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule para usar HttpClient en pruebas
      providers: [ProductosService] // No necesitas proveer HttpClient manualmente
    });

    service = TestBed.inject(ProductosService);
    httpMock = TestBed.inject(HttpTestingController); // Inyecta HttpTestingController si necesitas simular peticiones HTTP
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones HTTP pendientes después de cada prueba
  });

  it('getProductos return listProducts', () => {
    const listProducts: any = {
      data: [
        {
          "id": "uno",
          "name": "Admin Total",
          "description": "ROL PARA USUARIOS ADMINISTRADORES DE ÁREA CONTABLE",
          "logo": "will producto",
          "date_release": "2024-07-18",
          "date_revision": "2025-07-18"
        }
      ]
    };

    service.getProductos().subscribe((resp) => {
      expect(resp).toEqual(listProducts);
    });

    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toEqual('GET');
    req.flush(listProducts);
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

    // Realiza la llamada al método postProductos
    service.postProductos(requestBody).subscribe((response) => {
      expect(response).toEqual(expectedResponse); // Verifica que la respuesta sea la esperada
    });

    // Intercepta la solicitud HTTP POST esperada y simula una respuesta
    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toEqual('POST'); // Verifica que se hizo una solicitud POST
    req.flush(expectedResponse); // Simula la respuesta del servidor
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
    service.upadateProductos(requestBody, idProducto).subscribe((response) => {
      expect(response).toEqual(expectedResponse); // Verifica que la respuesta sea la esperada
    });

    // Intercepta la solicitud HTTP PUT esperada y simula una respuesta
    const url = `http://localhost:3002/bp/products/${idProducto}`;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('PUT'); // Verifica que se hizo una solicitud PUT
    req.flush(expectedResponse); // Simula la respuesta del servidor
  });

  it('deleteProductos should return success message', () => {
    const idProducto = 'uno';

    const expectedResponse = {
      "message": "Product removed successfully"
    };

    // Realiza la llamada al método deleteProductos
    service.deleteProductos(idProducto).subscribe((response) => {
      expect(response).toEqual(expectedResponse); // Verifica que la respuesta sea la esperada
    });

    // Intercepta la solicitud HTTP DELETE esperada y simula una respuesta
    const url = `http://localhost:3002/bp/products/${idProducto}`;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('DELETE'); // Verifica que se hizo una solicitud DELETE
    req.flush(expectedResponse); // Simula la respuesta del servidor
  });

});
