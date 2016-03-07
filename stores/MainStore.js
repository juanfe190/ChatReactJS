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
			//funcion
			break;
		case 'connect':
			socket.emit('newUser', 'react');
			break;
	}
});

//Listeners socket
socket.on('allUsers', (username)=> {
	if(username.length > 0)newUser(username);
});
module.exports = MainStore;