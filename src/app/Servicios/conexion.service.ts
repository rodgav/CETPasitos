import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Usuario} from '../Data/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  private url0 = 'http://127.0.0.1/APICETPasitos/V1/';

  // private url0 = 'https://rsgm.online/APICETPasitos/V1/';

  constructor(protected http: HttpClient) {
  }

  servicio(object) {
    return this.http.post(this.url0, object).pipe(
      map(res => res));
  }

  login(loginObj): Observable<Usuario[]> {
    return this.http.post<Usuario[]>(this.url0, loginObj).pipe(
      map(res => res));
  }
}
