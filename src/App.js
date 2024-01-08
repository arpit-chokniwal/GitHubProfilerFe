import { Route, Routes } from "react-router-dom";
import SearchGitUser from "./pages/SearchGitUser";
import UserGithubProfiler from "./pages/UserGithubProfiler";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchGitUser />} />
        <Route path="/user" element={<UserGithubProfiler />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
