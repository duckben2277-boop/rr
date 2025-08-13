const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/MedicineDB');
    console.log('Connected to MedicineDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Define schemas
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  medicalHistory: [String]
}, { timestamps: true });

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  dosage: String,
  category: String
}, { timestamps: true });

const symptomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  relatedMedicines: [String]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Medicine = mongoose.model('Medicine', medicineSchema);
const Symptom = mongoose.model('Symptom', symptomSchema);

async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Medicine.deleteMany({});
    await Symptom.deleteMany({});
    console.log('Cleared existing data');

    // Create medicines
    const medicines = await Medicine.insertMany([
      { name: "Paracetamol", description: "Relief from fever and mild to moderate pain.", price: 30.00, image: "assets/images/paracetomal.jpg", dosage: "500mg", category: "pain-relief" },
      { name: "Ibuprofen", description: "Non-steroidal anti-inflammatory drug for pain and inflammation.", price: 65.00, image: "assets/images/ibuprofen.jpg", dosage: "400mg", category: "pain-relief" },
      { name: "Cetirizine", description: "Antihistamine for allergy symptoms like sneezing and runny nose.", price: 50.00, image: "assets/images/cetirizine.jpg", dosage: "10mg", category: "allergy" },
      { name: "Omeprazole", description: "Reduces stomach acid to treat indigestion and heartburn.", price: 90.00, image: "assets/images/Omeprazole.jpeg", dosage: "20mg", category: "digestive-health" },
      { name: "Azithromycin", description: "Antibiotic for a variety of bacterial infections.", price: 120.00, image: "assets/images/Azithromycin.jpg", dosage: "500mg", category: "antibiotics" },
      { name: "Loratadine", description: "Non-drowsy antihistamine for allergy relief.", price: 85.00, image: "assets/images/Loratadine.jpeg", dosage: "10mg", category: "allergy" },
      { name: "Amoxicillin", description: "Antibiotic used to treat bacterial infections like chest infections.", price: 75.00, image: "assets/images/Amoxicillin.jpeg", dosage: "500mg", category: "antibiotics" },
      { name: "Loperamide", description: "Anti-diarrheal medication.", price: 45.00, image: "assets/images/Loperamide.jpeg", dosage: "2mg", category: "digestive-health" },
      { name: "Aspirin", description: "Used to reduce pain, fever, or inflammation.", price: 20.00, image: "assets/images/aspirin.jpeg", dosage: "75mg", category: "pain-relief" },
      { name: "Dextromethorphan", description: "Cough suppressant for temporary relief of coughing.", price: 110.00, image: "assets/images/dextromethorphan.jpeg", dosage: "15mg/5ml", category: "cold-cough" },
      { name: "Guaifenesin", description: "Expectorant to help clear chest congestion.", price: 130.00, image: "assets/images/guaifenesin.jpeg", dosage: "200mg", category: "cold-cough" },
      { name: "Vitamin C", description: "Supplement for boosting immunity.", price: 150.00, image: "assets/images/vitaminc.jpeg", dosage: "500mg", category: "vitamins-supplements" },
      { name: "Vitamin D3", description: "Supports bone health and immune function.", price: 200.00, image: "assets/images/vitamin D3.jpeg", dosage: "60000 IU", category: "vitamins-supplements" },
      { name: "Metformin", description: "Used to treat type 2 diabetes.", price: 40.00, image: "assets/images/metformin.jpeg", dosage: "500mg", category: "diabetes" },
      { name: "Atorvastatin", description: "Lowers cholesterol and triglycerides in the blood.", price: 180.00, image: "assets/images/atorvastatin.jpeg", dosage: "10mg", category: "cardiovascular" }
    ]);
    console.log(`✅ Inserted ${medicines.length} medicines`);

    // Create symptoms with medicine IDs
    const symptoms = await Symptom.insertMany([
      { 
        name: "Headache", 
        description: "Pain in any region of the head.", 
        relatedMedicines: [medicines[0]._id, medicines[1]._id, medicines[8]._id] // Paracetamol, Ibuprofen, Aspirin
      },
      { 
        name: "Fever", 
        description: "A temporary increase in body temperature, often due to illness.", 
        relatedMedicines: [medicines[0]._id, medicines[1]._id, medicines[8]._id] // Paracetamol, Ibuprofen, Aspirin
      },
      { 
        name: "Allergic Rhinitis", 
        description: "Inflammation of the inside of the nose caused by an allergen.", 
        relatedMedicines: [medicines[2]._id, medicines[5]._id] // Cetirizine, Loratadine
      },
      { 
        name: "Heartburn", 
        description: "A burning pain in the chest, just behind the breastbone.", 
        relatedMedicines: [medicines[3]._id] // Omeprazole
      },
      { 
        name: "Sore Throat", 
        description: "Pain, scratchiness or irritation of the throat.", 
        relatedMedicines: [medicines[4]._id, medicines[6]._id] // Azithromycin, Amoxicillin
      },
      { 
        name: "Diarrhea", 
        description: "Loose, watery bowel movements.", 
        relatedMedicines: [medicines[7]._id] // Loperamide
      },
      { 
        name: "Muscle Pain", 
        description: "Pain affecting the muscles of the body.", 
        relatedMedicines: [medicines[0]._id, medicines[1]._id] // Paracetamol, Ibuprofen
      },
      { 
        name: "Common Cold", 
        description: "A mild viral infection of the nose and throat.", 
        relatedMedicines: [medicines[0]._id, medicines[2]._id, medicines[9]._id, medicines[10]._id] // Paracetamol, Cetirizine, Dextromethorphan, Guaifenesin
      },
      { 
        name: "High Blood Pressure", 
        description: "Hypertension, a condition where the force of blood against artery walls is too high.", 
        relatedMedicines: [medicines[14]._id] // Atorvastatin
      },
      { 
        name: "Diabetes", 
        description: "A group of diseases that result in too much sugar in the blood.", 
        relatedMedicines: [medicines[13]._id] // Metformin
      }
    ]);
    console.log(`✅ Inserted ${symptoms.length} symptoms`);

    // Create users with hashed passwords
    const hashedUserPassword = await bcrypt.hash('password123', 10);
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);

    const users = await User.insertMany([
      {
        name: "John Doe",
        email: "user@example.com",
        password: hashedUserPassword,
        role: "user",
        medicalHistory: ["Allergy to peanuts", "Asthma"]
      },
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedAdminPassword,
        role: "admin",
        medicalHistory: []
      }
    ]);
    console.log(`✅ Inserted ${users.length} users`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Demo Credentials:');
    console.log('User: user@example.com / password123');
    console.log('Admin: admin@example.com / admin123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

async function main() {
  await connectDB();
  await seedDatabase();
  await mongoose.connection.close();
  console.log('\n✅ Database connection closed');
}

main();