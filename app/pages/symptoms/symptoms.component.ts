import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { Symptom } from '../../models/symptom.model';
import { Medicine } from '../../models/medicine.model';

@Component({
  selector: 'app-symptoms',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule
  ],
  // 
   template: ` 
    <!-- Your inline HTML here -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Symptom Checker</h1>
        <p class="text-gray-600">
          Select your symptoms below to get personalized medicine recommendations.
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Symptoms Selection -->
        <div class="lg:col-span-1">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Select Your Symptoms</mat-card-title>
              <mat-card-subtitle>Check all that apply</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="space-y-4">
                <div *ngFor="let symptom of symptoms; trackBy: trackBySymptomId" 
                     class="flex items-start space-x-3">
                  <mat-checkbox 
                    [(ngModel)]="symptom.selected"
                    (change)="onSymptomToggle(symptom.id, $event.checked)"
                  ></mat-checkbox>
                  <div class="grid gap-1.5 leading-none">
                    <label class="text-sm font-medium cursor-pointer" 
                           (click)="toggleSymptom(symptom)">
                      {{symptom.name}}
                    </label>
                    <p class="text-sm text-muted-foreground">
                      {{symptom.description}}
                    </p>
                  </div>
                </div>
              </div>
            </mat-card-content>
            <mat-card-actions class="flex justify-between">
              <button mat-stroked-button (click)="clearSelection()">
                Clear
              </button>
              <button mat-raised-button color="primary" (click)="checkSymptoms()">
                Check Symptoms
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
        
        <!-- Recommendations -->
        <div class="lg:col-span-2">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Recommended Medicines</mat-card-title>
              <mat-card-subtitle>
                <span *ngIf="hasCheckedSymptoms; else initialMessage">
                  Based on your symptoms, we recommend the following medicines.
                </span>
                <ng-template #initialMessage>
                  Select your symptoms and click "Check Symptoms" to get recommendations.
                </ng-template>
              </mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <!-- Initial State -->
              <div *ngIf="!hasCheckedSymptoms" class="text-center py-8 text-gray-500">
                Your medicine recommendations will appear here
              </div>
              
              <!-- No Results -->
              <div *ngIf="hasCheckedSymptoms && recommendedMedicines.length === 0" 
                   class="text-center py-8 text-gray-500">
                No specific medicines found for your symptoms. Please consult a doctor.
              </div>
              
              <!-- Recommendations List -->
              <div *ngIf="recommendedMedicines.length > 0" class="space-y-4">
                <div *ngFor="let medicine of recommendedMedicines; trackBy: trackByMedicineId" 
                     class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-gray-200">
                  <div class="flex items-center space-x-4 mb-4 sm:mb-0">
                   <div class="h-20 w-24 sm:h-24 sm:w-32 bg-white flex items-center justify-center p-2 overflow-hidden">
  <img 
    [src]="medicine.image" 
    [alt]="medicine.name" 
    class="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
    onerror="this.src='assets/images/placeholder.svg'; this.onerror=null;" />
</div>


                    <div>
                      <h3 class="font-medium">{{medicine.name}}</h3>
                      <p class="text-sm text-gray-600">{{medicine.description}}</p>
                      <p class="text-sm text-gray-600">Dosage: {{medicine.dosage}}</p>
                      <p class="font-medium text-medical-600 mt-1">{{formatPrice(medicine.price)}}</p>
                    </div>
                  </div>
                  <button 
                    mat-raised-button 
                    color="primary"
                    class="w-full sm:w-auto" 
                    (click)="addToCart(medicine)"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </mat-card-content>
            <mat-card-actions *ngIf="recommendedMedicines.length > 0">
              <button 
                mat-raised-button 
                color="primary"
                class="w-full" 
                (click)="viewCart()"
              >
                View Cart
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Your inline CSS here */
    
    .max-w-7xl { max-width: 80rem; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mb-8 { margin-bottom: 2rem; }
    .mt-1 { margin-top: 0.25rem; }
    
    .grid { display: grid; }
    .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
    .gap-8 { gap: 2rem; }
    .gap-1 { gap: 0.25rem; }
    
    .text-3xl { font-size: 1.875rem; }
    .text-sm { font-size: 0.875rem; }
    .font-bold { font-weight: bold; }
    .font-medium { font-weight: 500; }
    .text-gray-600 { color: #4b5563; }
    .text-gray-500 { color: #6b7280; }
    .text-medical-600 { color: #0284c7; }
    .text-muted-foreground { color: #6b7280; }
    
    .flex { display: flex; }
    .items-start { align-items: flex-start; }
    .items-center { align-items: center; }
    .justify-between { justify-content: space-between; }
    .space-x-3 > * + * { margin-left: 0.75rem; }
    .space-x-4 > * + * { margin-left: 1rem; }
    .space-y-4 > * + * { margin-top: 1rem; }
    
    .text-center { text-align: center; }
    .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
    .p-4 { padding: 1rem; }
    
    .w-16 { width: 4rem; }
    .h-16 { height: 4rem; }
    .w-full { width: 100%; }
    
    .bg-gray-100 { background-color: #f3f4f6; }
    .bg-gray-200 { background-color: #e5e7eb; }
    
    .rounded-md { border-radius: 0.375rem; }
    .rounded-lg { border-radius: 0.5rem; }
    
    .border { border-width: 1px; }
    .border-gray-200 { border-color: #e5e7eb; }
    
    .leading-none { line-height: 1; }
    .cursor-pointer { cursor: pointer; }
    
    @media (min-width: 640px) {
      .sm\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
      .sm\\:flex-row { flex-direction: row; }
      .sm\\:items-center { align-items: center; }
      .sm\\:mb-0 { margin-bottom: 0; }
      .sm\\:w-auto { width: auto; }
    }
    
    @media (min-width: 1024px) {
      .lg\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
      .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .lg\\:col-span-1 { grid-column: span 1 / span 1; }
      .lg\\:col-span-2 { grid-column: span 2 / span 2; }
    }
  `]
})
export class SymptomsComponent implements OnInit {
  symptoms: (Symptom & { selected: boolean })[] = [];
  selectedSymptoms: string[] = [];
  recommendedMedicines: Medicine[] = [];
  hasCheckedSymptoms = false;

  constructor(
    private dataService: DataService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.symptoms = this.dataService.getAllSymptoms().map(symptom => ({
      ...symptom,
      selected: false
    }));
  }

  onSymptomToggle(symptomId: string, checked: boolean): void {
    if (checked) {
      if (!this.selectedSymptoms.includes(symptomId)) {
        this.selectedSymptoms.push(symptomId);
      }
    } else {
      this.selectedSymptoms = this.selectedSymptoms.filter(id => id !== symptomId);
    }
  }

  toggleSymptom(symptom: Symptom & { selected: boolean }): void {
    symptom.selected = !symptom.selected;
    this.onSymptomToggle(symptom.id, symptom.selected);
  }

  checkSymptoms(): void {
    if (this.selectedSymptoms.length === 0) {
      return;
    }

    const allRecommendedMedicines: Medicine[] = [];
    
    this.selectedSymptoms.forEach(symptomId => {
      const medicines = this.dataService.getMedicinesBySymptomId(symptomId);
      medicines.forEach(medicine => {
        if (!allRecommendedMedicines.some(m => m.id === medicine.id)) {
          allRecommendedMedicines.push(medicine);
        }
      });
    });

    this.recommendedMedicines = allRecommendedMedicines;
    this.hasCheckedSymptoms = true;
  }

  clearSelection(): void {
    this.symptoms.forEach(symptom => symptom.selected = false);
    this.selectedSymptoms = [];
    this.recommendedMedicines = [];
    this.hasCheckedSymptoms = false;
  }

  addToCart(medicine: Medicine): void {
    this.cartService.addItem(medicine);
  }

  viewCart(): void {
    this.router.navigate(['/cart']);
  }

  formatPrice(price: number): string {
    return this.dataService.formatIndianPrice(price);
  }

  trackBySymptomId(index: number, symptom: Symptom): string {
    return symptom.id;
  }

  trackByMedicineId(index: number, medicine: Medicine): string {
    return medicine.id;
  }
}