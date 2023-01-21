import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  isOpen = false;
  numberOfItems = 0;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cartService
      .getItems()
      .subscribe((items) => (this.numberOfItems = items.length));
  }

  toggle = () => {
    return (this.isOpen = !this.isOpen);
  };

  getItems = () => {};
}
