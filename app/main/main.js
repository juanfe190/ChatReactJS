import {React, ReactDOM} from '../../suppliers/vendor-supplier.js';
import {Header, ChatBody, UserList} from './component-supplier.js';
import {MainStore} from '../../suppliers/store-supplier.js';

var Main = React.createClass({
	getInitialState: function(){
		return MainStore.getState();
	},
	componentDidMount: function(){
		MainStore.addChangeListener(this.update);
	},
	update: function(){
		this.setState(MainStore.getState());
	},
	render: function(){
		return(
			<div className="container">
				<div className="col-sm-6 col-sm-offset-3">
					<Header activeUser={this.state.activeUser}/>
					<ChatBody />
					<UserList allUsers={this.state.allUsers}/>
				</div>
			</div>
		)
	}
});

module.exports = Main;