import {React} from '../../../suppliers/vendor-supplier.js';
import {MainActions} from '../../../suppliers/action-supplier.js';
import {MainStore} from '../../../suppliers/store-supplier.js';

var LiUser = React.createClass({
	handleOnClick: function(){
		MainActions.changeActiveUser(this.props.username);
	},
	/*
	* Revisa si existe algun mensaje nuevo o imprime vacio
	* en caso de no existir ninguno
	*/
	printMsgCount: function(){
		if(this.props.newMessages > 0) return this.props.newMessages;
		return '';
	},
	
	render: function(){
		let liClass = this.props.active ? "list-group-item active" : "list-group-item";
		return(
			<li onClick={this.handleOnClick} className={liClass}>
			    <span className="badge">{this.printMsgCount()}</span>
			    {this.props.username}
			  </li>
		)
	}
});

module.exports = LiUser;