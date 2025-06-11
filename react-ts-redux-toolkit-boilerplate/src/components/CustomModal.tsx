import { useAppSelector } from "../redux/hooks";
import "./CustomModal.css";

const CustomModal = ({ id, showPopup, setShowPopup }) => {
  const { users } = useAppSelector((state) => state.app);

  const singleUser = users.filter((ele) => ele.id === id);
  // console.log("🚀 ~ CustomModal ~ singleUser:", singleUser);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setShowPopup(false)}>Close</button>
        <h2>{singleUser[0].name}</h2>
        <h3>{singleUser[0].email}</h3>
        <h4>{singleUser[0].age}</h4>
        <h2>{singleUser[0].gender}</h2>
      </div>
    </div>
  );
};

export default CustomModal;
