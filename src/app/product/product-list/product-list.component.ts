import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductQuantityChange } from 'src/app/model/product-quantity-change';

@Component({
  selector: 'app-product-list',
  template: `
    <app-product-item
      [product]="product"
      (quantityChange)="onQuantityChange($event)"
      *ngFor="let product of products"
    ></app-product-item>
  `,
})
export class ProductListComponent implements OnInit {
  public products: Array<Product>;
  constructor() {}

  ngOnInit(): void {
    this.products = [
      {
        id: 1,
        name: 'aaa',
        imageUrl: 'http://via.placeholder.com/150x150',
        price: 300,
        isOnSale: true,
        quantityInCart: 0,
      },
      {
        id: 2,
        name: 'bbb',
        imageUrl: 'http://via.placeholder.com/150x150',
        price: 300,
        isOnSale: true,
        quantityInCart: 0,
      },
      {
        id: 3,
        name: 'ccc',
        imageUrl: 'http://via.placeholder.com/150x150',
        price: 300,
        isOnSale: true,
        quantityInCart: 0,
      },
    ];
  }

  onQuantityChange(change: ProductQuantityChange) {
    const product = this.products.find((prod) => {
      return change.product.id === prod.id;
    });
    product.quantityInCart += change.changeInQuantity;
  }
}
