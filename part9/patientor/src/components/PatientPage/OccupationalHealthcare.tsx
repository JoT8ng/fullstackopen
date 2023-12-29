import { OccupationalHealthcareEntry } from "../../types";

const OccuHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    
    return (
        <div>
            <p>Employer Name: {entry.employerName}</p>
            <p>Sick Leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</p>
        </div>
    );
};

export default OccuHealthcare;