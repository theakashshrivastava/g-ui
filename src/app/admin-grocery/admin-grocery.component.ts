import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroceryItem } from '../model/GroceryItem';
import { GroceryItemsService } from '../services/grocery-items.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';



@Component({
  selector: 'app-admin-grocery',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './admin-grocery.component.html',
  styleUrl: './admin-grocery.component.css'
})
export class AdminGroceryComponent {
  groceryForm!: FormGroup;
  items: GroceryItem[] = [];
  showForm = true;

  displayedColumns: string[] = ['name', 'price', 'stockQuantity', 'actions'];

  constructor(private fb: FormBuilder, private service: GroceryItemsService) { }

  ngOnInit(): void {
    this.groceryForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      stockQuantity: [0, Validators.required]
    });
    this.loadItems();
  }

  loadItems(): void {
    this.service.getItems().subscribe(data => this.items = data);
  }

  addItem(): void {
    const newItem = this.groceryForm.value;
    console.log(newItem);

    this.service.addItem(newItem).subscribe({
      next: (response: string) => {
        console.log('Server response:', response);
        this.loadItems();
        this.resetForm();
        this.showForm = false;
      },
      error: (error) => {
        console.error('Failed to add item:', error);

        alert('Oops! Something went wrong while adding the item.');
      }
    });
  }


  // updateItem(item: GroceryItem): void {
  //   this.service.updateItem(item.id!, item).subscribe(() => {
  //     alert('Item updated successfully');
  //   });
  // }
  
  
updateItem(item: GroceryItem): void {
  if (item.id !== undefined) {
    this.service.updateItem(item.id, item).subscribe(() => {
      alert('Grocery item updated successfully');
      this.loadItems();
    });
  }
}

updateStock(id: number, newQuantity: number): void {
  this.service.updateStock(id, newQuantity).subscribe(() => {
    alert('Stock updated');
    this.loadItems();
  });
}


  deleteItem(id: number): void {
    this.service.deleteItem(id).subscribe(() => this.loadItems());
  }

  resetForm(): void {
    this.groceryForm.reset();
  }

}
