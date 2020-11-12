import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  productForm = new FormGroup({
    name: new FormControl(""),
    type: new FormControl(""),
    color: new FormControl("")
  });

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit() { }

  save() {
    const product = this.productForm.value;
    this.productService.addProduct(product).subscribe(() =>{
      this.router.navigateByUrl('/products');
    })
    this.productForm.reset();

  }

}
