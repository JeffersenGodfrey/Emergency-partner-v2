export function detectEmergency(text) {
  text = text.toLowerCase();

  const medicalKeywords = [
    'ambulance',
    'oxygen',
    'emergency',
    'injury',
    'doctor',
    'hospital',
    'medic',
    'covid',
    'icu',
    'blood',
    'sick',
  ];

  const floodKeywords = [
    'flood',
    'water',
    'shelter',
    'rain',
    'relief',
    'rescue',
    'food',
    'help',
    'disaster',
    'emergency food',
  ];

  const chargingKeywords = [
    'charge',
    'charging',
    'electricity',
    'battery',
    'power',
    'phone dead',
    'generator',
    'mobile charge',
    'fuel',
    'petrol',
  ];

  for (const word of medicalKeywords) {
    if (text.includes(word)) return 'Medical Emergency';
  }

  for (const word of floodKeywords) {
    if (text.includes(word)) return 'Flood Help';
  }

  for (const word of chargingKeywords) {
    if (text.includes(word)) return 'Charging Station';
  }

  return 'Medical Emergency';
}
