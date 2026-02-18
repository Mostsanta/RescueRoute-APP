
export enum VictimType {
  ADULT = 'ADULT',
  CHILD = 'CHILD'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export interface EmergencyScenario {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface Symptom {
  id: string;
  label: string;
}

export interface AidInstruction {
  do: string[];
  dont: string[];
  improvisedTools: string[];
  legalNotes: string;
  steps: string[];
}

export interface AppState {
  scenario: string | null;
  stateName: string;
  victimType: VictimType;
  gender: Gender;
  symptoms: string[];
}
