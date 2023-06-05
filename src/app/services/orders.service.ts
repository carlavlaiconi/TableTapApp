import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "src/models/order.model";

@Injectable({
    providedIn: 'root'
  })

export class OrderService {

    private apiUrl = 'http://localhost/orders.php';

    constructor(private http: HttpClient) {

    }

    getAllOrders(): Observable<any> {
        return this.http.get(this.apiUrl);
      }

    postOrders(data: any): Observable<any>{
        return this.http.post( this.apiUrl, data)
    }

    putOrders(data: any): Observable<any>{
        return this.http.put(this.apiUrl, data)
    }

    deleteOrders(categoryId: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}?id=${categoryId}`);
      }

}