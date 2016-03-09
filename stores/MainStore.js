import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {EventEmitter} from 'events';
import {MainStoreUtils} from '../suppliers/util-supplier.js'
import io from 'socket.io-client';

var socket = io('localhost:3000');

var data={
	myUsername: '',
	activeUser: {},
	allUsers: []
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
	}
});



/**
* Esta funcion envia un mensaje para que el server
* lo maneje
* @param String mensaje
*/
function sendMessage(msg){
	let userTo = getActiveUser().username;
	let message = msg;
	let userFrom = data.myUsername;
	socket.emit('msgToServer', {
		userTo: userTo,
		message: message,
		userFrom: userFrom 
	});
}

/**
* Agrega los usuarios enviados desde el servidor
*/
function getUsersFromServer(userlist){
	userlist.forEach(function(username, index){
		let exists = false;
		data.allUsers.forEach(function (objUsers, index){
			if(username === objUsers.username) exists = true;
		});

		if(!exists) data.allUsers.push({username: username, newMessages: 0, active: false});
	});

	data.allUsers = MainStoreUtils.deleteIFdisconnected(userlist, data.allUsers);
}

/**
* Cambia el usuario al que actualmente se le envian mensajes
*
* @param String username
*/
function changeActiveUser(username){
	var activeUser = getActiveUser();
	if(typeof activeUser !== 'undefined') activeUser.active = false;
	data.allUsers.forEach((objUser, index)=>{
		if(objUser.username === username) {
			objUser.active = true;
			data.activeUser = objUser;
		}
	});

}
/**
* Devuelve el usuario al que se le estan enviando mensajes
*
* @return Object user
*/
function getActiveUser(){
	return data.allUsers.filter((objUser)=>{
		return objUser.active
	})[0];
}

function resetNewMessagesCount(username){
	let user = MainStoreUtils.findUser(username, data.allUsers);
	user.newMessages=0;
}

//Registra dispatcher y escucha instrucciones
AppDispatcher.register(function(action){
	switch(action.actionType){
		case 'changeActiveUser':
			changeActiveUser(action.username);
			MainStore.emitChange();
			break;
		case 'connect':
			socket.emit('newUser', action.username);
			data.myUsername = action.username;
			break;
		case 'sendToServer':
			sendMessage(action.message);
			break;
		case 'resetNewMessagesCount':
			resetNewMessagesCount(action.username);
			MainStore.emitChange();
			break;
	}
});

//Listeners socket
socket.on('allUsers', (userlist)=> {
	if(userlist.length > 0) getUsersFromServer(userlist);
	MainStore.emitChange();
});

/**
* Cuando se recibe un mensaje nuevo, se le suma uno en la burbuja
*/
socket.on('msgToClient', (msgInfo)=>{
	let user = MainStoreUtils.findUser(msgInfo.userFrom, data.allUsers);
	if(typeof user.messages !== 'undefined') user.messages = user.messages + '\n' + msgInfo.message;
	else user.messages = msgInfo.message;
	user.newMessages++;
	MainStore.emitChange();
});
module.exports = MainStore;