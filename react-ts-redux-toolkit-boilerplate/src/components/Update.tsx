import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { updateUser } from "../redux/slices/userData";

const Update = () => {
  const { id } = useParams();

  const { users } = useAppSelector((state) => state.app);
  const [updateData, setUpdateData] = useState<any>({});
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const singleUser = users.filter((ele) => ele.id === id);
      setUpdateData(singleUser[0]);
    }
  }, []);

  const newData = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateUser(updateData));
    navigate("/read");
  };

  return (
    <div>
      <h2 className="mx-auto">Edit the data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            name="name"
            value={updateData?.name || ""}
            onChange={newData}
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
            value={updateData?.email || ""}
            onChange={newData}
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
            value={updateData?.age || ""}
            onChange={newData}
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
            checked={updateData?.gender === "Male"}
            onChange={newData}
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
            checked={updateData?.gender === "Female"}
            onChange={newData}
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

export default Update;
