import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

  export class DrinkService{

    private apiUrl = 'http://localhost/drinks.php';

    constructor(private http: HttpClient) { }

  getAllDrinkMenu(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  insertDrinkMenu(drinkMenuData: any): Observable<any> {
    return this.http.post(this.apiUrl, drinkMenuData);
  }

  updateDrinkMenu(drinkMenuData: any): Observable<any> {
    return this.http.put(this.apiUrl, drinkMenuData);
  }

  deleteDrinkMenu(drinkMenuId: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${drinkMenuId}`);
  }
    
  }