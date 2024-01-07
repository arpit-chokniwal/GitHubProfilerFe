import { BrowserRouter, Route, Routes } from "react-router-dom";
import GithubProfiler from "./pages/GithubProfiler";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GithubProfiler />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
