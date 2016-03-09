import {React} from '../../../suppliers/vendor-supplier.js';
import {MainActions} from '../../../suppliers/action-supplier.js';
import {MainStore} from '../../../suppliers/store-supplier.js';

var ChatBody = React.createClass({
	getInitialState: function(){
		return({
			txtSending: '',
			txtArea: ''
		})
	},

	componentDidMount: function(){
		//
	},
	btnSendOnClick: function(event){
		event.preventDefault();
		MainActions.sendToServer(this.state.txtSending);
		this.setState({txtSending: ''});
	},
	onChangeHandler: function(event){
		this.setState({ [event.target.name] : event.target.value});
	},

	inputOnClickHandler: function(event){
		MainActions.resetNewMessagesCount(this.props.username);
	},
	render: function(){
		return(
			<form>
				<div className="form-group">
					<textarea className="form-control msgarea" 
						value={this.props.messages} 
						name="txtArea" />
				</div>
				<div className="form-group">
					<input type="text" 
						 className="form-control"
						 name="txtSending"
						 value={this.state.txtSending}
						 onChange={this.onChangeHandler} 
						 onClick={this.inputOnClickHandler} />
					<button className="btn btn-default" 
						onClick={this.btnSendOnClick}>Enviar</button>
				</div>
			</form>
		)
	}
});

module.exports = ChatBody;