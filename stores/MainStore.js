import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {EventEmitter} from 'events';
import io from 'socket.io-client';

var socket = io('localhost:3000');

var data={
	activeUser: 'none',
	allUsers: {}
};

const ChangeEvent = 'change';
var MainStore = Object.assign({}, EventEmitter.prototype,{
	addChangeListener: function(callback){
		this.on(ChangeEvent, callback);
	},
	removeChangeListener: function(callback){
		this.removeListener(callback);
	},
	emitChange: function(){
		this.emit(ChangeEvent);
	},

	getState: function(){
		return data;
	},
});
/**
* Esta funcion envia un mensaje para que el server
* lo maneje
* @param String mensaje
*/
function sendMessage(msg){
	let sendTo = this.data.activeUser;
	let message = msg;
	socket.emit('msgToServer', {
		user: sendTo,
		message: message
	});
}

/**
* Agrega un mensaje nuevo o crea el usuario
* en la lista
*/
function newUser(user){
	if(typeof data.allUsers[user] === "undefined"){
		data.allUsers[user]={newMessages: 0};
		MainStore.emitChange();
	}
}

//Registra dispatcher y escucha instrucciones
AppDispatcher.register(function(action){
	switch(action.actionType){
		case 'changeActiveUser':
			data.activeUser = action.username;
			MainStore.emitChange();
			break;
		case 'connect':
			socket.emit('newUser', action.username);
			break;
		case 'sendToServer':
			sendMessage(action.message);
			break;
	}
});

//Listeners socket
socket.on('allUsers', (username)=> {
	if(username.length > 0)newUser(username);
});
module.exports = MainStore;