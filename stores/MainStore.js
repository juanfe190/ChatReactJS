import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {EventEmitter} from 'events';
import {MainStoreUtils} from '../suppliers/util-supplier.js'
import io from 'socket.io-client';

var socket = io('localhost:3000');

var data={
	myUsername: '',
	activeUser: {}, // {username: 'foo', newMessages: 0, active=false, messages=[{message='foo', mine}]}
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

/**************************************
************ DISPATCHER ***************
***************************************/
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
			MainStore.emitChange();
			break;
		case 'resetNewMessagesCount':
			resetNewMessagesCount(action.username);
			MainStore.emitChange();
			break;
	}
});



/**
* Esta funcion envia un mensaje para que el server
* lo maneje
* @param String mensaje
*/
function sendMessage(msg){
	let userTo = data.activeUser.username;
	let message = msg;
	let userFrom = data.myUsername;
	socket.emit('msgToServer', {
		userTo: userTo,
		message: message,
		userFrom: userFrom 
	});

	if(typeof data.activeUser.messages !== 'undefined') data.activeUser.messages.push({message: msg, mine: true});
	else data.activeUser.messages = [{message: msg, mine: true}];
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
	var activeUser = MainStoreUtils.getActiveUser(data.allUsers);
	if(typeof activeUser !== 'undefined') activeUser.active = false;
	data.allUsers.forEach((objUser, index)=>{
		if(objUser.username === username) {
			objUser.active = true;
			data.activeUser = objUser;
		}
	});

}

/**
* Reinicia el contador de mensajes nuevos
*
* @param String username
*/
function resetNewMessagesCount(username){
	let user = MainStoreUtils.findUser(username, data.allUsers);
	user.newMessages=0;
}


/***********************************
********SOCKET.IO LISTENERES********
************************************/
socket.on('allUsers', (userlist)=> {
	if(userlist.length > 0) getUsersFromServer(userlist);
	MainStore.emitChange();
});

/**
* Cuando se recibe un mensaje nuevo, se le suma uno en la burbuja
*/
socket.on('msgToClient', (msgInfo)=>{
	let user = MainStoreUtils.findUser(msgInfo.userFrom, data.allUsers);
	if(typeof user.messages !== 'undefined') user.messages.push({message: msgInfo.message, mine: false});
	else user.messages = [{message: msgInfo.message, mine: false}];
	user.newMessages++;
	MainStore.emitChange();
});



module.exports = MainStore;