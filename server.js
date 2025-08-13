import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/medicinesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Schema & Model
const medicineSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
  image: String,
  dosage: String,
  category: String
});
const Medicine = mongoose.model('Medicine', medicineSchema);

// Routes
app.get('/medicines', async (req, res) => {
  res.json(await Medicine.find());
});

app.get('/medicines/:id', async (req, res) => {
  const med = await Medicine.findOne({ id: req.params.id });
  res.json(med);
});

app.listen(5000, () => console.log('Server running on port 5000'));
