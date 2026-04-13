import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { detectEmergency } from '../utils/nlpEngine.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = join(__dirname, '../data/emergency_data.json');
const data = JSON.parse(readFileSync(dataPath, 'utf-8'));

router.post('/search', (req, res) => {
  const { city, emergencyType, description } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  let type = emergencyType;
  if (!type && description) {
    type = detectEmergency(description);
  }

  if (!type) {
    return res.status(400).json({ error: 'Emergency type or description required' });
  }

  const cityMap = {
    Chennai: [
      'T Nagar',
      'Anna Nagar',
      'Velachery',
      'Saidapet',
      'Guindy',
      'Mylapore',
      'Chennai Central',
    ],
    Delhi: ['Connaught Place', 'Central Delhi', 'Rajiv Chowk', 'Ansari Nagar'],
    Mumbai: ['Andheri East', 'Vikhroli', 'Byculla'],
    Bangalore: ['Bannerghatta', 'Anekal', 'Majestic'],
    Pune: ['Wakad'],
    Kolkata: ['Park Street', 'Kolkata North'],
    Tirupati: ['Tirupati'],
    Nagpur: ['Nagpur'],
  };

  const locations = cityMap[city] || [];
  const results = data.filter(
    (r) => r.category.toLowerCase() === type.toLowerCase() && locations.includes(r.location)
  );

  res.json({ type, results, count: results.length });
});

router.post('/detect', (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'Description required' });
  }

  const type = detectEmergency(description);
  res.json({ type });
});

export default router;
