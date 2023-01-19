import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  constructor(private route: Router, private fb: FormBuilder) {}

  @Input() canCheckout = false;
  @Output() checkout = new EventEmitter();
  submitted = false;
  checkoutForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
        ),
      ],
    ],
    phone: [
      '',
      [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(10),
        Validators.pattern('^[0-9]+$'),
      ],
    ],
    address: this.fb.group({
      country: ['', Validators.required],
      zip: [
        '',
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.minLength(6),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
    }),
    card: this.fb.group({
      number: [
        '',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      expiryDate: [
        '',
        [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      ],
      cvv: [
        '',
        [
          Validators.required,
          Validators.maxLength(3),
          Validators.minLength(3),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
    }),
  });
  onCheckout() {
    this.submitted = true;

    if (this.checkoutForm.invalid) {
      return;
    }

    this.checkout.emit();
    this.route.navigateByUrl('/order-success', {
      state: { from: 'checkout' },
    });
  }
}
