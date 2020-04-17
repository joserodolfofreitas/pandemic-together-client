
import * as Constants from '../../common/constants';

export function generateBotPlayDecision(players, botSessionId) {
    console.log(" bot will play and iterate over players ");

    var mostDangerousCard;
    var playMessage;
    var me = players[botSessionId];
    if (me.hand.length > 0) {
        for (let id in players) {
            const player = players[id];
            console.log("player.name", player.name);

            for (var i = 0; i < player.virusField.length; i++) {
                
            }
        }

        playMessage = { type: Constants.GM_ADVANCE_TURN, player: botSessionId };
    } else {
        playMessage = { type: Constants.GM_ADVANCE_TURN, player: botSessionId };
    }


    return playMessage
}