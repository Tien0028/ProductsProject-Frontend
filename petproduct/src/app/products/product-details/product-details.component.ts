import { Component, OnInit } from '@angular/core';
import {Product} from '../../shared/models/product';
import {ProductService} from '../../shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  err: any;
  id: number;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.GetProductById(id).subscribe(productFromRest => {
      this.product = productFromRest;
    })
  }

  delete() {
    this.productService.deleteProduct(this.id).pipe(
      catchError(err => {
        this.err = err;
        return err;
      })
    )
      .subscribe(() =>{
        this.router.navigateByUrl('products');
      })
  }

}
