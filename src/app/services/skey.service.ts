import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class skeyService {

    private apiUrl = 'http://localhost/skey.php';

    constructor(private http: HttpClient) {

    }

    getSkey(): Observable<any> {
        return this.http.get(this.apiUrl);
      }


}