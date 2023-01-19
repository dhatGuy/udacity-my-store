import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: CartItem[] = [
    {
      id: 2,
      name: 'Headphones',
      price: 249.99,
      url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Listen to stuff!',
      quantity: 1,
    },
  ];

  total = 0.0;

  constructor() {}

  addToCart(product: Product, quantity: number) {
    let item = this.items.find((item) => item.id === product.id);
    item
      ? (item.quantity += quantity)
      : this.items.push({
          ...product,
          quantity,
        });
  }

  updateQuantity(id: number, quantity: number) {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.quantity = quantity;
    }
    return this.items;
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  removeItem(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
    return this.items;
  }
}
