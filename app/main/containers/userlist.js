import {React} from '../../../suppliers/vendor-supplier.js';
import {MainActions} from '../../../suppliers/action-supplier.js';
import {MainStore} from '../../../suppliers/store-supplier.js';
import LiUser from '../components/li-user.js';

var UserList = React.createClass({
	/**
	* Itera el objeto 'this.props.allUsers'
	* y crea los componentes LiUser
	*
	*/
	printUsers: function(){
		let components=[];
		for(var user in this.props.allUsers) {
			let username = user;
			let newMessages = this.props.allUsers[user].newMessages;
			components.push(<LiUser 
								key={user}
								newMessages={newMessages}
								username={username}
								active={this.props.activeUser === user} />); //REVISAR CLASE ACTIVE SI ES EL USUARIO
		}
		return components;
	},
	
	render: function(){
		return(
			<ul className="list-group">
			  {this.printUsers()}
			</ul>
		)
	}
});

module.exports = UserList;