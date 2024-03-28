import Navbar from "./pages/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { decriment, increment, selectCount } from "./store/couterSlice";

function App() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <h1 className="text-xl"> {count}</h1>
      <button
        className="p-2 border hover:bg-stone-500 m-2"
        onClick={() => {
          dispatch(increment());
        }}
      >
        count +
      </button>
      <button
        className="p-2 border hover:bg-stone-500 m-2"
        onClick={() => {
          dispatch(decriment());
        }}
      >
        count +
      </button>
    </>
  );
}

export default App;
