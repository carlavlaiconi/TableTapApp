import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class UsersService {

    private apiUrl = 'http://localhost/users.php';

    constructor(private http: HttpClient) {

    }

    getAllUsers(): Observable<any> {
        return this.http.get(this.apiUrl);
      }

    postUsers(data: any): Observable<any>{
        return this.http.post( this.apiUrl, data)
    }

    putUsers(data: any): Observable<any>{
        return this.http.put(this.apiUrl, data)
    }

    deleteUsers(categoryId: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}?id=${categoryId}`);
      }

}