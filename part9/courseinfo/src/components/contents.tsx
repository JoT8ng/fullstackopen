import { CoursePart } from "../types";

const Part = (props: CoursePart) => {
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch (props.kind) {
        case "basic":
            console.log(props.name, props.exerciseCount, props.description);
            return (
                <div>
                    <h3>{props.name}</h3>
                    <p>Exercise Count: {props.exerciseCount}</p>
                    <p>Description: {props.description}</p>
                </div>
            )
        case "group":
            console.log(props.name, props.exerciseCount, props.groupProjectCount);
            return (
                <div>
                    <h3>{props.name}</h3>
                    <p>Exercise Count: {props.exerciseCount}</p>
                    <p>Group Project Count: {props.groupProjectCount}</p>
                </div>
            )
        case "background":
            console.log(props.name, props.exerciseCount, props.description, props.backgroundMaterial);
            return (
                <div>
                    <h3>{props.name}</h3>
                    <p>Exercise Count: {props.exerciseCount}</p>
                    <p>Description: {props.description}</p>
                    <p>Background Material: {props.backgroundMaterial}</p>
                </div>
            )
        default:
            return assertNever(props);
    }
};

interface courseData {
    courseParts: CoursePart[]
}

const Content = ({ courseParts }: courseData) => {

    return (
        <div>
            {courseParts.map(part => {
                return <Part key={part.name} {...part} />
            })}
        </div>
    )
};

export default Content;