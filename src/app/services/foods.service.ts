import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { foodItem } from "src/models/food.menu";


@Injectable({
    providedIn: 'root'
  })

  export class FoodService{

    private apiUrl = 'http://localhost/food.php';

    constructor(private http: HttpClient) { }

  getAllFoodMenu(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  insertFoodMenu(foodMenuData: any): Observable<any> {
    return this.http.post(this.apiUrl, foodMenuData);
  }

  updateFoodMenu(foodMenuData: any): Observable<any> {
    return this.http.put(this.apiUrl, foodMenuData);
  }

  deleteFoodMenu(foodMenuId: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${foodMenuId}`);
  }
    
  }