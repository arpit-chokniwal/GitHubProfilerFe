import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchGitUser from "./pages/SearchGitUser";
import UserGithubProfiler from "./pages/UserGithubProfiler";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchGitUser />} />
        <Route path="/user" element={<UserGithubProfiler />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
