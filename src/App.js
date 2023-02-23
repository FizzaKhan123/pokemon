import HomePage from "../src/components/homePage";
import DetailPage from "../src/components/detailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="pokemonDetail/:name" element={<DetailPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
