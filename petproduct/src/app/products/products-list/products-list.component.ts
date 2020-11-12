import { Component, OnInit } from '@angular/core';
import {Product} from '../../shared/models/product';
import {ProductService} from '../../shared/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    // use data
   this.refresh();

  }

  refresh() {
    this.productService.getProducts()
      .subscribe(listOfProducts => {
        this.products = listOfProducts;
      });
  }


  delete(id: number) {
    this.productService.deleteProduct(id).subscribe(message => {
      console.log('Delete product, got message: ' + message);
      this.refresh();
    });
    //this.products = this.productService.getProducts();
  }
}


