import { useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";

const RoomsContainer = () => {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef(null);

  const handleCreateRoom = () => {
    // get room name
    const roomName = newRoomRef.current.value || "";

    if (!String(roomName).trimEnd()) return;

    // emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // set room name input back to empty string
    newRoomRef.current.value = "";
  };

  const handleJoinRoom = (key) => {
    if (key === roomId) return;

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  };
  return (
    <nav>
      <div>
        <input ref={newRoomRef} placeholder="Room Name" />
        <button onClick={handleCreateRoom}>Create Room</button>
      </div>
      {Object.keys(rooms).map((key) => {
        return (
          <div key={key}>
            <button
              disabled={key === roomId}
              title={`Join ${rooms[key].name}`}
              onClick={() => handleJoinRoom(key)}
            >
              {rooms[key].name}
            </button>
          </div>
        );
      })}
    </nav>
  );
};

export default RoomsContainer;
