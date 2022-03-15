import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductInfo } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  loading = true;
  products: ProductInfo[] = [];

  constructor( private http: HttpClient) { 
    this.loadProducts();
  }

  private loadProducts() {
    this.http.get('https://angular-html-eabb5-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( (resp: any) => {
        console.log(resp);
        this.products = resp;
        this.loading = false;
      });
  }
}
