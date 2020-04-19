import * as Constants from '../../common/constants';

var getMostDangerousCard = function (players) {
    var mostDangerousCard = null;
    for (let id in players) {
        const player = players[id];
        console.log("player.name", player.name);

        for (var i = 0; i < player.virusField.length; i++) {
            const virus = player.virusField[i];
            console.log("virus tokens", virus.tokens);
            if (mostDangerousCard == null) {
                mostDangerousCard = virus;
                continue;
            }
            if (virus.tokens > mostDangerousCard.tokens) {
                if (!virus.contained || virus.tokens >= 3) {
                    mostDangerousCard = virus;
                }
            }
        }
    }
    return mostDangerousCard;
};

export function generateBotPlayDecision(players, botSessionId) {
    console.log(" bot will play and iterate over players ");

    var playMessage;
    var me = players[botSessionId];
    if (me.hand.length > 0) {
        var mostDangerousCard = getMostDangerousCard(players, mostDangerousCard);
        var bestCardToPlay = null;

        for (var i = 0; i < me.hand.length; i++) {
            const resourceCard = me.hand[i];

            if (bestCardToPlay == null) {
                bestCardToPlay = resourceCard;
                continue;
            }

            if (resourceCard.maxTokensImpact == mostDangerousCard.tokens) {
                bestCardToPlay = resourceCard;
                break;
            }

            if (Math.abs(mostDangerousCard.tokens - resourceCard.maxTokensImpact) < Math.abs(mostDangerousCard.tokens - bestCardToPlay.maxTokensImpact)) {
                bestCardToPlay = resourceCard;
                continue;
            }
        }
        //TODO pick mostDangerousCard neighbours if resource is R2
        var onCardIds = [mostDangerousCard.cardId];

        if (bestCardToPlay.maxCardsImpact > 1) {
            var player = players[mostDangerousCard.cardHolder];
            
            for (var i = 1; i < player.virusField.length && i <= bestCardToPlay.maxCardsImpact; i++) {
                var virus = player.virusField[i];
                if (!onCardIds.includes(virus.cardId)) {
                    onCardIds.push(virus.cardId);
                }
            }
        }
        const message = {
            type: Constants.GM_PLAY_CARD,
            player: botSessionId,
            cardPlayed: bestCardToPlay,
            onPlayer: mostDangerousCard.cardHolder,
            onCardIds: onCardIds
        };

        playMessage = message;
    } else {
        playMessage = { type: Constants.GM_ADVANCE_TURN, player: botSessionId };
    }
    console.log(botSessionId, "plays", playMessage);

    return playMessage
}