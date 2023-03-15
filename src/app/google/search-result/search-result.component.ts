import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleSearchService } from 'src/app/services/google-search.service';
import { takeUntil } from "rxjs/operators";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit,OnDestroy {
  searchValue:any;
  paginator:any ={ searchParam :{q:null }}
  destoryed$ = new Subject<any>();
  constructor(private route: ActivatedRoute,private searchService:GoogleSearchService,) { }

  ngOnInit(): void {
    this.getSearchValue();
    this.getSearch();
  }

  getSearchValue(){
    this.route.queryParams.subscribe(params=>{
      const { q } = params;
      this.searchValue = q;
      this.paginator.searchParam.q = q;
    })
  }


  getSearch(){
    this.searchService.getsearchData(this.paginator)
    .pipe(takeUntil(this.destoryed$))
    .subscribe(res=>{
      console.log(res);
     // this.goToSearchPage()
    })
  }


  ngOnDestroy(): void {
    this.destoryed$.next(false);
    this.destoryed$.unsubscribe()
  }

}
