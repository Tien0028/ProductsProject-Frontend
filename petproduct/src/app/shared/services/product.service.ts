import { Injectable } from '@angular/core';
import {Product} from '../models/product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {environment} from '../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //handle data
  products: Product[];
  id = 1;
  apiUrl = environment.apiEndPoint + "product";

  constructor(private http: HttpClient, private authenService: AuthenticationService) {
    //this.products = [
    //{id: this.id++, name: "Chocolate Ice Cream", color: "Brown", price: 200, type: "Ice Cream", createDate: new Date("2020-10-30")},
    //{id: this.id++, name: "Vanilla Froyo", color: "White", price: 1, type: 'Yogurt', createDate: new Date("2020-05-05")},
    //{id: this.id++, name: "Chilli Corn Dog", color: "Red", price: 12, type: 'Snack', createDate: new Date("1999-01-01")},
    //{id: this.id++, name: "Ice Cream Sandwich Box", color: "Indigo", price: 90, type: 'Treat', createDate: new Date("2012-07-08")}
    //];
  }

  getProducts(): Observable<Product[]> {
    //return this.http.get<Product[]>(this.apiUrl);
    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'Bearer ' + this.authenService.getToken());
    return this.http.get<Product[]>(this.apiUrl,httpOptions);
    //+ '/products/'
  }

  addProduct(product: Product): Observable<Product>{
    //todo it.
    return this.http.post<Product>(this.apiUrl, product);

    /*product.id = this.id++;
    this.products.push(product);*/
  }

  GetProductById(id:number): Observable<Product> {
    //return this.products.find(pro => pro.id === id);
    return this.http.get<Product>(this.apiUrl + '/' + id);
  }
  //CRUD
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl + product.id, product);
    /*const proToUpdate = this.products.find(pro => product.id === pro.id);
    const index = this.products.indexOf(proToUpdate);
    this.products[index] = product;
    return this.http.put<Product>(this.apiUrl + '/' + product.id, product);*/
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(this.apiUrl + '/' + id);

  }
}
