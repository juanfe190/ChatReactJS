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
	printMessages: function(){
		if(typeof this.props.messages !== 'undefined'){
			return this.props.messages.map((objMessage, index)=>{
				return(
					<div key={index} 
						className={objMessage.mine? 'col-xs-10 col-xs-offset-2 msg mine'
												  : 'col-xs-10 msg'}>
					{objMessage.message}
					</div>
					)
			});
		}

		return <div />
	},
	render: function(){
		return(
			<div className="chatArea row">
				<div className="msgArea col-sm-12">
					<div className="col-sm-11 centered">
						<div className="row">{this.printMessages()}</div>
					</div>
				</div>

				<div className="col-sm-12">
					<input type="text" 
						 className="form-control"
						 name="txtSending"
						 value={this.state.txtSending}
						 onChange={this.onChangeHandler} 
						 onClick={this.inputOnClickHandler} />
					<button className="btn btn-default" 
						onClick={this.btnSendOnClick}>Enviar</button>
				</div>
			</div>
		)
	}
});

module.exports = ChatBody;