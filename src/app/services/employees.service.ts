import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class EmployeesService {

    private apiUrl = 'http://localhost/employees.php';

    constructor(private http: HttpClient) {

    }

    updateEmployee(employee: any): Observable<any> {
      return this.http.put(this.apiUrl, employee);
    }

    getAllEmployees(): Observable<any> {
        return this.http.get(this.apiUrl);
      }

    postEmployees(data: any): Observable<any>{
        return this.http.post( this.apiUrl, data)
    }

    putEmployees(data: any): Observable<any>{
        return this.http.put(this.apiUrl, data)
    }

    deleteEmployees(employee: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}?id=${employee}`);
      }

    insertEmployee(employee: any): Observable<any> {
      return this.http.post(this.apiUrl, employee);
    }

}