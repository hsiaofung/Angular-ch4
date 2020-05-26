import { ProductListComponent } from './product-list.component';
import { Product } from '../../model/product';
import { async } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ProductItemComponent } from '../product-item/product-item.component';
import { By } from '@angular/platform-browser';

describe('Product List Componet', () => {
  describe('Isolated unit test', () => {
    it('should create 3 products on init', () => {
      const component = new ProductListComponent();
      component.ngOnInit();
      expect(component.products.length).toEqual(3);
    });

    it('should find update quantity onQuantityChange', () => {
      const component = new ProductListComponent();
      component.ngOnInit();

      // 初始，產品數量都為0
      assertProducts(component.products, [0, 0, 0]);

      // 增加id=2的產品的數量2筆到購物車。
      component.onQuantityChange({
        changeInQuantity: 2,
        product: getProduct(2),
      });
      // id=2的產品的購物車應新增2筆。
      assertProducts(component.products, [0, 2, 0]);

      // 再增加id=2的產品的數量2筆到購物車。
      component.onQuantityChange({
        changeInQuantity: 2,
        product: getProduct(2),
      });
      // 再增加id=1的產品的數量1筆到購物車。
      component.onQuantityChange({
        changeInQuantity: 1,
        product: getProduct(1),
      });
      // id=2的產品的購物車應為4筆，id=1的產品應為1筆。
      assertProducts(component.products, [1, 4, 0]);

      // id=2的產品在購物車減少3筆。
      component.onQuantityChange({
        changeInQuantity: -3,
        product: getProduct(2),
      });
      // id=2的產品的購物車應為1筆，id=1的產品應為1筆。
      assertProducts(component.products, [1, 1, 0]);
    });

    function assertProducts(products, expectedQuantities) {
      expect(products[0].id).toEqual(1);
      expect(products[0].quantityInCart).toEqual(expectedQuantities[0]);
      expect(products[1].id).toEqual(2);
      expect(products[1].quantityInCart).toEqual(expectedQuantities[1]);
      expect(products[2].id).toEqual(3);
      expect(products[2].quantityInCart).toEqual(expectedQuantities[2]);
    }

    function getProduct(id: number): Product {
      return {
        id: id,
        name: 'Test Product',
        imageUrl: 'Random Image',
        isOnSale: false,
        price: 100,
        quantityInCart: 0,
      };
    }
  });
  describe('Angular tests', () => {
    let fixture, componet;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ProductListComponent, ProductItemComponent],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ProductListComponent);
      componet = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render three product list items', () => {
      const productItems = fixture.debugElement.queryAll(
        By.css('app-product-item')
      );
      expect(productItems.length).toEqual(3);
      assertProduct(productItems[0], 'aaa', 300, 0);
      assertProduct(productItems[1], 'bbb', 200, 0);
      assertProduct(productItems[2], 'ccc', 100, 0);
    });
    function assertProduct(element, name, price, qty) {
      const nameEl = element.query(By.css('.name'));
      expect(nameEl.nativeElement.textContent).toEqual(name);
      const priceEl = element.query(By.css('.price'));
      expect(priceEl.nativeElement.textContent).toEqual('$ ' + price);
      const qtyEl = element.query(By.css('.qty'));
      expect(qtyEl.nativeElement.textContent).toEqual(qty + '');
    }
  });
});
