import runLogin from './thunks/runLogin';
import runStartBot from './thunks/runStartBot';
import runStartGame from './thunks/runStartGame';
import runApplyResourceOnVirus from './thunks/runApplyResourceOnVirus';
import runRemoveMobileUrlBar from './thunks/runRemoveMobileUrlBar';
import runSkipTurn from './thunks/runSkipTurn';
import runPlayVirusPhase from './thunks/runPlayVirusPhase';
import runSetMyPlayerRoom from './thunks/runSetMyPlayerRoom';
/*
 * redux action types
 */
export const SET_ROOM = 'SET_ROOM';
export const ADD_BOT = 'ADD_BOT';

export const SET_IS_LOADING = 'SET_IS_LOADING';

export const SET_DRAGGING_CARD = 'SET_DRAGGING_CARD';
export const SET_DRAG_OVER_CARD = 'SET_DRAG_OVER_CARD';

export const SET_VIRUS_PHASE_MESSAGE = 'SET_VIRUS_PHASE_MESSAGE';

export const PUSH_CHAT_MESSAGE = 'PUSH_CHAT_MESSAGE';

export const PUSH_GAME_MESSAGE = 'PUSH_GAME_MESSAGE';
export const REMOVE_GAME_MESSAGE = 'REMOVE_GAME_MESSAGE';
export const RESET_GAME_MESSAGES = 'RESET_GAME_MESSAGES';

export const UPDATE_GAME_FLOW = 'UPDATE_GAME_FLOW'


/*
 * redux action creators
 */


export function pushGameMessage(gameMessage) {
    return { type: PUSH_GAME_MESSAGE, gameMessage }
}

export function pushChatMessage(chatMessage) {
    return { type: PUSH_CHAT_MESSAGE, chatMessage }
}

export function removeGameMessage(gameMessageToRemove) {
    return { type: REMOVE_GAME_MESSAGE, gameMessageToRemove }
}

export function resetGameMessages() {
    return { type: RESET_GAME_MESSAGES }
}

export function setRoom(room) {
    return { type: SET_ROOM, room }
}

export function addBot(botRoom) {
    return { type: ADD_BOT, botRoom }
}

export function isLoading(isLoading) {
    return { type: SET_IS_LOADING, isLoading }
}

export function setDraggingCard(card) {
    return { type: SET_DRAGGING_CARD, card }
}

export function setDragOverCard(card) {
    return { type: SET_DRAG_OVER_CARD, card }
}

export function setVirusPhaseMessage(message){
    return { type: SET_VIRUS_PHASE_MESSAGE, message }
}

export function updateGameFlow(gameFlow, cards){
    return { type: UPDATE_GAME_FLOW, gameFlow, cards }
}

export function startGame() {
    return runStartGame();
}

export function login(username) {
    return runLogin(username);
}

export function startBot(botName) {
    return runStartBot(botName);
}

export function applyResourceOnVirus(resourceCard, virusCard){
    return runApplyResourceOnVirus(resourceCard, virusCard)
}

export function removeMobileUrlBar(){
    return runRemoveMobileUrlBar()
}

export function skipTurn(){
    return runSkipTurn()
}

export function playVirusPhase(){
    return runPlayVirusPhase()
}

export function setMyPlayerRoom(room){
    return runSetMyPlayerRoom(room)
}

