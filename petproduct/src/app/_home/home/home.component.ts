import { Component, OnInit } from '@angular/core';
import {Product} from '../../shared/models/product';
import {ProductService} from '../../shared/services/product.service';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  username: string;
  errormessage: string = "";

  constructor(private  productService: ProductService, private authService: AuthenticationService) {
    this.username = authService.getUsername();
  }

  ngOnInit(): void {
    // get users from secure api end point
    this.productService.getProducts().subscribe(products =>{
      this.products = products;
    },
      error => {
      this.errormessage = error.message;
      });
  }

}
