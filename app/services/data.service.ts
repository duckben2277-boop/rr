import { Injectable } from '@angular/core';
import { Medicine } from '../models/medicine.model';
import { Symptom } from '../models/symptom.model';
import { User, UserRole } from '../models/user.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpService) {}

  // Medicine methods
  async getAllMedicines(): Promise<Medicine[]> {
    try {
      return await this.http.get<Medicine[]>('/medicines');
    } catch (error) {
      console.error('Error fetching medicines:', error);
      return [];
    }
  }

  async getMedicineById(id: string): Promise<Medicine | null> {
    try {
      return await this.http.get<Medicine>(`/medicines/${id}`);
    } catch (error) {
      console.error('Error fetching medicine by ID:', error);
      return null;
    }
  }

  async getMedicinesByCategory(category: string): Promise<Medicine[]> {
    try {
      return await this.http.get<Medicine[]>(`/medicines/category/${category}`);
    } catch (error) {
      console.error('Error fetching medicines by category:', error);
      return [];
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      return await this.http.get<string[]>('/categories');
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async searchMedicines(searchTerm: string): Promise<Medicine[]> {
    try {
      return await this.http.get<Medicine[]>(`/medicines/search/${encodeURIComponent(searchTerm)}`);
    } catch (error) {
      console.error('Error searching medicines:', error);
      return [];
    }
  }

  // Symptom methods
  async getAllSymptoms(): Promise<Symptom[]> {
    try {
      return await this.http.get<Symptom[]>('/symptoms');
    } catch (error) {
      console.error('Error fetching symptoms:', error);
      return [];
    }
  }

  async getSymptomById(id: string): Promise<Symptom | null> {
    try {
      return await this.http.get<Symptom>(`/symptoms/${id}`);
    } catch (error) {
      console.error('Error fetching symptom by ID:', error);
      return null;
    }
  }

  async getMedicinesBySymptomId(symptomId: string): Promise<Medicine[]> {
    try {
      return await this.http.get<Medicine[]>(`/symptoms/${symptomId}/medicines`);
    } catch (error) {
      console.error('Error fetching medicines by symptom:', error);
      return [];
    }
  }

  // Admin methods
  async createMedicine(medicine: Omit<Medicine, 'id'>): Promise<Medicine | null> {
    try {
      return await this.http.post<Medicine>('/admin/medicines', medicine);
    } catch (error) {
      console.error('Error creating medicine:', error);
      return null;
    }
  }

  async updateMedicine(id: string, medicine: Partial<Medicine>): Promise<Medicine | null> {
    try {
      return await this.http.put<Medicine>(`/admin/medicines/${id}`, medicine);
    } catch (error) {
      console.error('Error updating medicine:', error);
      return null;
    }
  }

  async deleteMedicine(id: string): Promise<boolean> {
    try {
      await this.http.delete(`/admin/medicines/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting medicine:', error);
      return false;
    }
  }

  // Utility methods
  formatIndianPrice(price: number): string {
    return `₹${price.toFixed(2)}`;
  }

  // Legacy method for backward compatibility (now returns empty array since we don't need demo users)
  getDemoUsers(): any[] {
    console.warn('getDemoUsers is deprecated. Authentication now uses real backend API.');
    return [];
  }

  // Health check method
  async checkApiHealth(): Promise<boolean> {
    try {
      const response = await this.http.get<{ status: string }>('/health');
      return response.status === 'OK';
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  }
}