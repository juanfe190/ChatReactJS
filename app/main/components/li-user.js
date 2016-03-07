import {React} from '../../../suppliers/vendor-supplier.js';
import {MainActions} from '../../../suppliers/action-supplier.js';
import {MainStore} from '../../../suppliers/store-supplier.js';

var LiUser = React.createClass({
	/*
	* Revisa si existe algun mensaje nuevo o imprime vacio
	* en caso de no existir ninguno
	*/
	printMsgCount: function(){
		if(this.props.newMessages > 0) return this.props.newMessages;
		return '';
	},
	
	render: function(){
		return(
			<li className="list-group-item">
			    <span className="badge">{this.printMsgCount()}</span>
			    {this.props.username}
			  </li>
		)
	}
});

module.exports = LiUser;