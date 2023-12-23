import DiaryContent from "./components/DiaryContent";
import DiaryForm from "./components/DiaryForm";

const App = () => {

  return (
    <div>
      <h1>Add new entry</h1>
      <DiaryForm />
      <h1>Diary entries</h1>
      <DiaryContent />
    </div>
  );
};

export default App;