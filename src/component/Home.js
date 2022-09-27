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
    orderBy,
    query,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import ChatArea from "./ChatArea";
import { useDispatch, useSelector } from "react-redux";
import "../index.css"


const Home = (props) => {
    const [chatRoomNames, setChatRoomNames] = useState([]);
    const [currentChatRoom, setCurrentChatRoom] = useState("roomA");
    const [newRoomName, setNewRoomName] = useState("");
    const selector = useSelector(state => state.isLogged);


    const getChatNames = async () => {
        const asyQuery = query(collection(db, "rooms"), orderBy("createdAt", "desc"))
        onSnapshot(asyQuery, (doc) => {
            setChatRoomNames(
                doc.docs.map((item) => {
                    return { ...item.data(), id: item.id };
                })
            );
        });
    };

    const addChatRooms = () => {
        if (newRoomName) {
            const roomNameRef = doc(db, `rooms/${newRoomName}`);
            setDoc(roomNameRef, {
                createdBy: selector,
                createdAt: serverTimestamp(),
            })
                .then(() => {
                    setNewRoomName("");
                })
                .catch((error) => {
                    alert(error);
                });
        } else {
            alert("Enter valid group name");
        }
    };

    useEffect(() => {
        getChatNames();
    }, []);

    return (
        <div>
            <div className="page-header">
                <input
                    className="groupName-input"
                    type="text"
                    value={newRoomName}
                    placeholder="Create new group"
                    onChange={(event) => setNewRoomName(event.target.value)}
                    onKeyPress={(event) => event.key === "Enter" && addChatRooms()}
                />
                <button className="add-icon" onClick={addChatRooms}>
                    <img src="https://www.svgrepo.com/show/103977/add.svg" />
                </button>

                <input
                    type="button"
                    className="logout-button"
                    onClick={props.logout}
                    value="Logout"
                />
            </div>
            <div className="homePage-layout">
                <div className="test">
                    {chatRoomNames.map((items) => {
                        return (
                            <div
                                className="sidenavbar-body"
                                onClick={() => setCurrentChatRoom(items.id)}
                            >
                                <img
                                    className="Profile-dp"
                                    src="https://www.svgrepo.com/show/228711/network-group.svg"
                                />
                                <h2 className="sidenavbar-roomName">{items.id}</h2>
                            </div>
                        );
                    })}
                </div>

                <div className="chatArea">
                    <ChatArea
                        userEmail={useSelector(state => state.isLogged)}
                        currentChatRoom={currentChatRoom}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;