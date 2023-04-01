import { useState } from "react";
import { Navigate } from "react-router-dom";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { auth } from "../utils/firebase";
function LogoutButton() {
  const [error, setError] = useState(null);
  const [ dispatch] = useStateValue();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.clear();

      dispatch({
        type: actionType.SET_USER_DISPLAY_NAME,
        displayName: null,
      });
      dispatch({
        type: actionType.SET_USER,
        user: null,
      });
      Navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      {error && <div>{error.message}</div>}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 md:px-4 rounded"
      >
        Logout
      </button>
    </>
  );
}

export default LogoutButton;
