import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class TablesStatService {

    private apiUrl = 'http://localhost/tablesStat.php';

    constructor(private http: HttpClient) {

    }

    getAllTablesStatus(): Observable<any> {
        return this.http.get(this.apiUrl);
      }

    postTablesStatus(data: any): Observable<any>{
        return this.http.post( this.apiUrl, data)
    }

    putTablesStatus(data: any): Observable<any>{
        return this.http.put(this.apiUrl, data)
    }

    deleteTablesStatus(categoryId: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}?id=${categoryId}`);
      }

}