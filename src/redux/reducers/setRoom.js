function setRoom(state, room, isLoading) {
    return {
        ...state,
        room,
        myPlayerSessionId: room.sessionId,
        isLoading
    };
}

export default setRoom;