import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";

export const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsuscribe();
  }, [messagesRef, room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  const UserName = () => {
    const user = String(auth.currentUser.displayName);
    const splitted = user.split(" ");
    const name = splitted[0].charAt(0);
    const surnName = splitted[1].charAt(0);
    const fullName = name + surnName;

    return fullName;
  };

  const trimmedFullName = UserName();

  return (
    <>
      <div className=" max-w-2xl h-screen w-screen mx-auto ">
        <div className="grid grid-cols-2 h-screen gap-2">
          <div class=" col-span-2 overflow-auto">
            <div className="chat-app">
              <div className="header flex flex-col items-center my-4">
                <p className=" text-xl font-bold">{room.toUpperCase()}</p>
              </div>
              <div className="messages">
                {messages.map((message) => (
                  <div className="chat chat-start message" key={message.user}>
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-11">
                        <span className="text-md">{trimmedFullName}</span>
                      </div>
                    </div>
                    <div className="chat-bubble user text-slate-100">
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-2 content-end min-h-full">
              <form
                onSubmit={handleSubmit}
                className=" rounded-xl col-span-2 new-message-form flex flex-row items-center justify-center"
              >
                <input
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Type your message here..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  type="text"
                />
                <button
                  className="send-button mx-2 my-3 btn btn-outline btn-accent"
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
