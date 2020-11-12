import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../shared/services/product.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  id: number;
  loading = true;
  productForm = new FormGroup({
    name: new FormControl(""),
    type: new FormControl(""),
    color: new FormControl("")
  });
  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.productService.GetProductById(this.id)
      .subscribe(productFromRest => {
      this.productForm.patchValue({
        name: productFromRest.name,
        type: productFromRest.type,
        color: productFromRest.color
      });
    });
  }

  save(){
   const product = this.productForm.value;
   product.id = this.id;
   this.productService.updateProduct(product)
     .subscribe(productUpdated =>{
       this.router.navigateByUrl('/products');
     });
    /*this.productForm.reset();
    */
  }

}
