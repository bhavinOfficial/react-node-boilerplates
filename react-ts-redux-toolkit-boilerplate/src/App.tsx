import "./App.css";
import { useAppSelector, useAppDispatch } from "./redux/hooks/index";
import {
  increment,
  decrement,
  incrementByValue,
  decrementByValue,
} from "./redux/slices/counter/index";
import Navbar from "./components/Navbar";
import MyComponent from "./MyComponent";
import Create from "./components/Create";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Read from "./components/Read";
import Update from "./components/Update";

function App() {
  // const [count, setCount] = useState(0)
  const count = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <>
      <h1>Count is {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByValue(10))}>
        Increment by 10
      </button>
      <button onClick={() => dispatch(decrementByValue(10))}>
        decrement by 10
      </button>
      <MyComponent />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/read" element={<Read />} />
          <Route path="/edit/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
