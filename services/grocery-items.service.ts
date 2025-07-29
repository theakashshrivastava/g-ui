import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroceryItem } from '../model/GroceryItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceryItemsService {

  private apiUrl = 'http://localhost:8080/admin/grocery-items';

  constructor(private http: HttpClient) {}

  getItems(): Observable<GroceryItem[]> {
    return this.http.get<GroceryItem[]>(this.apiUrl);
  }

  addItem(item: GroceryItem): Observable<string> {
    return this.http.post(this.apiUrl, item,{ responseType: 'text' });
  }

  updateItem(id: number, item: GroceryItem): Observable<string> {
    return this.http.put(`${this.apiUrl}/${id}`, item, {
      responseType: 'text' as const
    });
  }
  

  deleteItem(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text' as const
    });
  }

  updateStock(id: number, quantity: number): Observable<string> {
    return this.http.patch(`${this.apiUrl}/${id}/stock`, { stockQuantity: quantity }, {
      responseType: 'text' as const
    });
  }
  

}
