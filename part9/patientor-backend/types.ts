export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface patientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: 'male' | 'female' | 'other';
    occupation: string;
}

export type selectPatientEntry = Omit<patientEntry, 'ssn'>;

export type NewPatientEntry = Omit<patientEntry, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}