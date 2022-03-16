import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageInfoService } from '../../services/page-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public pageInfoService: PageInfoService,
               private router: Router) { }

  ngOnInit(): void {
  }

  searchProduct(term: string) {
    if(term.length < 1)
      return;

    console.log(term);
    this.router.navigate(['/search', term]);
    
  }
}
