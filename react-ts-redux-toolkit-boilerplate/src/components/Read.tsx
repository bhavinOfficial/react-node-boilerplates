import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deleteUser, showUsers } from "../redux/slices/userData";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";

const Read = () => {
  const dispatch = useAppDispatch();

  const { users, loading, searchData } = useAppSelector((state) => state.app);
  console.log("🚀 ~ Read ~ users:", users);
  console.log("🚀 ~ Read ~ searchData:", searchData);
  const [id, setId] = useState("");
  console.log("🚀 ~ Read ~ id:", id);
  const [showPopup, setShowPopup] = useState(false);
  const [radioData, setRadioData] = useState("");
  console.log("🚀 ~ Read ~ radioData:", radioData);

  useEffect(() => {
    dispatch(showUsers());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {showPopup && (
        <CustomModal
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      <h2>All Data</h2>
      <input
        className="form-check-input"
        type="radio"
        value=""
        id="defaultCheck2"
        name="gender"
        checked={radioData === ""}
        onChange={(e) => setRadioData(e.target.value)}
      />
      <label className="htmlForm-check-label" htmlFor="defaultCheck2">
        All
      </label>
      <input
        className="form-check-input"
        type="radio"
        value="Male"
        id="defaultCheck1"
        name="gender"
        checked={radioData === "Male"}
        onChange={(e) => setRadioData(e.target.value)}
      />
      <label className="htmlForm-check-label" htmlFor="defaultCheck1">
        Male
      </label>
      <input
        className="form-check-input"
        type="radio"
        value="Female"
        id="defaultCheck3"
        name="gender"
        checked={radioData === "Female"}
        onChange={(e) => setRadioData(e.target.value)}
        // onChange={handleOnChange}
      />
      <label className="htmlForm-check-label" htmlFor="defaultCheck3">
        Female
      </label>
      <div>
        {users &&
          users
            .filter(
              (user) =>
                user.name.toLowerCase().includes(searchData.toLowerCase()) ||
                user.email.toLowerCase().includes(searchData.toLowerCase())
            )
            .filter((user) => {
              if (radioData === "Male") {
                return user.gender === radioData;
              } else if (radioData === "Female") {
                return user.gender === radioData;
              } else {
                return user;
              }
            })
            .map((user: any) => (
              <div key={user?.id} className="card w-50 mx-auto my-2">
                <div className="card-body">
                  <h5 className="card-title">Name: {user.name}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    Email: {user.email}
                  </h6>
                  <p className="card-text">Age: {user.age}</p>
                  <button
                    className="card-link"
                    onClick={() => [setId(user?.id), setShowPopup(true)]}
                  >
                    View
                  </button>
                  <Link className="card-link" to={`/edit/${user?.id}`}>
                    Edit
                  </Link>
                  <Link
                    onClick={() => dispatch(deleteUser(user?.id))}
                    className="card-link"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Read;
