import { Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
  @ViewChild('searchBarFocus') searchBarFocus: SearchResultComponent;
  searchValue:any;
  paginator:any ={ searchParam :{q:null,start:null,searchType:null }}
  destoryed$ = new Subject<any>();
  hasPrevious:boolean = false;
  pagination:any=[
    {number:1, value:null, isActive:true},
    {number:2, value:11, isActive:false},
    {number:3, value:21, isActive:false},
    {number:4, value:31, isActive:false},
    {number:5, value:41, isActive:false},
    {number:6, value:51, isActive:false},
    {number:7, value:61, isActive:false},
    {number:8, value:71, isActive:false},
    {number:9, value:81, isActive:false},
    {number:10, value:91, isActive:false},
  ]
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

  onSearch(){
    console.log( this.searchValue);
    
    this.paginator.searchParam.q = this.searchValue;
    this.paginator.searchParam.start = null
    this.getSearch()
  }


  searchList:any[]=[]
  searchImgList:any[]=[]
  searchInfo:any;
  getSearch(){
    this.searchList =[]
    this.searchService.getsearchData(this.paginator)
    .pipe(takeUntil(this.destoryed$))
    .subscribe(res=>{
      const { items,searchInformation }:any = res.body
      console.log(res);
      if(this.activeSearchTab === 'all'){
        this.searchList = items
      }else{
        this.searchImgList = items
      }

      this.searchInfo = searchInformation
     // this.goToSearchPage()
    })
  }



  ngOnDestroy(): void {
    this.destoryed$.next(false);
    this.destoryed$.unsubscribe()
  }


  isOptionAllClick:boolean = true;
  activeSearchTab:string ='all'
  onClickOption(prop:any){
    this.optionlist.forEach(element => {
      const { nativeElement }: any = element
      let className = document.getElementsByClassName(nativeElement.className);
      if (prop === nativeElement.className) {
        this.activeSearchTab = prop;
        className[0].classList.add('option')
        let svgClass = document.getElementsByClassName(className[0].children[0].className[1])
        console.log(className);
        className[0].classList.forEach(res => {
          if (res === 'option') {
            className[0].children[0].classList.add('active')
          } else {
            className[0].children[0].classList.remove('active')
          }
        })
      } else {
        className[0].children[0].classList.remove('active')
        className[0].classList.remove('option')
      }

    });

      if(prop === 'all'){
        this.paginator.searchParam.searchType = null;
      }else{
        this.paginator.searchParam.searchType = 'image';
      }
      this.paginator.searchParam.start = null
      this.getSearch()

   
  }

hasNext:boolean = true
  onClickPagination(number:number){
    if(number > 1){
      this.hasPrevious = true
    }else{
      this.hasPrevious = false
    }

    if(number >= 10){
      this.hasNext = false;
    }else{
      this.hasNext = true
    }
   this.pagination.forEach((element:any)=> {
    if(number === element.number){
      element.isActive = true
      this.paginator.searchParam.start = element.value
      this.getSearch()
    }else{
      element.isActive = false
    }
   });
  }


  onClickPaginationPrevNext(prop:string){
    let pageNumber:number=0
    let findCurrentPageNumber = this.pagination.find((obj:any)=> obj.isActive === true).number
    if(findCurrentPageNumber){
      
      if(prop === 'previous'){
        if(findCurrentPageNumber === 1){
          this.paginator.searchParam.start = null
        }else{
         pageNumber = findCurrentPageNumber - 1;
         let startNumber = this.pagination.find((obj:any)=>obj.number === pageNumber).value;
         this.paginator.searchParam.start = startNumber
        }
      }else{
        pageNumber = findCurrentPageNumber + 1;
        let startNumber = this.pagination.find((obj:any)=>obj.number === pageNumber).value;
        this.paginator.searchParam.start = startNumber
      }
  
     this.onClickPagination(pageNumber)
    }
   
  }
  onChangeSearchInput(){
    console.log(this.searchValue);
    
    if(this.searchValue){
      this.hasSearchValue = true
    }else{
      this.hasSearchValue = false;
    }
  }

hasSearchValue:boolean = true;
 onClickCross(){
  this.searchValue = null;
   if(this.searchValue){
    this.hasSearchValue = true;
   }else{
    this.hasSearchValue = false;
   }
  let elementID = document.getElementById('searchinput')?.focus()
   //elementID?.focus()
  }

}
