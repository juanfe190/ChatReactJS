import AppDispatcher from '../dispatcher/AppDispatcher.js';
import MainStore from '../stores/MainStore.js';

var MainActions = {
	sayHi: function(){
		AppDispatcher.dispatch({
			actionType: 'sayHi'
		});
	},
	connectToServer: function(){
		AppDispatcher.dispatch({
			actionType: 'connect'
		});
	}
}

module.exports = MainActions;