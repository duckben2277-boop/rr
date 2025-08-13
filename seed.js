const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  dosage: String,
  category: String
});
const symptomSchema = new mongoose.Schema({
  name: String,
  description: String,
  relatedMedicines: [String]
});
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String,
  medicalHistory: [String]
});

const Medicine = mongoose.model('Medicine', medicineSchema);
const Symptom = mongoose.model('Symptom', symptomSchema);
const User = mongoose.model('User', userSchema);

async function seedAll() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/medicineDB');

    await Medicine.deleteMany({});
    await Symptom.deleteMany({});
    await User.deleteMany({});

    await Medicine.insertMany([
      { name: "Paracetamol", description: "Relief from fever and mild to moderate pain.", price: 120.00, image: "assets/images/paracetomal.jpg", dosage: "500mg", category: "pain-relief" },
      { name: "Ibuprofen", description: "Non-steroidal anti-inflammatory drug used to treat pain and inflammation.", price: 150.00, image: "assets/images/ibuprofen.jpg", dosage: "200mg", category: "pain-relief" },
      { name: "Cetirizine", description: "Antihistamine used to relieve allergy symptoms.", price: 200.00, image: "assets/images/cetirizine.jpg", dosage: "10mg", category: "allergy" },
      { name: "Omeprazole", description: "Reduces stomach acid production to treat indigestion and heartburn.", price: 320.00, image: "assets/images/Omeprazole.jpeg", dosage: "20mg", category: "digestive-health" },
      { name: "Azithromycin", description: "Antibiotic used to treat a variety of bacterial infections.", price: 120.00, image: "assets/images/Azithromycin.jpg", dosage: "250mg", category: "antibiotics" },
      { name: "Loratadine", description: "Non-drowsy antihistamine for allergy relief.", price: 350.00, image: "assets/images/Loratadine.jpeg", dosage: "10mg", category: "allergy" },
      { name: "Amoxicillin", description: "Antibiotic used to treat bacterial infections.", price: 249.99, image: "assets/images/Amoxicillin.jpeg", dosage: "500mg", category: "antibiotics" },
      { name: "Loperamide", description: "Anti-diarrheal medication.", price: 180.00, image: "assets/images/Loperamide.jpeg", dosage: "2mg", category: "digestive-health" }
    ]);

    await Symptom.insertMany([
      { name: "Headache", description: "Pain in any region of the head.", relatedMedicines: ["Paracetamol", "Ibuprofen"] },
      { name: "Fever", description: "A temporary increase in body temperature, often due to illness.", relatedMedicines: ["Paracetamol", "Ibuprofen"] },
      { name: "Allergic Rhinitis", description: "Inflammation of the inside of the nose caused by an allergen.", relatedMedicines: ["Cetirizine", "Loratadine"] },
      { name: "Heartburn", description: "A burning pain in the chest, just behind the breastbone.", relatedMedicines: ["Omeprazole"] },
      { name: "Sore Throat", description: "Pain, scratchiness or irritation of the throat.", relatedMedicines: ["Azithromycin", "Amoxicillin"] },
      { name: "Diarrhea", description: "Loose, watery bowel movements.", relatedMedicines: ["Loperamide"] },
      { name: "Muscle Pain", description: "Pain affecting the muscles of the body.", relatedMedicines: ["Paracetamol", "Ibuprofen"] },
      { name: "Common Cold", description: "A mild viral infection of the nose and throat.", relatedMedicines: ["Paracetamol", "Cetirizine", "Loratadine"] }
    ]);

    await User.insertMany([
      { email: "user@example.com", password: "password123", name: "John Doe", role: "user", medicalHistory: ["Allergy to peanuts", "Asthma"] },
      { email: "admin@example.com", password: "admin123", name: "Admin User", role: "admin", medicalHistory: [] }
    ]);

    console.log('✅ All data seeded!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seedAll();
