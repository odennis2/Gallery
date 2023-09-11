import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://swwao.orbit.au.dk/grp-13/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    const url = `${this.apiUrl}/getallproducts`;
    return this.http.get<any[]>(url);
  }
  
  createProduct(name: string, image: File): Observable<any> {
    const url = `${this.apiUrl}/createproduct`;
    return this.http.post(url, {});
  }

  deleteProduct(productId: number): Observable<any> {
    console.log(productId);
    const url = `${this.apiUrl}/deleteproduct/${productId}`;
    return this.http.delete(url);
  }
}
