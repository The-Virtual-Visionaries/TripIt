import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateItinerary from "./createpage/CreateItinerary";
import Itineraries from "./itinerariespage/Itineraries";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create" element={<CreateItinerary />} />
        <Route path="/itineraries" element={<Itineraries />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
