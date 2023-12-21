import Content from "./components/contents";
import Header from "./components/header";
import Total from "./components/total";
import { courseParts } from "./types";

const App = () => {
  const courseName: string = "Half Stack application development";

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total />
    </div>
  );
};

export default App;