import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class FoodCategoriesService {

    private apiUrl = 'http://localhost/categoriesFood.php';

    constructor(private http: HttpClient) {

    }

    getAllFoodCategories(): Observable<any> {
        return this.http.get(this.apiUrl);
      }

    postFoodCategories(data: any): Observable<any>{
        return this.http.post( this.apiUrl, data)
    }

    putFoodCategories(data: any): Observable<any>{
        return this.http.put(this.apiUrl, data)
    }

    deleteFoodCategories(categoryId: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}?id=${categoryId}`);
      }

    insertFoodCategory(category: any): Observable<any> {
      return this.http.post(this.apiUrl, category);
    }

}