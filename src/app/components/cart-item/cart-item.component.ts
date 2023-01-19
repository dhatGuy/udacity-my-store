import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  constructor() {}

  @Input() item!: CartItem;
  @Output() removeItem = new EventEmitter<number>();
  @Output() updateQuantity = new EventEmitter<{
    id: number;
    quantity: number;
  }>();

  quantity: number = 1;

  ngOnChanges(): void {
    console.log(this.item);
  }
}
