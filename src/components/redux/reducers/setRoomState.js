function setRoomState(state, newRoomState) {
    return {
        ...state,
        roomState: newRoomState,
        updatesOnRoomState: state.updatesOnRoomState + 1, // cheap workaround to guaranteee re-render after updating roomState.
    };
}


export default setRoomState;