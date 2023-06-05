import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class TablesService {

    private apiUrl = 'http://localhost/tables.php';

    constructor(private http: HttpClient) {

    }

    getAllTables(): Observable<any> {
        return this.http.get(this.apiUrl);
      }

    postTables(data: any): Observable<any>{
        return this.http.post( this.apiUrl, data)
    }

    putTables(data: any): Observable<any>{
        return this.http.put(this.apiUrl, data) 
    }

    updateTables(tablesData: any): Observable<any> {
      return this.http.put(this.apiUrl, tablesData);
    }

    insertTables(tablesData: any): Observable<any> {
      return this.http.post(this.apiUrl, tablesData);
    }
  



      deleteTableS(IdTable: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}?id=${IdTable}`);
      }

}