import { Route, Routes } from "react-router-dom";
import Home from "./views/home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route index path='/' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
