import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor( private http: HttpClient,) { }

  getProductos() {
    const url = `http://localhost:3002/bp/products`;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }
  postProductos(body: object) {
    const url = `http://localhost:3002/bp/products`;
    const bodyrequest = JSON.stringify(body);
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(url, bodyrequest, { headers }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }
  upadateProductos(body: object, idProducto:any) {
    const url = `http://localhost:3002/bp/products/${idProducto}`;
    const bodyrequest = JSON.stringify(body);
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.put(url, bodyrequest, { headers }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  validarIdProducto(idProducto:any) {
    const url = `http://localhost:3002/bp/products/verification/${idProducto}`;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }
  deleteProductos(idProducto:any) {
    const url = `http://localhost:3002/bp/products/${idProducto}`;

    return this.http.delete(url).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }
}
