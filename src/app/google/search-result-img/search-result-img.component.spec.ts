import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultImgComponent } from './search-result-img.component';

describe('SearchResultImgComponent', () => {
  let component: SearchResultImgComponent;
  let fixture: ComponentFixture<SearchResultImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
