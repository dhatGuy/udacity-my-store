import { Component } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(private cartService: CartService) {}

  items: CartItem[] = [];

  ngOnInit(): void {
    this.getItems();
  }

  total() {
    return this.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  getItems() {
    this.items = this.cartService.getItems();
  }

  removeItem(id: number) {
    this.items = this.cartService.removeItem(id);
  }

  updateQuantity({ id, quantity }: { id: number; quantity: number }) {
    this.items = this.cartService.updateQuantity(id, quantity);
  }

  clearCart() {
    this.items = this.cartService.clearCart();
  }
}
