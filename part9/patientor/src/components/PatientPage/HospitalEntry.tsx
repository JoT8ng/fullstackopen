import { HospitalEntry } from "../../types";

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    
    return (
        <div>
            <p>Discharge: {entry.discharge.date} {entry.discharge.criteria}</p>
        </div>
    );
};

export default Hospital;