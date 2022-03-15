import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageInfo } from '../interfaces/pageInfo.interface';
import { TeamInfo } from '../interfaces/teamInfo.interface';

@Injectable({
  providedIn: 'root'
})
export class PageInfoService {
  info: PageInfo = {}; //info: any = {};
  // En la interfaz ponemos los ? para que sean todos opcionales
  loaded: boolean = false;
  team: any = [];

  constructor(private http: HttpClient) { 

    console.log('pageInfo loaded!');
    this.loadInfo();
    this.loadTeam();
  }

  private loadInfo() {
    //https://angular-html-eabb5-default-rtdb.firebaseio.com/equipo.json
    //Read json file
    this.http.get('assets/data/data-page.json')
      .subscribe( (resp: PageInfo) => {
        this.loaded = true;
        this.info = resp;

        console.log(resp);
        //console.log(resp.twitter); Para que no tire error se puede:
        //                            a) Definirlo tipo any  .subscribe( (resp: any) => {
        //                            b) trabajarlo como array: console.log(resp['twitter'])
        console.log(resp.twitter);

      });
  }

  private loadTeam() {
    //Read json file
    this.http.get('https://angular-html-eabb5-default-rtdb.firebaseio.com/equipo.json')
      .subscribe( (resp: TeamInfo) => {
        this.team = resp;

        console.log(resp);
      });
  }
}
