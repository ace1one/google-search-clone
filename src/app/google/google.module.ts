import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleRoutingModule } from './google-routing.module';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';


@NgModule({
  declarations: [SearchComponent, SearchResultComponent],
  imports: [
    CommonModule,
    GoogleRoutingModule,
    FormsModule
  ]
})
export class GoogleModule { }
