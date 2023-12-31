import { useState, useEffect } from "react";
import axios from 'axios';
import { Patient, Gender, Diagnosis, Entry, EntryWithoutId } from "../../types";
import { useParams } from 'react-router-dom';
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Typography, Button } from "@mui/material";
import HealthCheck from "./HealthCheck";
import Hospital from "./HospitalEntry";
import OccuHealthcare from "./OccupationalHealthcare";
import AddEntryModal from "../AddEntryModal";

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

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

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
    
    let patient = patients.find((patient: Patient) => patient.id === id);

    const submitNewEntry = async (values: EntryWithoutId) => {
        try {
            if (patient) {
                const entry = await patientService.createEntry(patient.id, values);
                patient = {...patient, entries: patient.entries.concat(entry)};
                setModalOpen(false);
            }
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            if (e?.response?.data && typeof e?.response?.data === "string") {
              const message = e.response.data.replace('Something went wrong. Error: ', '');
              console.error(message);
              setError(message);
            } else {
              setError("Unrecognized axios error");
            }
          } else {
            console.error("Unknown error", e);
            setError("Unknown error");
          }
        }
    };

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
                        {patient? patient.entries.map((entry, i) => (
                            <div key={i}>
                                {Object.keys(diagnoses).length === 0 ? null : (
                                    <EntryDetails entry={entry} />
                                )}
                            </div>
                        ))
                        :
                        null
                        }
                    </div>
                );
            })}
            <div>
                <AddEntryModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <Button variant="contained" onClick={() => openModal()}>
                    Add New Entry
                </Button>
            </div>
        </div>
    );
};

export default PatientPage;