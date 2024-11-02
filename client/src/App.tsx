import { Route, Routes } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Home from "./views/home/Home";
// import About from "./views/about/About";
// import Contact from "./views/contact/Contact";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route index path='/' element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </>
  );
}

export default App;
