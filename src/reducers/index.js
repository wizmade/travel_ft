import * as types from '../actions';
import { combineReducers } from 'redux';
import io from 'socket.io-client';
const socket = io.connect('http://chats.cafe24app.com');
//store
const init_auth_State = {
    auth:0,
}
const init_socket_State = {
    socket:socket,
}
const init_scText_State = {
    scText:"@@@",
}
const init_scTextMate_State = {
    scTextMate:"@@@",
}
const init_scTextEvent_State = {
    scTextEvent:"@@@",
}

//리듀서
const auth_con = (state = init_auth_State, action) => {
    switch(action.type) {
      case types.LOGIN:
          return Object.assign({}, state,{
              auth:0
          });
      case types.LOGOUT:
          return Object.assign({}, state,{
              auth:0
          });
      case types.UPDATE_HEAD:
          return Object.assign({}, state,{
              auth:state.auth +1
          });
      default:

      return state;
    }
}

const scText_val = (state = init_scText_State, action) => {
    switch(action.type) {
      case types.SET_TEXT:
          return Object.assign({}, state,{
              scText:action.value
          });
    
      default:
      return state;
    }
}
const scTextMate_val = (state = init_scTextMate_State, action) => {
    switch(action.type) {
      case types.SET_TEXT_MATE:
          return Object.assign({}, state,{
              scTextMate:action.value
          });
    
      default:
      return state;
    }
}
const scTextEvent_val = (state = init_scTextEvent_State, action) => {
    switch(action.type) {
      case types.SET_TEXT_EVENT:
          return Object.assign({}, state,{
              scTextEvent:action.value
          });
    
      default:
      return state;
    }
}

//리듀서
const socketio = (state = init_socket_State, action) => {
    switch(action.type) {
      case types.SOCKET_ON:
          return Object.assign({}, state,{
              socket:state.socket
          });

      default:
      return state;
    }
}





const counterApp = combineReducers({
    auth_con,
    socketio,
    scText_val,
    scTextMate_val,
    scTextEvent_val
});

export default counterApp;
