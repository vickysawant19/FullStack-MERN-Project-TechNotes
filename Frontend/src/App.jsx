import { useDispatch, useSelector } from "react-redux";
import Hero from "./pages/public/Hero";

function App() {
  const dispatch = useDispatch();

  return (
    <>
      <Hero />
    </>
  );
}

export default App;
