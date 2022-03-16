import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductInfo } from '../../interfaces/product.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  prodID: string = '';
  prodInfo: ProductInfo = {};

  constructor( private route: ActivatedRoute,
              public productsService: ProductsService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe( params => {
      console.log(params['id']);
      this.productsService.getProduct(params['id'])
        .subscribe( (product: ProductInfo) => {
          console.log(product);
          this.prodID = params['id'];
          this.prodInfo = product;
        });

    })
  }

}
