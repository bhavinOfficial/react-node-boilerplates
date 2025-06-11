import { useAppSelector } from "./redux/hooks/index";

const MyComponent = () => {
  const count = useAppSelector((state) => state.counter);
  return <div style={{ marginTop: "50px" }}>My count :{count}</div>;
};

export default MyComponent;
