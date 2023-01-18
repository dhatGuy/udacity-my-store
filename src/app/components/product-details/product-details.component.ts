import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  product?: Product;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  increaseQuantity = () => this.quantity++;

  decreaseQuantity = () => this.quantity > 1 && this.quantity--;

  getProduct() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService
      .getProduct(id)
      .subscribe((product) => (this.product = product));
  }

  goBack() {
    this.location.back();
  }

  addToCart() {
    this.cartService.addToCart(this.product!, this.quantity);
  }
}
