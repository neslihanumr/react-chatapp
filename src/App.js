import { signOut } from "firebase/auth";
import { useRef, useState } from "react";
import Cookies from "universal-cookie";
import "./App.css";
import { Auth } from "./components/Auth";
import { Chat } from "./components/ChatSection";
import { auth } from "./firebase-config";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="w-[100vh] h-[100vh] mx-auto flex items-center justify-center">
          <div>
            <div className="room flex flex-row items-end gap-3">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Enter Room Name</span>
                </div>
                <input
                  ref={roomInputRef}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <button
                onClick={() => setRoom(roomInputRef.current.value)}
                className="btn btn-outline btn-info"
              >
                Enter Chat
              </button>
            </div>
            <div className="sign-out my-3 grid place-items-center">
              <button
                onClick={signUserOut}
                className="btn btn-outline btn-error"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
