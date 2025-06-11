import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAppDispatch } from "../redux/hooks";
import { createUser } from "../redux/slices/userData";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    age: string;
    gender: string;
  }>({
    name: "",
    email: "",
    age: "",
    gender: "",
  });
  const dispatch = useAppDispatch();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("🚀 ~ Create ~ user:", user);
    dispatch(createUser(user));
    navigate("/read");
  };
  return (
    <div>
      <h2 className="mx-auto">Fill the data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            name="name"
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            className="form-control"
            id="age"
            name="age"
            placeholder="Enter age"
            onChange={handleOnChange}
          />
        </div>
        {/* <div className="input-group mb-3"> */}
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value="Male"
            id="defaultCheck1"
            name="gender"
            onChange={handleOnChange}
          />
          <label className="htmlForm-check-label" htmlFor="defaultCheck1">
            Male
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value="Female"
            id="defaultCheck2"
            name="gender"
            onChange={handleOnChange}
          />
          <label className="htmlForm-check-label" htmlFor="defaultCheck2">
            Female
          </label>
        </div>
        {/* </div> */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
