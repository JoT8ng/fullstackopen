import { useState, useEffect } from "react";
import { Patient, Gender, Diagnosis, Entry } from "../../types";
import { useParams } from 'react-router-dom';
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Typography } from "@mui/material";
import HealthCheck from "./HealthCheck";
import Hospital from "./HospitalEntry";
import OccuHealthcare from "./OccupationalHealthcare";

const genderId = (gender: Gender | undefined ) => {
    switch(gender){
        case "female":
            return <FemaleIcon />;
        case "male":
            return <MaleIcon/>;
        default:
            return null;
    }
};

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch(entry.type) {
        case "Hospital":
            return <Hospital entry={entry} />;
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        case "OccupationalHealthcare":
            return <OccuHealthcare entry={entry} />;
        default:
            return assertNever(entry);
    }
};

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [patients, setPatients] = useState<Patient[]>([]);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {  
        const fetchPatientList = async () => {
          const patients = await patientService.getAll();
          setPatients(patients);
        };
        void fetchPatientList();
        const fetchDiagnosisList = async() => {
            const diagnoses = await diagnosisService.getDiagnose();
            setDiagnoses(diagnoses);
        };
        void fetchDiagnosisList();
    }, []);
    
    const patient = patients.find((patient: Patient) => patient.id === id);

    return (
        <div>
            <h1>{patient?.name}</h1>
            <Typography>{genderId(patient?.gender)}</Typography>
            <div>
                <p>ssh: {patient?.ssn}</p>
                <p>Occupation: {patient?.occupation}</p>
            </div>
            <h2>Entries</h2>
            {patient?.entries.map(entry => {
                return (
                    <div key={entry.id}>
                        <p>{entry.date}</p>
                        <p><i>{entry.description}</i></p>
                        <ul>
                            {entry.diagnosisCodes?.map(d => {
                                const diagnosis = diagnoses.find(diagnose => diagnose.code === d)?.name;
                                return (
                                    <li key={d}>{d} {diagnosis? diagnosis : null}</li>
                                );
                            })}
                        </ul>
                        {patient.entries.map((entry, i) => (
                            <div key={i}>
                                {Object.keys(diagnoses).length === 0 ? null : (
                                    <EntryDetails entry={entry} />
                                )}
                            </div>
                        ))}
                    </div>
                );
            })}
            <div>
            </div>
        </div>
    );
};

export default PatientPage;