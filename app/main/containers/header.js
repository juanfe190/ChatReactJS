import {React} from '../../../suppliers/vendor-supplier.js';
import {MainActions} from '../../../suppliers/action-supplier.js';
import {MainStore} from '../../../suppliers/store-supplier.js';

var Header = React.createClass({
	handleClick: function(e){
		
	},
	render: function(){
		return(
			<div>
				<h1>Bienvenido {this.props.myUsername}!</h1>
				<h2>Chat con: {this.props.activeUser.username}</h2>
			</div>
		)
	}
});

module.exports = Header;