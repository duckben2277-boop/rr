import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { Medicine } from '../models/medicine.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private snackBar: MatSnackBar) {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const storedCart = localStorage.getItem('remedy-radar-cart');
      if (storedCart) {
        try {
          const cartItems = JSON.parse(storedCart);
          this.cartItemsSubject.next(cartItems);
        } catch (error) {
          console.error('Failed to parse cart from localStorage:', error);
        }
      }
    }
  }

  private saveCartToStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('remedy-radar-cart', JSON.stringify(this.cartItemsSubject.value));
    }
  }

  addItem(medicine: Medicine): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.medicine.id === medicine.id);

    let updatedItems: CartItem[];
    if (existingItem) {
      updatedItems = currentItems.map(item =>
        item.medicine.id === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedItems = [...currentItems, { medicine, quantity: 1 }];
    }

    this.cartItemsSubject.next(updatedItems);
    this.saveCartToStorage();

    this.snackBar.open(`${medicine.name} added to cart`, 'Close', {
      duration: 2000,
    });
  }

  removeItem(medicineId: string): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.medicine.id !== medicineId);
    this.cartItemsSubject.next(updatedItems);
    this.saveCartToStorage();
  }

  updateQuantity(medicineId: string, quantity: number): void {
    if (quantity < 1) {
      this.removeItem(medicineId);
      return;
    }

    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.map(item =>
      item.medicine.id === medicineId
        ? { ...item, quantity }
        : item
    );

    this.cartItemsSubject.next(updatedItems);
    this.saveCartToStorage();
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.saveCartToStorage();
  }

  getTotalPrice(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + (item.medicine.price * item.quantity), 
      0
    );
  }

  getItemCount(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + item.quantity, 
      0
    );
  }

  formatPrice(price: number): string {
    return `₹${price.toFixed(2)}`;
  }
}