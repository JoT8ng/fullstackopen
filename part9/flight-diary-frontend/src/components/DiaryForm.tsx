import { useState } from "react"
import axios, {AxiosError} from 'axios'
import { DiaryEntry, Visibility, Weather } from "../types"
import { createEntry } from "../services/diaryService"

interface ValidationError {
    message: string;
    errors: Record<string, string[]>
}

const DiaryForm = () => {
    const [entry, setEntry] = useState<DiaryEntry[]>([]);
    const [date, setDate] = useState('');
    const [weather, setWeather] = useState('');
    const [visibility, setVisibility] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const errorStyle = {
        color: 'red',
        fontSize: 20,
        padding: 10,
        marginBottom: 10,
    }

    const entryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        createEntry({
            date: date,
            weather: weather as Weather,
            visibility: visibility as Visibility,
            comment: comment
        }).then(data => {
            setEntry(entry.concat(data))
        }).catch((err: Error | AxiosError) => {
            if (axios.isAxiosError<ValidationError, Record<string, unknown>>(err)) {
                console.log(err.status)
                console.error(err.response);
                setError(`failed to add diary entry: ${err.response}`)
            } else {
                console.error(err);
            }
        });
    };

    return (
        <div>
            <div>
                {error && error !== null && <p style={errorStyle}>{error}</p>}
            </div>
            <form onSubmit={entryCreation}>
                <div>
                    <label>
                        Date:
                        <input
                        type="date"
                        name="date"
                        value={date}
                        onChange={({ target }) => setDate(target.value)} 
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Weather:
                        <input
                        type="radio"
                        name="weather"
                        value={Weather.Sunny}
                        onChange={({ target }) => setWeather(target.value)} 
                        />
                        <label>Sunny</label>
                        <input
                        type="radio"
                        name="weather"
                        value={Weather.Rainy}
                        onChange={({ target }) => setWeather(target.value)} 
                        />
                        <label>Rainy</label>
                        <input
                        type="radio"
                        name="weather"
                        value={Weather.Cloudy}
                        onChange={({ target }) => setWeather(target.value)} 
                        />
                        <label>Cloudy</label>
                        <input
                        type="radio"
                        name="weather"
                        value={Weather.Stormy}
                        onChange={({ target }) => setWeather(target.value)} 
                        />
                        <label>Stormy</label>
                        <input
                        type="radio"
                        name="weather"
                        value={Weather.Windy}
                        onChange={({ target }) => setWeather(target.value)} 
                        />
                        <label>Windy</label>
                    </label>
                </div>
                <div>
                    <label>
                        Visibility:
                        <input
                        type="radio"
                        name="visibility"
                        value={Visibility.Great}
                        onChange={({ target }) => setVisibility(target.value)} 
                        />
                        <label>Great</label>
                        <input
                        type="radio"
                        name="visibility"
                        value={Visibility.Good}
                        onChange={({ target }) => setVisibility(target.value)} 
                        />
                        <label>Good</label>
                        <input
                        type="radio"
                        name="visibility"
                        value={Visibility.Ok}
                        onChange={({ target }) => setVisibility(target.value)} 
                        />
                        <label>Ok</label>
                        <input
                        type="radio"
                        name="visibility"
                        value={Visibility.Poor}
                        onChange={({ target }) => setVisibility(target.value)} 
                        />
                        <label>Poor</label>
                    </label>
                </div>
                <div>
                    <label>
                        Comment:
                        <input
                        type="text"
                        name="comment"
                        value={comment}
                        onChange={({ target }) => setComment(target.value)} 
                        />
                    </label>
                </div>
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default DiaryForm