import './App.css';
import { StudentForm } from './components/StudentForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudentDetails } from './components/StudentDetails';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/studentDetails" element={<StudentDetails />} />
          <Route path="/404" element={<div>Choose the correct path</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
