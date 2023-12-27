import { useState, useEffect } from "react";
import { Patient, Gender } from "../../types";
import { useParams } from 'react-router-dom';
import patientService from "../../services/patients";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Typography } from "@mui/material";

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

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {  
        const fetchPatientList = async () => {
          const patients = await patientService.getAll();
          setPatients(patients);
        };
        void fetchPatientList();
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
        </div>
    );
};

export default PatientPage;