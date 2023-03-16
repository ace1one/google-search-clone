import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
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
  @ViewChildren('optionlist') optionlist!: QueryList<SearchResultComponent>;
  searchValue:any;
  paginator:any ={ searchParam :{q:null }}
  destoryed$ = new Subject<any>();
  constructor(private route: ActivatedRoute,private searchService:GoogleSearchService,) { 
   // this.optionlist =  '' as QueryList<SearchResultComponent>
  }

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


  searchList:any[]=[]
  searchInfo:any;
  getSearch(){
    this.searchService.getsearchData(this.paginator)
    .pipe(takeUntil(this.destoryed$))
    .subscribe(res=>{
      const { items,searchInformation }:any = res.body
      console.log(res);
      this.searchList = items
      this.searchInfo = searchInformation
     // this.goToSearchPage()
    })
  }


  ngOnDestroy(): void {
    this.destoryed$.next(false);
    this.destoryed$.unsubscribe()
  }


  isOptionClick:boolean = false;
  onClickOption(prop:any){

    // let xx = document.getElementsByClassName('a') as HTMLCollectionOf<HTMLElement>;
    // console.log(xx);
    
    this.optionlist.forEach(element => {
      const { nativeElement }:any = element
     // console.log(nativeElement.className);
    //  var elems  = document.querySelectorAll(nativeElement.className)
    //  console.log(elems);
     // console.log(document.);
     let className = document.getElementsByClassName(nativeElement.className);
     if(prop === nativeElement.className){
     
      className[0].classList.add('option')
   
      //svgClass. ='blue'
    // if(className[0].className == 'option'){
       let svgClass = document.getElementsByClassName(className[0].children[0].className[1])
       console.log(className);
       className[0].classList.forEach(res=>{
        if(res === 'option'){
          className[0].children[0].classList.add('active')
        }else{
          className[0].children[0].classList.remove('active')
        }
       })
    // }
   // console.log(className[0].children[0].className);
    
     // svgClass.
     //  this.optionlist.classList.add('option')
     }else{
      className[0].children[0].classList.remove('active')
      className[0].classList.remove('option')
     
    
     }
      
    });
      
      
   
  }

}
