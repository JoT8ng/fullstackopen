import { EntryWithoutId, NewBaseEntry, DiagnoseEntry, HealthCheckRating, SickLeave, Discharge } from "../../types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown) : text is number => {
    return typeof text === 'number' || text instanceof Number;
};

const parseDescription = (description: unknown): string => {
    if(!description || !isString(description)){
        throw new Error('Incorrect ot missing description');
    }
    return description;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate){
        throw new Error('Incorrect ot missing date');
    }
    return date;
};

const parseSpecialist = (specialist: unknown): string => {
    if(!specialist || !isString(specialist)){
        throw new Error('Incorrect ot missing specialist');
    }
    return specialist;
};

const parseDiagnosisCodes = (diagnosis: unknown): Array<DiagnoseEntry['code']> => {
    if (!diagnosis || typeof diagnosis !== 'object' || !('diagnosisCodes' in diagnosis)) {
        return [] as Array<DiagnoseEntry['code']>;
      }
    return diagnosis.diagnosisCodes as Array<DiagnoseEntry['code']>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if(!healthCheckRating || !isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)){
        throw new Error ('Incorrect or missing healthCheckRating');
    }
    return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
    if(!employerName || !isString(employerName)){
        throw new Error('Incorrect ot missing employer name');
    }
    return employerName;
};

const parseSickLeave = (sick: unknown): SickLeave => {
    if (!sick || typeof sick !== 'object') {
        throw new Error('Incorrect or missing sick leave data');
    }

    if ('startDate' in sick && 'endDate' in sick) {
        const sickLeave: SickLeave = {
            startDate: parseDate(sick.startDate),
            endDate: parseDate(sick.endDate)
        };
        return sickLeave;
    }
    throw new Error('incorrect or field missing');
};

const parseCriteria = (criteria: unknown): string => {
    if(!criteria || !isString(criteria)){
        throw new Error('Incorrect or missing criteria');
    }
    return criteria;
};

const parseDischarge = (discharge: unknown): Discharge => {
    if( !discharge || typeof discharge !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if( 'date' in discharge && 'criteria' in discharge) {
        const dischargeData: Discharge = {
            date: parseDate(discharge.date),
            criteria: parseCriteria(discharge.criteria)
        };
        return dischargeData;
    }
    throw new Error('Incorrect or field missing');
};

const toNewEntry = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
      }

    if ('description' in object && 'date' in object && 'specialist' in object) {
        const newBaseEntry: NewBaseEntry = 'diagnosisCodes' in object ?
        {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
        }
        :
        {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist)
        };
        
        if ('type' in object) {
            switch(object.type){
                case 'HealthCheck':
                    if ('healthCheckRating' in object) {
                        const healthCheckEntry: EntryWithoutId = {
                            ...newBaseEntry,
                            type: 'HealthCheck',
                            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                        };
                        return healthCheckEntry;
                    }
                    throw new Error("Incorrect data: health check rating missing");
                case 'OccupationalHealthcare':
                    if ('employerName' in object) {
                        const occuHealthCareEntry: EntryWithoutId = 'sickLeave' in object ?
                        {
                            ...newBaseEntry,
                            type: 'OccupationalHealthcare',
                            employerName: parseEmployerName(object.employerName),
                            sickLeave: parseSickLeave(object.sickLeave)
                        }
                        :
                        {
                            ...newBaseEntry,
                            type: 'OccupationalHealthcare',
                            employerName: parseEmployerName(object.employerName)
                        };
                        return occuHealthCareEntry;
                    }
                    throw new Error("Incorrect data: occupational healthcare missing");
                case 'Hospital':
                    if ('discharge' in object) {
                        const hospitalEntry: EntryWithoutId = {
                            ...newBaseEntry,
                            type: 'Hospital',
                            discharge: parseDischarge(object.discharge)
                        };
                        return hospitalEntry;
                    }
                    throw new Error("Incorrect data: discharge missing");
            }
        }
    }
    throw new Error('Incorrect data: some fields are missing');
};

export default toNewEntry;