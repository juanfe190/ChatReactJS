import {React} from '../../../suppliers/vendor-supplier.js';
import {MainActions} from '../../../suppliers/action-supplier.js';
import {MainStore} from '../../../suppliers/store-supplier.js';

var Header = React.createClass({
	handleClick: function(e){
		
	},
	render: function(){
		return(
			<div>
				<h1>Chat con: {this.props.activeUser}</h1>
			</div>
		)
	}
});

module.exports = Header;