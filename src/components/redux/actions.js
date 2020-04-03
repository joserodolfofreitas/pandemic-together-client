 import * as Constants from './../common/constants';
/*
 * redux action types
 */
export const SET_ROOM = 'SET_ROOM'
export const SHUFFLE_DECK = 'SHUFFLE_DECK'
export const DRAW_CARD = 'DRAW_CARD'
export const UPDATE_PLAYER = 'UPDATE_PLAYER'
export const SET_ROOM_STATE = "SET_ROOM_STATE"
export const SELECT_CARD = "SELECT_CARD"
export const DESELECT_CARD = "DESELECT_CARD"
export const RESET_SELECTED_CARDS = "RESET_SELECTED_CARDS"

/*
 * redux action creators
 */
export function setRoom(room) {
    return { type: SET_ROOM, room }
}

export function selectCard(card) {
    return { type: SELECT_CARD, card }
}

export function deselectCard(card) {
    return { type: DESELECT_CARD, card }
}

export function resetSelectedCards() {
    return { type: RESET_SELECTED_CARDS }
}

export function setRoomState(roomState) {
    return { type: SET_ROOM_STATE, roomState }
}

export function drawCard(card) {
    return { type: DRAW_CARD, card }
}

export function shuffleDeck() {
    return { type: SHUFFLE_DECK }
}

export function updatePlayer(player) {
    return { type: UPDATE_PLAYER, player }
}

export function startGame(){
    return (dispatch, getState) => {
        const state = getState();
        state.room.send({type: Constants.GM_START_GAME});
    }
}
