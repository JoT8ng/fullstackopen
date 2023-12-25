// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

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
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type selectPatientEntry = Omit<patientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<patientEntry, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}