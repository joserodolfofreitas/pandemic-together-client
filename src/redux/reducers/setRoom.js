function setRoom(state, room) {
    return {
        ...state,
        room,
        myPlayerSessionId: room.sessionId
    };
}

export default setRoom;