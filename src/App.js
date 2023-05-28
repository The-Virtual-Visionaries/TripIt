import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateItinerary from "./createpage/CreateItinerary";
import ActivityRecommender from "./activitypage/ActivityRecommender";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create" element={<CreateItinerary />} />
        <Route path="/activity" element={<ActivityRecommender />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
