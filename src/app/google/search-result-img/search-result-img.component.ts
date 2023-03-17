import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-search-result-img',
  templateUrl: './search-result-img.component.html',
  styleUrls: ['./search-result-img.component.scss']
})
export class SearchResultImgComponent implements OnInit {
@Input() searchImgList:any[]
  constructor() { }

  ngOnInit(): void {
  }




}
