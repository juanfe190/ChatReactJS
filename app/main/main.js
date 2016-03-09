import {React, ReactDOM} from '../../suppliers/vendor-supplier.js';
import {Header, ChatBody, UserList, InsertName} from './component-supplier.js';
import {MainStore} from '../../suppliers/store-supplier.js';

var Main = React.createClass({
	getInitialState: function(){
		return MainStore.getState();
	},
	componentDidMount: function(){
		MainStore.addChangeListener(this.update);
	},
	componentWillUnmount: function(){
		MainStore.removeChangeListener(this.update);
	},
	update: function(){
		this.setState(MainStore.getState());
	},
	render: function(){
		let msg = typeof this.state.activeUser.messages === 'undefined'? '' 
		: this.state.activeUser.messages;
		return(
			<div>
				<InsertName />
				<div className="container">
					<div className="col-sm-6 col-sm-offset-3">
						<Header activeUser={this.state.activeUser} myUsername={this.state.myUsername}/>
						<ChatBody messages={msg} username={this.state.activeUser.username}/>
						<UserList allUsers={this.state.allUsers} activeUser={this.state.activeUser} myUsername={this.state.myUsername}/>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Main;