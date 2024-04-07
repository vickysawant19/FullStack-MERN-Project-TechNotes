import { useDispatch, useSelector } from "react-redux";
import Hero from "./pages/public/Hero";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle("TechNote Electronics");

  return (
    <>
      <Hero />
    </>
  );
}

export default App;
