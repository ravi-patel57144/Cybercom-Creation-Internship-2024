import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  fetchCategoryUrl: string = environment.baseUrl + environment.fetchCategory;

  constructor(private http: HttpClient) {}

  fetchCategories() {
    return this.http.get(this.fetchCategoryUrl);
  }

  fetchCategoryById(id: number) {
    return this.http.get(this.fetchCategoryUrl + '/' + id);
  }

  addCategories(newProduct: any) {
    return this.http.post(this.fetchCategoryUrl, newProduct);
  }

  deleteCategories(id: number) {
    return this.http.delete(this.fetchCategoryUrl + '/' + id);
  }

  updateCategories(id: any, newProduct: any) {
    return this.http.put(this.fetchCategoryUrl + '/' + id, newProduct);
  }
}
