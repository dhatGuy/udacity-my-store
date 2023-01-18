import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Product[] = [];

  constructor() {}

  addToCart(product: Product, quantity: number) {
    console.log({
      ...product,
      quantity,
    });
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  removeItem(product: Product) {
    return this.items.filter((item) => item.id !== product.id);
  }
}
