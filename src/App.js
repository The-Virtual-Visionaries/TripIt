import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateItinerary from "./createpage/CreateItinerary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create" element={<CreateItinerary />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
