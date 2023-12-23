import { useState, useEffect } from "react"
import { DiaryEntry } from "../types"
import { getAllDiaries } from "../services/diaryService";

const DiaryContent = () => {
    const [entry, setEntry] = useState<DiaryEntry[]>([]);

    useEffect(() => {
        getAllDiaries().then(data => {
            setEntry(data)
        })
    }, [])

    return (
        <div>
            {entry.map(entries =>
                <div>
                    <h3 key={entries.id}>{entries.date}</h3>
                    <p key={entries.id}>Visibility: {entries.visibility}</p>
                    <p key={entries.id}>Weather: {entries.weather}</p>
                </div>
            )}
        </div>
    )
}

export default DiaryContent