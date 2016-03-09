import AppDispatcher from '../dispatcher/AppDispatcher.js';
import MainStore from '../stores/MainStore.js';

var MainActions = {
	/**
	* Envia mensaje al servidor
	* @param String mensaje
	*/
	sendToServer: function(msg){
		AppDispatcher.dispatch({
			actionType: 'sendToServer',
			message: msg
		});
	},

	/**
	* Conecta con el servidor
	* @param String user
	*/
	connectToServer: function(user){
		AppDispatcher.dispatch({
			actionType: 'connect',
			username: user
		});
	},

	/**
	* Cambia el usuario al que se le mandan acualmente mensajes
	*
	* @param String username
	*/
	changeActiveUser: function(username){
		AppDispatcher.dispatch({
			actionType: 'changeActiveUser',
			username: username
		});
	},

	resetNewMessagesCount: function(username){
		AppDispatcher.dispatch({
			actionType: 'resetNewMessagesCount',
			username: username
		});
	}
}

module.exports = MainActions;