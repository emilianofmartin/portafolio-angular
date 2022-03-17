import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsInfo } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  loading = true;
  products: ProductsInfo[] = [];
  filteredProducts: ProductsInfo[] = [];

  constructor( private http: HttpClient) { 
    this.loadProducts();
  }

  private loadProducts() {
    return new Promise ( (resolve, reject) => {
      this.http.get('https://angular-html-eabb5-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe( (resp: any) => {
          console.log(resp);
          this.products = resp;
          this.loading = false;
          resolve(true);
        });     
    })

  }

  getProduct(id: string) {
    return this.http.get(`https://angular-html-eabb5-default-rtdb.firebaseio.com/productos/${ id }.json`);
  }

  searchProduct(term: string) {
    if(this.products.length === 0)
      this.loadProducts().then( () => {
        //Se ejecuta después de tener los productos => Aplicar filtro

      })
    else {
      this.filterProducts(term);
    }

    return(this.filteredProducts);
  }

  private filterProducts( term: string) {
    this.filteredProducts = this.products.filter(product => {
      const title = product.titulo.toLocaleLowerCase();
      const category = product.categoria.toLocaleLowerCase();

      return (title.indexOf(term.toLocaleLowerCase()) >= 0 || category.indexOf(term.toLocaleLowerCase()) >= 0);
    });
    /*
    this.filteredProducts = [];

    this.products.forEach( product => {
      if(product.categoria.includes(term) || product.titulo.includes(term)) {
        this.filteredProducts.push(product);
      }
    });
    */
  }
}
