import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleSearchService {


  API_URL = `${environment.apiUrl}/customsearch/v1`;
  API_KEY = environment.apiKey;
  API_CX = environment.apiCX

  constructor(private http: HttpClient) { }

  getsearchData(param?:any): Observable<HttpResponse<any>> {
    let params = new HttpParams();
    params = params.append('key',this.API_KEY);
    params = params.append('cx',this.API_CX);
    if(param.searchParam.q) {
      params = params.append('q', param.searchParam.q);
    }
    if(param.searchParam.start) {
      params = params.append('start', param.searchParam.start);
    }
    if(param.searchParam.searchType) {
      params = params.append('searchType', param.searchParam.searchType);
    }
    return this.http.get<any>(this.API_URL, {params, observe: 'response'});
  }
}
