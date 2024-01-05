import { useState, SyntheticEvent, ChangeEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { HealthCheckRating, EntryWithoutId, Diagnosis } from "../../types";

interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryWithoutId) => void;
}

interface HealthCheckRatingOptions {
    value: number;
    label: string;
}
  
const healthCheckRatingOptions: HealthCheckRatingOptions[] = Object.values(HealthCheckRating).map(v => ({
    value: v as number, label: v.toString()
}));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis["code"]>>([]);
    const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStart, setSickLeaveStart] = useState('');
    const [sickLeaveEnd, setSickLeaveEnd] = useState('');
    const [entryOptions, setEntryOptions] = useState<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'>('HealthCheck');
  
    const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();

        const value = Number(event.target.value);
        console.log(value);

        const healthCheckRating = Object.values(HealthCheckRating);
        console.log(healthCheckRating);

        if (value && healthCheckRating.includes(value)) {
          setHealthCheckRating(value);
        } 

    };

    const onDiagnosisCodesChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const value = event.target.value;
        console.log(value);

        typeof value === "string" ? setDiagnosisCodes(value.split(', ')) : setDiagnosisCodes(value);
    };
  
    const addEntry = (event: SyntheticEvent) => {
      event.preventDefault();
      const baseEntry = {
        description,
        date,
        specialist,
        diagnosisCodes
      };

      switch(entryOptions) {
        case 'HealthCheck':
            onSubmit ({
                type: 'HealthCheck',
                ...baseEntry,
                healthCheckRating
            });
            break;
        case 'Hospital':
            onSubmit ({
                type: 'Hospital',
                ...baseEntry,
                discharge: {
                    date: dischargeDate,
                    criteria: dischargeCriteria
                }
            });
            break;
        case 'OccupationalHealthcare':
            onSubmit ({
                type: 'OccupationalHealthcare',
                ...baseEntry,
                employerName: employerName,
                sickLeave: sickLeaveStart && sickLeaveEnd ? {
                    startDate: sickLeaveStart,
                    endDate: sickLeaveEnd
                } : undefined
            });
            break;
      }
    };
  
    return (
      <div>
        <h1>Add New Entry</h1>
        <label>Entry Type</label>
        <select value={entryOptions} onChange={({ target }) => setEntryOptions(target.value as 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare')}>
            <option value=''>Select an entry type</option>
            <option key='HealthCheck' value='HealthCheck'>Health Check</option>
            <option key='Hospital' value='Hospital'>Hospital Entry</option>
            <option key='OccupationalHealthcare' value='OccupationalHealthcare'>Occupational Healthcare</option>
        </select>
        <form onSubmit={addEntry}>
          <TextField
            label="Description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            fullWidth
            type="date"
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <TextField
            label="Diagnosis Codes"
            fullWidth
            value={diagnosisCodes}
            onChange={onDiagnosisCodesChange}
          />
  
          {entryOptions === 'HealthCheck' &&
            <>
                <InputLabel style={{ marginTop: 20 }}>HealthCheckRating</InputLabel>
                <Select
                    label="HealthCheckRating"
                    fullWidth
                    value={healthCheckRating.toString()}
                    onChange={onHealthCheckRatingChange}
                >
                    {healthCheckRatingOptions.map(option =>
                        <MenuItem
                            key={option.label}
                            value={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    )}
                </Select>
            </>
          }

          {entryOptions === "Hospital" && 
            <>
                <InputLabel style={{ marginTop: 20 }}>Discharge Date</InputLabel>
                <TextField 
                    type="date"
                    fullWidth
                    value={dischargeDate}
                    onChange={({ target }) => setDischargeDate(target.value)}
                />
                <InputLabel style={{ marginTop: 20 }}>Discharge Criteria</InputLabel>
                <TextField 
                    label='discharge criteria'
                    fullWidth
                    value={dischargeCriteria}
                    onChange={({ target }) => setDischargeCriteria(target.value)}
                />
            </>
          }

          {entryOptions === "OccupationalHealthcare" && 
            <>
                <InputLabel style={{ marginTop: 20 }}>Employer Name</InputLabel>
                <TextField 
                    label='employername'
                    fullWidth
                    value={employerName}
                    onChange={({ target }) => setEmployerName(target.value)}
                />

                <InputLabel style={{ marginTop: 20 }}>Sick Leave: </InputLabel>
                <InputLabel style={{ marginTop: 5 }}>Start Date</InputLabel>
                <TextField 
                    type='date'
                    fullWidth
                    value={sickLeaveStart}
                    onChange={({ target }) => setSickLeaveStart(target.value)}
                />
                <InputLabel style={{ marginTop: 5 }} >End Date</InputLabel>
                <TextField 
                    type='date'
                    fullWidth
                    value={sickLeaveEnd}
                    onChange={({ target }) => setSickLeaveEnd(target.value)}
                />
            </>
          }
  
          <Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
};
  
export default AddEntryForm;