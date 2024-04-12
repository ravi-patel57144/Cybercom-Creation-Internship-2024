import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  fetchProductUrl: string = environment.baseUrl + environment.fetchProduct;

  constructor(private http: HttpClient) {}

  fetchProducts() {
    return this.http.get(this.fetchProductUrl);
  }

  fetchProductById(id: number) {
    return this.http.get(this.fetchProductUrl + '/' + id);
  }

  addProduct(newProduct: any) {
    return this.http.post(this.fetchProductUrl, newProduct);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.fetchProductUrl + '/' + id);
  }

  updateProduct(id: any, product: any) {
    return this.http.put(this.fetchProductUrl + '/' + id, product);
  }
}
