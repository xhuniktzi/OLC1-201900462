import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IReqInput } from './IReqInput';
import { IResOutput } from './IResOutput';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getApiData(input: IReqInput): Observable<IResOutput> {
    return this.http.post<IResOutput>(`${environment.API}/parse`, input);
  }
}
