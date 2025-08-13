import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserRole } from '../models/user.model';
import { DataService } from './data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const savedUser = localStorage.getItem('remedy-radar-user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          this.currentUserSubject.next(parsedUser);
          this.isLoggedInSubject.next(true);
        } catch (error) {
          console.error('Failed to parse saved user:', error);
          localStorage.removeItem('remedy-radar-user');
        }
      }
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    const demoUsers = this.dataService.getDemoUsers();
    const foundUser = demoUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userInfo: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        medicalHistory: foundUser.medicalHistory
      };
      
      this.currentUserSubject.next(userInfo);
      this.isLoggedInSubject.next(true);
      
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('remedy-radar-user', JSON.stringify(userInfo));
      }
      
      this.snackBar.open(`Welcome back, ${userInfo.name}!`, 'Close', {
        duration: 3000,
      });
      
      return true;
    } else {
      this.snackBar.open('Invalid email or password. Please try again.', 'Close', {
        duration: 3000,
      });
      return false;
    }
  }

  async register(name: string, email: string, password: string): Promise<boolean> {
    const demoUsers = this.dataService.getDemoUsers();
    
    if (demoUsers.some(u => u.email === email)) {
      this.snackBar.open('This email is already registered. Try logging in instead.', 'Close', {
        duration: 3000,
      });
      return false;
    }

    const newUser: User = {
      id: `u${demoUsers.length + 1}`,
      name,
      email,
      role: 'user',
      medicalHistory: []
    };

    // For demo purposes only - add to demo users array
    demoUsers.push({
      ...newUser,
      password,
      medicalHistory: []
    });

    this.currentUserSubject.next(newUser);
    this.isLoggedInSubject.next(true);
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('remedy-radar-user', JSON.stringify(newUser));
    }
    
    this.snackBar.open(`Welcome, ${name}! Your account has been created.`, 'Close', {
      duration: 3000,
    });
    
    return true;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('remedy-radar-user');
    }
    
    this.snackBar.open('You have been successfully logged out.', 'Close', {
      duration: 3000,
    });
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }
}