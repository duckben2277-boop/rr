export interface Symptom {
  id?: string;
  _id?: string;
  name: string;
  description: string;
  relatedMedicines: string[]; // Array of medicine IDs
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}