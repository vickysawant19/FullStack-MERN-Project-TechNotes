import Navbar from "./pages/public/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { decriment, increment, selectCount } from "./store/couterSlice";
import Hero from "./pages/public/Hero";

function App() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <>
      <Hero />
    </>
  );
}

export default App;
