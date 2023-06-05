import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class EmpRolesService {

    private apiUrl = 'http://localhost/empRoles.php';

    constructor(private http: HttpClient) {

    }

    getAllEmployeeRoles(): Observable<any> {
        return this.http.get(this.apiUrl);
      }

    postEmployeeRoles(data: any): Observable<any>{
        return this.http.post( this.apiUrl, data)
    }

    putEmployeeRoles(data: any): Observable<any>{
        return this.http.put(this.apiUrl, data)
    }

    deleteEmployeeRoles(categoryId: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}?id=${categoryId}`);
      }

}