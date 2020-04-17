function setVirusPhaseMessage(state, message) {
    if(message){
        console.log(message.type, message.action, message.cardSrc, message.cardTargets);
    }
    return {
        ...state,
        virusPhaseMessage: message
    };
}

export default setVirusPhaseMessage;