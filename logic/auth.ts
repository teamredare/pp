import { COOKIE } from "./cookie.js";


let session = COOKIE.get('session')
if(!session) {
    session = 'guest'+Math.random();
    COOKIE.set('session',session)
}