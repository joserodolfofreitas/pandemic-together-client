
import * as Constants from './../../common/constants';
function runApplyResourceOnVirus(resourceCard, virusCard) {
    return (dispatch, getState) => {
        const room =  getState().room;
        const message = {
            type: Constants.GM_PLAY_CARD,
            player: room.sessionId,
            cardPlayed: resourceCard,
            onPlayer: virusCard.cardHolder,
            onCardIds: [virusCard.cardId]
        };

        room.send(message); 
    }
}
export default runApplyResourceOnVirus;