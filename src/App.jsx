import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Add from "./pages/Add";
import LayoutAdmin from "./Layout/Layout";

function App() {
  return (
    <LayoutAdmin>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </LayoutAdmin>
  );
}

export default App;
