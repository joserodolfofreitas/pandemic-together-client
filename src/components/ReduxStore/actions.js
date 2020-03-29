/*
 * redux action types
 */
export const SET_ROOM = 'SET_ROOM'
export const SHUFFLE_DECK = 'SHUFFLE_DECK'
export const DRAW_CARD = 'DRAW_CARD'
export const UPDATE_PLAYER = 'UPDATE_PLAYER'
export const SET_ROOM_STATE = "SET_ROOM_STATE"

/*
 * redux action creators
 */
export function setRoom(room) {
    return { type: SET_ROOM, room }
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
