import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../model/product';
import { ProductQuantityChange } from '../../model/product-quantity-change';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() public product: Product;
  @Output() private quantityChange: EventEmitter<
    ProductQuantityChange
  > = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  increment() {
    this.quantityChange.emit({ product: this.product, changeInQuantity: 1 });
  }

  decrement() {
    this.quantityChange.emit({ product: this.product, changeInQuantity: -1 });
  }
}
