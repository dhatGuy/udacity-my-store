import { Injectable } from '@angular/core';
import * as localforage from 'localforage';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cartItem';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = new BehaviorSubject<CartItem[]>([]);

  private items$ = this.items.asObservable();

  constructor(private toastr: ToastrService) {
    localforage.getItem('cart').then((value) => {
      value ? this.items.next(value as CartItem[]) : this.items.next([]);
    });
  }

  addToCart(product: Product, quantity: number) {
    let item = this.items.value.find((item) => item.id === product.id);
    item
      ? (item.quantity += quantity)
      : this.items.next([...this.items.value, { ...product, quantity }]);
    localforage.setItem('cart', this.items.value);

    this.toastr.success(`${product.name} added to cart`, 'Success', {
      timeOut: 2000,
    });
  }

  updateQuantity(id: number, quantity: number) {
    const newItems = this.items.value.map((item) => {
      if (item.id === id) {
        item.quantity = quantity;
      }
      return item;
    });
    this.items.next(newItems);
    localforage.setItem('cart', this.items);
    return this.items.value;
  }

  getItems() {
    return this.items$;
  }

  clearCart() {
    this.items.next([]);
    localforage.setItem('cart', this.items);
    return this.items.value;
  }

  removeItem(id: number) {
    const product = this.items.value.find((item) => item.id === id)!;
    this.items.next(this.items.value.filter((item) => item.id !== id));
    localforage.setItem('cart', this.items);

    this.toastr.success(`${product.name} removed from cart`, 'Success', {
      timeOut: 2000,
    });

    return this.items.value;
  }
}
