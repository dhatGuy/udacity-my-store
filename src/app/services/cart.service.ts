import { Injectable } from '@angular/core';
import * as localforage from 'localforage';
import { CartItem } from '../models/cartItem';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: CartItem[] = [];

  total = 0.0;

  constructor() {
    localforage.getItem('cart').then((value) => {
      value ? (this.items = value as CartItem[]) : (this.items = []);
    });
  }

  addToCart(product: Product, quantity: number) {
    let item = this.items.find((item) => item.id === product.id);
    item
      ? (item.quantity += quantity)
      : this.items.push({
          ...product,
          quantity,
        });
    localforage.setItem('cart', this.items);
  }

  updateQuantity(id: number, quantity: number) {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.quantity = quantity;
    }
    localforage.setItem('cart', this.items);
    return this.items;
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    localforage.setItem('cart', this.items);
    return this.items;
  }

  removeItem(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
    localforage.setItem('cart', this.items);
    return this.items;
  }
}
