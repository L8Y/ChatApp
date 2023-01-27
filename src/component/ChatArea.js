import { app, db } from "../Fire";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    onSnapshot,
    serverTimestamp,
    setDoc,
    query,
    orderBy,
} from "firebase/firestore";
import { useState, useEffect, useRef } from "react";


window.HTMLElement.prototype.scrollIntoView = function () { };

const ChatArea = (props) => {
    const currentRoomName = props.currentChatRoom;

    const [currentInputMessages, setCurrentInputMessages] = useState("");
    const roomsMessageRef = collection(db, `rooms/${currentRoomName}/messages`);
    const roomNameRef = doc(db, `rooms/${currentRoomName}`);
    const [chatRoomMessages, setChatRoomMessages] = useState([]);

    const addMessages = (event) => {
        if (currentInputMessages) {
            addDoc(roomsMessageRef, {
                messages: currentInputMessages,
                createdAt: serverTimestamp(),
                from: props.userEmail,
            })
                .then(() => {
                    setCurrentInputMessages("");
                    addField();
                })
                .catch((error) => {
                    alert(error);
                });
        } else {
            alert("Type a message");
        }
    };

    const getChatRoomMessages = async () => {
        const ascQuery = query(
            collection(db, `rooms/${currentRoomName}/messages`),
            orderBy("createdAt", "asc")
        );
        onSnapshot(ascQuery, (doc) => {
            setChatRoomMessages(
                doc.docs.map((item) => {
                    return { ...item.data(), id: item.id };
                })
            );
        });
    };
    useEffect(() => {
        getChatRoomMessages();
    }, [currentRoomName]);

    const addField = () => {
        setDoc(roomNameRef, {
            createdBy: props.userEmail,
            createdAt: serverTimestamp(),
        })
            .then(() => { })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <div>
            <header className="chatRoom-header">
                <img
                    className="Profile-dp"
                    src="https://www.svgrepo.com/show/228711/network-group.svg"
                />
                <h1 className="chatRoom-title">{props.currentChatRoom}</h1>
            </header>
            <section className="chat-layout">
                {chatRoomMessages.map((item) => {
                    return (
                        <div>
                            <div
                                className={
                                    item.from === props.userEmail
                                        ? "sending-messages"
                                        : "receiving-messages"
                                }
                            >
                                <div
                                    className={
                                        item.from === props.userEmail
                                            ? "chatRoom-messages-loggedInUser"
                                            : "chatRoom-messages"
                                    }
                                >
                                    {item.from != props.userEmail ? (
                                        <p style={{ color: "#AF4425" }}>{item.from}</p>
                                    ) : (
                                        ""
                                    )}
                                    <p>{item.messages}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
            <footer className="chatRoom-footer">
                <input
                    className="input-message"
                    placeholder="Type a message"
                    type="text"
                    value={currentInputMessages}
                    onChange={(event) => setCurrentInputMessages(event.target.value)}
                    onKeyPress={(event) => event.key === "Enter" && addMessages()}
                />
                <button className="send-icon" onClick={(event) => addMessages(event)}>
                    <img className="send-img" src="https://www.svgrepo.com/show/263652/message-send.svg" />
                </button>
            </footer>
        </div>
    );
};

export default ChatArea;