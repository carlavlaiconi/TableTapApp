import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class DrinkCategoriesService {

    private apiUrl = 'http://localhost/categoriesDrinks.php';

    constructor(private http: HttpClient) {

    }

    getAllDrinkCategories(): Observable<any> {
        return this.http.get(this.apiUrl);
      }

    postDrinkCategories(data: any): Observable<any>{
        return this.http.post( this.apiUrl, data)
    }

    putDrinkCategories(data: any): Observable<any>{
        return this.http.put(this.apiUrl, data)
    }

    deleteDrinkCategories(categoryId: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}?id=${categoryId}`);
      }


}