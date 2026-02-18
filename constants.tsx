
import { EmergencyScenario, Symptom } from './types';

export const SCENARIOS: EmergencyScenario[] = [
  { id: 'accident', title: 'Car Accident', icon: '🚗', description: 'Collision injuries, trapped in vehicle' },
  { id: 'animal', title: 'Wild Animal Attack', icon: '🐻', description: 'Bites, scratches, venomous snakes' },
  { id: 'disaster', title: 'Disaster / Tech Incident', icon: '🌋', description: 'Flooding, fire, chemical leaks' },
  { id: 'medical', title: 'Medical Emergency', icon: '❤️', description: 'Diabetes, asthma, heart attack' },
  { id: 'poison', title: 'Poisoning', icon: '🧪', description: 'Chemicals, food, toxic gases' }
];

export const SYMPTOMS_BY_SCENARIO: Record<string, Symptom[]> = {
  accident: [
    { id: 'bleeding', label: 'Severe Bleeding' },
    { id: 'fracture', label: 'Suspected Fracture' },
    { id: 'unconscious', label: 'Loss of Consciousness' },
    { id: 'breathing_diff', label: 'Difficulty Breathing' }
  ],
  animal: [
    { id: 'bite_deep', label: 'Deep Bite' },
    { id: 'venomous', label: 'Suspected Venomous Bite' },
    { id: 'rabies_risk', label: 'Rabies Risk' },
    { id: 'swelling', label: 'Severe Swelling' }
  ],
  medical: [
    { id: 'sugar_low', label: 'Hypoglycemia (shaking, sweating)' },
    { id: 'asthma_attack', label: 'Asthma Attack (gasping)' },
    { id: 'chest_pain', label: 'Chest Pain' },
    { id: 'seizure', label: 'Seizure' }
  ],
  poison: [
    { id: 'vomiting', label: 'Vomiting / Nausea' },
    { id: 'burns_mouth', label: 'Burns in Mouth' },
    { id: 'dizziness', label: 'Dizziness / Hallucinations' }
  ],
  disaster: [
    { id: 'burns', label: 'Thermal Burns' },
    { id: 'smoke_inhale', label: 'Smoke Inhalation' },
    { id: 'hypothermia', label: 'Hypothermia / Exposure' }
  ]
};

export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", 
  "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", 
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", 
  "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", 
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];
