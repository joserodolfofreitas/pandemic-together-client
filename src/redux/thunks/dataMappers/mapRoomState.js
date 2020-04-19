import * as Constants from '../../../common/constants';

export function mapRoomStateToGameFlow(roomState) {
    return {
        gameState: roomState ? roomState.gameState : null,
        roundCount: roomState ? roomState.round : 0,
        roundState: roomState ? roomState.roundState : null,
        currentTurnPlayerSessionId: roomState && roomState.roundState !== Constants.ROUND_STATE_VIRUS_PHASE ? (roomState.currentTurn) : null,
    }
}

function mapCards(cards){
    return cards.map(c => {
        return Object.assign({}, c);
    }).filter(c => c && c.cardId);
}

function mapPlayers(players){
    return Object.keys(players).reduce((result, key) => {
        const player = players[key];
        
        return {
            ...result,
            [key]: {
                sessionId: player.sessionId,
                name: player.name,
                hand: mapCards(player.hand),
                viruses: mapCards(player.virusField),
                character: mapCards([player.advantages[0], player.disadvantages[0]]),
            }
        }
    },{});
}

export function mapRoomStateToCards(roomState){
    return {
        deck: roomState ? mapCards(roomState.deck) : [],
        players: roomState ? mapPlayers(roomState.players) : {}
    }
}

export function mapRoomStateToVirusPhaseMessages(roomState){
    return ((roomState && roomState.newRoundMessages) || []).map(m => {
        return {type: m.type, action: m.action, source: m.cardSrc, targets: m.cardTargets};
    });
}