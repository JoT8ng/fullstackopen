import { courseParts } from "../types";

const Total = () => {
    const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

    return (
        <p>
            Number of exercises {totalExercises}
        </p>
    )
};

export default Total;