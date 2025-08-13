import { Injectable } from '@angular/core';
import { Medicine } from '../models/medicine.model';
import { Symptom } from '../models/symptom.model';
import { User, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Mock medicines database with 100 entries and prices in INR
  private medicines: Medicine[] = [
    { id: "m1", name: "Paracetamol", description: "Relief from fever and mild to moderate pain.", price: 30.00, image: "assets/images/paracetomal.jpg", dosage: "500mg", category: "pain-relief" },
    { id: "m2", name: "Ibuprofen", description: "Non-steroidal anti-inflammatory drug for pain and inflammation.", price: 65.00, image: "assets/images/ibuprofen.jpg", dosage: "400mg", category: "pain-relief" },
    { id: "m3", name: "Cetirizine", description: "Antihistamine for allergy symptoms like sneezing and runny nose.", price: 50.00, image: "assets/images/cetirizine.jpg", dosage: "10mg", category: "allergy" },
    { id: "m4", name: "Omeprazole", description: "Reduces stomach acid to treat indigestion and heartburn.", price: 90.00, image: "assets/images/Omeprazole.jpeg", dosage: "20mg", category: "digestive-health" },
    { id: "m5", name: "Azithromycin", description: "Antibiotic for a variety of bacterial infections.", price: 120.00, image: "assets/images/Azithromycin.jpg", dosage: "500mg", category: "antibiotics" },
    { id: "m6", name: "Loratadine", description: "Non-drowsy antihistamine for allergy relief.", price: 85.00, image: "assets/images/Loratadine.jpeg", dosage: "10mg", category: "allergy" },
    { id: "m7", name: "Amoxicillin", description: "Antibiotic used to treat bacterial infections like chest infections.", price: 75.00, image: "assets/images/Amoxicillin.jpeg", dosage: "500mg", category: "antibiotics" },
    { id: "m8", name: "Loperamide", description: "Anti-diarrheal medication.", price: 45.00, image: "assets/images/Loperamide.jpeg", dosage: "2mg", category: "digestive-health" },
    { id: "m9", name: "Aspirin", description: "Used to reduce pain, fever, or inflammation.", price: 20.00, image: "assets/images/aspirin.jpeg", dosage: "75mg", category: "pain-relief" },
    { id: "m10", name: "Dextromethorphan", description: "Cough suppressant for temporary relief of coughing.", price: 110.00, image: "assets/images/dextromethorphan.jpeg", dosage: "15mg/5ml", category: "cold-cough" },
    { id: "m11", name: "Guaifenesin", description: "Expectorant to help clear chest congestion.", price: 130.00, image: "assets/images/guaifenesin.jpeg", dosage: "200mg", category: "cold-cough" },
    { id: "m12", name: "Vitamin C", description: "Supplement for boosting immunity.", price: 150.00, image: "assets/images/vitaminc.jpeg", dosage: "500mg", category: "vitamins-supplements" },
    { id: "m13", name: "Vitamin D3", description: "Supports bone health and immune function.", price: 200.00, image: "assets/images/vitamin D3.jpeg", dosage: "60000 IU", category: "vitamins-supplements" },
    { id: "m14", name: "Metformin", description: "Used to treat type 2 diabetes.", price: 40.00, image: "assets/images/metformin.jpeg", dosage: "500mg", category: "diabetes" },
    { id: "m15", name: "Atorvastatin", description: "Lowers cholesterol and triglycerides in the blood.", price: 180.00, image: "assets/images/atorvastatin.jpeg", dosage: "10mg", category: "cardiovascular" },
    { id: "m16", name: "Amlodipine", description: "Used to treat high blood pressure (hypertension).", price: 95.00, image: "assets/images/amlodipine.jpeg", dosage: "5mg", category: "cardiovascular" },
    { id: "m17", name: "Clotrimazole Cream", description: "Antifungal cream for skin infections.", price: 80.00, image: "assets/images/clotrimazole Cream.jpeg", dosage: "1%", category: "skin-care" },
    { id: "m18", name: "Povidone-Iodine", description: "Antiseptic solution for preventing skin infections in minor cuts.", price: 60.00, image: "assets/images/povidone-Iodine.jpeg", dosage: "5% solution", category: "antiseptics" },
    { id: "m19", name: "Diclofenac Gel", description: "Topical pain relief for joint and muscle pain.", price: 125.00, image: "assets/images/diclofenac Gel.jpeg", dosage: "1%", category: "pain-relief" },
    { id: "m20", name: "Pantoprazole", description: "Proton pump inhibitor for acid reflux and ulcers.", price: 115.00, image: "assets/images/pantoprazole.jpeg", dosage: "40mg", category: "digestive-health" },
{ id: "m21", name: "Ciprofloxacin", description: "Antibiotic for urinary tract and other infections.", price: 90.00, image: "assets/images/Ciprofloxacin.jpeg", dosage: "500mg", category: "antibiotics" },
{ id: "m22", name: "Fexofenadine", description: "Non-drowsy antihistamine for seasonal allergies.", price: 140.00, image: "assets/images/fexofenadine.jpeg", dosage: "120mg", category: "allergy" },
{ id: "m23", name: "Sertraline", description: "SSRI antidepressant for depression and anxiety.", price: 250.00, image: "assets/images/sertraline.jpeg", dosage: "50mg", category: "mental-health" },
{ id: "m24", name: "Losartan", description: "Used to treat high blood pressure and help protect kidneys.", price: 160.00, image: "assets/images/losartan.jpeg", dosage: "50mg", category: "cardiovascular" },
{ id: "m25", name: "B-Complex Forte", description: "A blend of B vitamins to support energy metabolism.", price: 180.00, image: "assets/images/B-Complex Forte.jpeg", dosage: "1 tablet", category: "vitamins-supplements" },
{ id: "m26", name: "Salbutamol Inhaler", description: "Bronchodilator for asthma and COPD.", price: 350.00, image: "assets/images/Salbutamol Inhaler.jpeg", dosage: "100mcg/puff", category: "respiratory" },
{ id: "m27", name: "Levothyroxine", description: "Treats hypothyroidism (underactive thyroid).", price: 130.00, image: "assets/images/Levothyroxine.jpeg", dosage: "50mcg", category: "hormonal" },
{ id: "m28", name: "Hydrocortisone Cream", description: "Mild corticosteroid for skin irritation and rashes.", price: 95.00, image: "assets/images/Hydrocortisone Cream.jpeg", dosage: "1%", category: "skin-care" },
{ id: "m29", name: "Domperidone", description: "Used to treat nausea and vomiting.", price: 70.00, image: "assets/images/Domperidone.jpeg", dosage: "10mg", category: "digestive-health" },
{ id: "m30", name: "Iron + Folic Acid", description: "Supplement for preventing and treating anemia.", price: 220.00, image: "assets/images/Iron + Folic Acid.jpeg", dosage: "1 tablet", category: "vitamins-supplements" },
{ id: "m31", name: "Naproxen", description: "NSAID for pain, menstrual cramps, and inflammatory diseases.", price: 85.00, image: "assets/images/Naproxen.jpeg", dosage: "250mg", category: "pain-relief" },
{ id: "m32", name: "Ofloxacin", description: "Antibiotic for eye and ear infections.", price: 55.00, image: "assets/images/Ofloxacin.jpeg", dosage: "0.3% drops", category: "antibiotics" },
{ id: "m33", name: "Carboxymethylcellulose Eye Drops", description: "Lubricating eye drops for dry eyes.", price: 150.00, image: "assets/images/Carboxymethylcellulose Eye Drops.jpeg", dosage: "0.5%", category: "eye-care" },
{ id: "m34", name: "Glimepiride", description: "Used with diet and exercise to treat type 2 diabetes.", price: 60.00, image: "assets/images/Glimepiride.jpeg", dosage: "1mg", category: "diabetes" },
{ id: "m35", name: "Escitalopram", description: "SSRI antidepressant for generalized anxiety disorder.", price: 300.00, image: "assets/images/Escitalopram.jpeg", dosage: "10mg", category: "mental-health" },
{ id: "m36", name: "Metoprolol", description: "Beta-blocker for high blood pressure, chest pain, and heart failure.", price: 110.00, image: "assets/images/Metoprolol.jpeg", dosage: "25mg", category: "cardiovascular" },
{ id: "m37", name: "Miconazole Cream", description: "Antifungal used to treat ringworm, pityriasis versicolor.", price: 90.00, image: "assets/images/Miconazole Cream.jpeg", dosage: "2%", category: "skin-care" },
{ id: "m38", name: "Chlorhexidine Mouthwash", description: "Antiseptic mouthwash for gingivitis and oral hygiene.", price: 140.00, image: "assets/images/Chlorhexidine Mouthwash.jpeg", dosage: "0.2%", category: "antiseptics" },
{ id: "m39", name: "Bisacodyl", description: "Stimulant laxative for constipation.", price: 35.00, image: "assets/images/Bisacodyl.jpeg", dosage: "5mg", category: "digestive-health" },
{ id: "m40", name: "Calcium Carbonate", description: "Supplement for calcium deficiency and an antacid.", price: 170.00, image: "assets/images/Calcium Carbonate.jpeg", dosage: "500mg", category: "vitamins-supplements" },
{ id: "m41", name: "Doxycycline", description: "Tetracycline antibiotic for bacterial pneumonia, acne.", price: 110.00, image: "assets/images/Doxycycline.jpeg", dosage: "100mg", category: "antibiotics" },
{ id: "m42", name: "Phenylephrine", description: "Decongestant for stuffy nose caused by colds or allergies.", price: 75.00, image: "assets/images/Phenylephrine.jpeg", dosage: "10mg", category: "cold-cough" },
{ id: "m43", name: "Montelukast", description: "Used to prevent wheezing, difficulty breathing, and asthma attacks.", price: 280.00, image: "assets/images/Montelukast.jpeg", dosage: "10mg", category: "respiratory" },
{ id: "m44", name: "Famotidine", description: "H2 blocker that reduces the amount of acid in the stomach.", price: 65.00, image: "assets/images/Famotidine.jpeg", dosage: "20mg", category: "digestive-health" },
{ id: "m45", name: "Tramadol", description: "Opioid analgesic for moderate to severe pain.", price: 190.00, image: "assets/images/Tramadol.jpeg", dosage: "50mg", category: "pain-relief" },
{ id: "m46", name: "Telmisartan", description: "Used to treat high blood pressure.", price: 210.00, image: "assets/images/Telmisartan.jpeg", dosage: "40mg", category: "cardiovascular" },
{ id: "m47", name: "Alprazolam", description: "Benzodiazepine for anxiety and panic disorders.", price: 80.00, image: "assets/images/Alprazolam.jpeg", dosage: "0.25mg", category: "mental-health" },
{ id: "m48", name: "Zincovit", description: "Multivitamin and multimineral supplement.", price: 105.00, image: "assets/images/Zincovit.jpeg", dosage: "1 tablet", category: "vitamins-supplements" },
{ id: "m49", name: "Mupirocin Ointment", description: "Topical antibiotic for bacterial skin infections.", price: 135.00, image: "assets/images/Mupirocin Ointment.jpeg", dosage: "2%", category: "skin-care" },
{ id: "m50", name: "Clindamycin", description: "Antibiotic for skin infections and acne.", price: 250.00, image: "assets/images/Clindamycin.jpeg", dosage: "300mg", category: "antibiotics" },
{ id: "m51", name: "Lisinopril", description: "ACE inhibitor for hypertension and heart failure.", price: 120.00, image: "assets/images/Lisinopril.png", dosage: "10mg", category: "cardiovascular" },
{ id: "m52", name: "Prednisolone", description: "Corticosteroid for inflammation and allergies.", price: 50.00, image: "assets/images/Prednisolone.jpg", dosage: "5mg", category: "anti-inflammatory" },
{ id: "m53", name: "Ornidazole", description: "Antibiotic for amoebic and bacterial infections.", price: 95.00, image: "assets/images/Ornidazole.jpg", dosage: "500mg", category: "antibiotics" },
{ id: "m54", name: "Levocetirizine", description: "Antihistamine for allergies, less drowsy.", price: 70.00, image: "assets/images/Levocetirizine.jpg", dosage: "5mg", category: "allergy" },
{ id: "m55", name: "Spironolactone", description: "Diuretic for fluid retention and blood pressure.", price: 85.00, image: "assets/images/Spironolactone.jpg", dosage: "25mg", category: "cardiovascular" },
{ id: "m56", name: "Tamsulosin", description: "For enlarged prostate (BPH) symptoms.", price: 320.00, image: "assets/images/Tamsulosin.jpg", dosage: "0.4mg", category: "urology" },
{ id: "m57", name: "Pregabalin", description: "For neuropathic pain and fibromyalgia.", price: 450.00, image: "assets/images/Pregabalin.jpg", dosage: "75mg", category: "pain-relief" },
{ id: "m58", name: "Rosuvastatin", description: "Statin to lower cholesterol.", price: 230.00, image: "assets/images/Rosuvastatin.jpg", dosage: "10mg", category: "cardiovascular" },
{ id: "m59", name: "Etoricoxib", description: "NSAID for arthritis pain.", price: 180.00, image: "assets/images/Etoricoxib.jpg", dosage: "90mg", category: "pain-relief" },
{ id: "m60", name: "Isosorbide Mononitrate", description: "For preventing angina (chest pain).", price: 90.00, image: "assets/images/Isosorbide Mononitrate.jpg", dosage: "20mg", category: "cardiovascular" },
{ id: "m61", name: "Clonazepam", description: "For seizures, panic disorder, and anxiety.", price: 60.00, image: "assets/images/Clonazepam.jpg", dosage: "0.5mg", category: "mental-health" },
{ id: "m62", name: "Allopurinol", description: "For gout and high uric acid levels.", price: 55.00, image: "assets/images/Allopurinol.jpg", dosage: "100mg", category: "gout" },
{ id: "m63", name: "Clobetasol Propionate", description: "Potent steroid cream for skin conditions like psoriasis.", price: 150.00, image: "assets/images/Clobetasol Propionate.jpg", dosage: "0.05%", category: "skin-care" },
{ id: "m64", name: "Theophylline", description: "For respiratory diseases like asthma and COPD.", price: 130.00, image: "assets/images/T.jpg", dosage: "400mg", category: "respiratory" },
{ id: "m65", name: "Finasteride", description: "For male pattern hair loss and BPH.", price: 280.00, image: "assets/images/Finasteride.jpg", dosage: "1mg", category: "hair-care" },
{ id: "m66", name: "Propranolol", description: "Beta-blocker for blood pressure and performance anxiety.", price: 45.00, image: "assets/images/Propranolol.jpg", dosage: "40mg", category: "cardiovascular" },
{ id: "m67", name: "Vildagliptin", description: "Oral anti-diabetic agent.", price: 200.00, image: "assets/images/V.jpg", dosage: "50mg", category: "diabetes" },
{ id: "m68", name: "Mebeverine", description: "For irritable bowel syndrome (IBS).", price: 160.00, image: "assets/images/Mebeverine.jpg", dosage: "135mg", category: "digestive-health" },
{ id: "m69", name: "Silver Sulfadiazine", description: "Topical cream for preventing infection in burns.", price: 110.00, image: "assets/images/Silver Sulfadiazine.jpg", dosage: "1%", category: "antiseptics" },
{ id: "m70", name: "Folic Acid", description: "Essential B vitamin for cell growth.", price: 40.00, image: "assets/images/Folic Acid.jpg", dosage: "5mg", category: "vitamins-supplements" },
{ id: "m71", name: "Fluconazole", description: "Antifungal for systemic fungal infections.", price: 30.00, image: "assets/images/Fluconazole.jpeg", dosage: "150mg", category: "antifungal" },
{ id: "m72", name: "Hyoscine Butylbromide", description: "For abdominal cramps and pain.", price: 80.00, image: "assets/images/hb.jpeg", dosage: "10mg", category: "digestive-health" },
{ id: "m73", name: "Cefixime", description: "Antibiotic for a wide range of bacterial infections.", price: 220.00, image: "assets/images/Cefixime.jpeg", dosage: "200mg", category: "antibiotics" },
{ id: "m74", name: "Nifedipine", description: "Calcium channel blocker for high blood pressure and angina.", price: 75.00, image: "assets/images/Nifedipine.jpeg", dosage: "10mg", category: "cardiovascular" },
{ id: "m75", name: "Ondansetron", description: "Prevents nausea and vomiting from surgery or chemotherapy.", price: 50.00, image: "assets/images/Ondansetron.jpeg", dosage: "4mg", category: "digestive-health" },
{ id: "m76", name: "Tadalafil", description: "Treats erectile dysfunction and BPH.", price: 350.00, image: "assets/images/Tadalafil.jpeg", dosage: "10mg", category: "mens-health" },
{ id: "m77", name: "Gabapentin", description: "For seizures and neuropathic pain.", price: 290.00, image: "assets/images/Gabapentin.jpeg", dosage: "300mg", category: "pain-relief" },
{ id: "m78", name: "Indapamide", description: "Diuretic for hypertension.", price: 65.00, image: "assets/images/Indapamide.jpeg", dosage: "1.5mg", category: "cardiovascular" },
{ id: "m79", name: "Ambroxol", description: "Mucolytic agent for respiratory tract diseases.", price: 90.00, image: "assets/images/Ambroxol.jpeg", dosage: "30mg", category: "cold-cough" },
{ id: "m80", name: "Terbinafine Cream", description: "Antifungal cream for athlete's foot and jock itch.", price: 125.00, image: "assets/images/Terbinafine Cream.jpeg", dosage: "1%", category: "skin-care" },
{ id: "m81", name: "Lactulose Solution", description: "Laxative for constipation and hepatic encephalopathy.", price: 250.00, image: "assets/images/Lactulose Solution.jpeg", dosage: "10g/15ml", category: "digestive-health" },
{ id: "m82", name: "Fluticasone Nasal Spray", description: "Corticosteroid spray for allergic rhinitis.", price: 380.00, image: "assets/images/Fluticasone Nasal Spray.jpeg", dosage: "50mcg/spray", category: "allergy" },
{ id: "m83", name: "Paroxetine", description: "SSRI for depression, OCD, and panic attacks.", price: 260.00, image: "assets/images/Paroxetine.png", dosage: "20mg", category: "mental-health" },
{ id: "m84", name: "Aceclofenac", description: "NSAID for pain and inflammation in rheumatoid arthritis.", price: 100.00, image: "assets/images/Aceclofenac.jpeg", dosage: "100mg", category: "pain-relief" },
{ id: "m85", name: "Dapagliflozin", description: "SGLT2 inhibitor for type 2 diabetes.", price: 420.00, image: "assets/images/Dapagliflozin.jpeg", dosage: "10mg", category: "diabetes" },
{ id: "m86", name: "Clopidogrel", description: "Antiplatelet agent to prevent heart attack and stroke.", price: 90.00, image: "assets/images/Clopidogrel.jpeg", dosage: "75mg", category: "cardiovascular" },
{ id: "m87", name: "Mometasone Cream", description: "Corticosteroid for skin conditions like eczema.", price: 140.00, image: "assets/images/Mometasone Cream.jpeg", dosage: "0.1%", category: "skin-care" },
{ id: "m88", name: "Sodium Fusidate Ointment", description: "Antibiotic ointment for bacterial skin infections.", price: 160.00, image: "assets/images/SGO.jpeg", dosage: "2%", category: "skin-care" },
{ id: "m89", name: "Methylcobalamin", description: "Vitamin B12 supplement for nerve health and anemia.", price: 180.00, image: "assets/images/Methylcobalamin.jpeg", dosage: "1500mcg", category: "vitamins-supplements" },
{ id: "m90", name: "Ursodeoxycholic Acid", description: "For dissolving gallstones and treating liver disease.", price: 550.00, image: "assets/images/Ursodeoxycholic Acid.jpeg", dosage: "300mg", category: "digestive-health" },
{ id: "m91", name: "Deflazacort", description: "Corticosteroid with anti-inflammatory properties.", price: 170.00, image: "assets/images/Deflazacort.jpg", dosage: "6mg", category: "anti-inflammatory" },
{ id: "m92", name: "Teneligliptin", description: "Anti-diabetic drug for type 2 diabetes.", price: 150.00, image: "assets/images/Teneligliptin.jpg", dosage: "20mg", category: "diabetes" },
{ id: "m93", name: "Rabeprazole", description: "Proton pump inhibitor for GERD and peptic ulcers.", price: 80.00, image: "assets/images/Rabeprazole.jpg", dosage: "20mg", category: "digestive-health" },
{ id: "m94", name: "Minoxidil Solution", description: "For treating male pattern baldness.", price: 600.00, image: "assets/images/Minoxidil_solution.jpg", dosage: "5%", category: "hair-care" },
{ id: "m95", name: "Ebastine", description: "Non-sedating antihistamine for allergic rhinitis.", price: 110.00, image: "assets/images/Ebastine.jpg", dosage: "10mg", category: "allergy" },
{ id: "m96", name: "Ivabradine", description: "For symptomatic stable angina.", price: 480.00, image: "assets/images/Ivabradine.jpeg", dosage: "5mg", category: "cardiovascular" },
{ id: "m97", name: "Itraconazole", description: "Antifungal for a broad range of fungal infections.", price: 320.00, image: "assets/images/Itraconazole.jpeg", dosage: "100mg", category: "antifungal" },
{ id: "m98", name: "Ketorolac", description: "Potent NSAID for short-term management of moderate to severe pain.", price: 95.00, image: "assets/images/Ketorolac.jpeg", dosage: "10mg", category: "pain-relief" },
{ id: "m99", name: "Budesonide Inhaler", description: "Corticosteroid for long-term management of asthma.", price: 450.00, image: "assets/images/Budesonide Inhaler.jpeg", dosage: "200mcg/puff", category: "respiratory" },
{ id: "m100", name: "Ferrous Ascorbate", description: "Iron supplement for iron deficiency anemia.", price: 130.00, image: "assets/images/Ferrous Ascorbate.jpeg", dosage: "100mg", category: "vitamins-supplements" },
];

  // Mock symptoms database updated with new medicine IDs
  private symptoms: Symptom[] = [
    { id: "s1", name: "Headache", description: "Pain in any region of the head.", relatedMedicines: ["m1", "m2", "m9", "m31"] },
    { id: "s2", name: "Fever", description: "A temporary increase in body temperature, often due to illness.", relatedMedicines: ["m1", "m2", "m9"] },
    { id: "s3", name: "Allergic Rhinitis", description: "Inflammation of the inside of the nose caused by an allergen.", relatedMedicines: ["m3", "m6", "m22", "m54", "m82", "m95"] },
    { id: "s4", name: "Heartburn / Acidity", description: "A burning pain in the chest, just behind the breastbone.", relatedMedicines: ["m4", "m20", "m44", "m93"] },
    { id: "s5", name: "Sore Throat", description: "Pain, scratchiness or irritation of the throat.", relatedMedicines: ["m1", "m5", "m7", "m73"] },
    { id: "s6", name: "Diarrhea", description: "Loose, watery bowel movements.", relatedMedicines: ["m8", "m53"] },
    { id: "s7", name: "Muscle Pain", description: "Pain affecting the muscles of the body.", relatedMedicines: ["m2", "m19", "m31", "m84"] },
    { id: "s8", name: "Common Cold / Cough", description: "A mild viral infection of the nose and throat.", relatedMedicines: ["m1", "m3", "m10", "m11", "m42", "m79"] },
    { id: "s9", name: "High Blood Pressure", description: "Hypertension, a condition where the force of blood against artery walls is too high.", relatedMedicines: ["m16", "m24", "m36", "m46", "m51", "m66", "m74", "m78"] },
    { id: "s10", name: "Diabetes", description: "A group of diseases that result in too much sugar in the blood.", relatedMedicines: ["m14", "m34", "m67", "m85", "m92"] },
    { id: "s11", name: "Skin Fungal Infection", description: "Fungal infections on the skin like ringworm or athlete's foot.", relatedMedicines: ["m17", "m37", "m71", "m80", "m97"] },
    { id: "s12", name: "Bacterial Skin Infection", description: "Infections on the skin caused by bacteria.", relatedMedicines: ["m49", "m50", "m69", "m88"] },
    { id: "s13", name: "Nausea and Vomiting", description: "Feeling of sickness with an inclination to vomit.", relatedMedicines: ["m29", "m75"] },
    { id: "s14", name: "Anxiety", description: "Feelings of worry, anxiety, or fear that are strong enough to interfere with one's daily activities.", relatedMedicines: ["m23", "m35", "m47", "m61", "m83"] }
  ];

  // Demo users for authentication
  private demoUsers = [
    {
      id: "u1",
      email: "user@example.com",
      password: "password123",
      name: "John Doe",
      role: "user" as UserRole,
      medicalHistory: ["Allergy to peanuts", "Asthma"]
    },
    {
      id: "u2",
      email: "admin@example.com",
      password: "admin123",
      name: "Admin User",
      role: "admin" as UserRole,
      medicalHistory: []
    }
  ];

  // Get all medicines
  getAllMedicines(): Medicine[] {
    return [...this.medicines];
  }

  // Get medicine by ID
  getMedicineById(id: string): Medicine | undefined {
    return this.medicines.find(medicine => medicine.id === id);
  }

  // Get medicines by category
  getMedicinesByCategory(category: string): Medicine[] {
    return this.medicines.filter(medicine => medicine.category === category);
  }

  // Get all categories
  getCategories(): string[] {
    const categoriesSet = new Set(this.medicines.map(medicine => medicine.category));
    return Array.from(categoriesSet);
  }

  // Get all symptoms
  getAllSymptoms(): Symptom[] {
    return [...this.symptoms];
  }

  // Get symptom by ID
  getSymptomById(id: string): Symptom | undefined {
    return this.symptoms.find(symptom => symptom.id === id);
  }

  // Get medicines by symptom ID
  getMedicinesBySymptomId(symptomId: string): Medicine[] {
    const symptom = this.getSymptomById(symptomId);
    if (!symptom) return [];
    return symptom.relatedMedicines
      .map(id => this.getMedicineById(id))
      .filter(Boolean) as Medicine[];
  }

  // Search medicines
  searchMedicines(searchTerm: string): Medicine[] {
    const term = searchTerm.toLowerCase();
    return this.medicines.filter(medicine =>
      medicine.name.toLowerCase().includes(term) ||
      medicine.description.toLowerCase().includes(term)
    );
  }

  // Get demo users (for authentication)
  getDemoUsers() {
    return [...this.demoUsers];
  }

  // Format price in Indian Rupees
  formatIndianPrice(price: number): string {
    return `₹${price.toFixed(2)}`;
  }
}