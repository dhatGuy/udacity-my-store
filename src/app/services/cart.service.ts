import { Injectable } from '@angular/core';
import * as localforage from 'localforage';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../models/cartItem';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: CartItem[] = [];

  total = 0.0;

  constructor(private toastr: ToastrService) {
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

    this.toastr.success(`${product.name} added to cart`, 'Success', {
      timeOut: 2000,
    });
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
    const product = this.items.find((item) => item.id === id)!;
    this.items = this.items.filter((item) => item.id !== id);
    localforage.setItem('cart', this.items);

    this.toastr.success(`${product.name} removed from cart`, 'Success', {
      timeOut: 2000,
    });

    return this.items;
  }
}
