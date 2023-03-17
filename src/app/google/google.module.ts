import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleRoutingModule } from './google-routing.module';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchResultImgComponent } from './search-result-img/search-result-img.component';


@NgModule({
  declarations: [SearchComponent, SearchResultComponent, SearchResultImgComponent],
  imports: [
    CommonModule,
    GoogleRoutingModule,
    FormsModule
  ]
})
export class GoogleModule { }
