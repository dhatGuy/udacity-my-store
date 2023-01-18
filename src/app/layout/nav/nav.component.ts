import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  isOpen = false;

  constructor(public cartService: CartService) {}

  toggle = () => {
    return (this.isOpen = !this.isOpen);
  };

  getItems = () => {
    return this.cartService.getItems();
  };
}
