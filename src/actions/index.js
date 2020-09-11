export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_HEAD = 'UPDATE_HEAD';
export const SOCKET_ON = 'SOCKET_ON';
export const SET_TEXT = 'SET_TEXT';
export const SET_TEXT_MATE = 'SET_TEXT_MATE';
export const SET_TEXT_EVENT = 'SET_TEXT_EVENT';


// 액션
export function update_head(){
    return {
        type:UPDATE_HEAD,
    };
}

export function logout(){
    localStorage.setItem("auth",'');
    return {
        type: LOGOUT,
    };
}

export function soketOn(){
    return {
        type: SOCKET_ON,
    };
}

export function set_text(val){
    return {
        value:val,
        type: SET_TEXT,
    };
}

export function set_textMate(val){
    return {
        value:val,
        type: SET_TEXT_MATE,
    };
}

export function set_textEvent(val){
    return {
        value:val,
        type: SET_TEXT_EVENT,
    };
}

