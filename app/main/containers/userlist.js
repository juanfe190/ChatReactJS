import {React} from '../../../suppliers/vendor-supplier.js';
import {MainActions} from '../../../suppliers/action-supplier.js';
import {MainStore} from '../../../suppliers/store-supplier.js';
import LiUser from '../components/li-user.js';

var UserList = React.createClass({
	/**
	* Itera el array 'this.props.allUsers'
	* y crea los componentes LiUser
	*
	*/
	printUsers: function(){
		return this.props.allUsers.map((objUser, index)=>{
			let username = objUser.username;
			let newMessages = objUser.newMessages;
			if(username !== this.props.myUsername){
				return<LiUser 
					key={index}
					newMessages={newMessages}
					username={username}
					active={objUser.active} /> 
			}
		});
	},
	
	render: function(){
		return(
			<div>
				<p>Usuarios en linea:</p>
				<ul className="list-group">
				  {this.printUsers()}
				</ul>
			</div>
		)
	}
});

module.exports = UserList;