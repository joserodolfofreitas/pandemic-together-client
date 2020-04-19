function pushChatMessage(state, chatMessage) {
    return {
        ...state,
        chatMessages: [...state.chatMessages, chatMessage],
    };
}

export default pushChatMessage;