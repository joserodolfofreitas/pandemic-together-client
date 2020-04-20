function setVirusPhaseMessage(state, message) {
    console.log(message);
    return {
        ...state,
        virusPhaseMessage: message
    };
}

export default setVirusPhaseMessage;