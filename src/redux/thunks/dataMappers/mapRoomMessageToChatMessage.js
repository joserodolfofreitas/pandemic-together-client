import * as Constants from './../../../common/constants';

export function mapRoomMessageToChatMessage(message){
    if (message.type === Constants.GM_CHAT_MESSAGE) {
        return Object.assign({}, message);
    }
}