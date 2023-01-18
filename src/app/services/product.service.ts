import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('assets/data.json');
  }

  getProduct(id: number): Observable<Product | undefined> {
    return this.httpClient
      .get<Product[]>(`assets/data.json`)
      .pipe(map((products) => products.find((p) => p.id === id)));
  }
}
