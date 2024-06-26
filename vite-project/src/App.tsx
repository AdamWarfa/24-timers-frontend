import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ParticipantPage from "./pages/ParticipantPage";
import DisciplinePage from "./pages/DisciplinePage";
import ResultPage from "./pages/ResultPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/participants" element={<ParticipantPage />} />
        <Route path="/disciplines" element={<DisciplinePage />} />
        <Route path="/results" element={<ResultPage />} />
      </Routes>
    </>
  );
}

export default App;
