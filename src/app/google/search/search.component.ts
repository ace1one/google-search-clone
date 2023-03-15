import { Component, OnDestroy, OnInit } from '@angular/core';
import { GoogleSearchService } from 'src/app/services/google-search.service';
import { takeUntil } from "rxjs/operators";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit,OnDestroy {
  paginator:any ={ searchParam :{q:null }}
  destoryed$ = new Subject<any>();
  searchValue:any = null
  constructor(private searchService:GoogleSearchService,private router:Router) { }

  ngOnInit(): void {
    //this.getSearch()
  }


  // getSearch(){
  //   this.goToSearchPage()
  // }

  goToSearchPage(){
    this.router.navigateByUrl(`/search?q=${this.searchValue}`),{
      queryParams:{
        myParam: this.searchValue
      }
    }
  }


  showResult:boolean = false;
  onSearch(){
    this.goToSearchPage()
  }

  onClickTitle(titleName:string){
    //this.router.navigate(`wwww.${titleName}.com`)
    window.location.href = `http://${titleName}.com`;
  }


  ngOnDestroy(): void {
    this.destoryed$.next(false);
    this.destoryed$.unsubscribe()
  }

}
