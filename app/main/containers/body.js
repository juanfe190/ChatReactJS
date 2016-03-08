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
	btnSendOnClick: function(){
		MainActions.sendToServer(this.state.txtSending);
	},
	onChangeHandler: function(event){
		this.setState({ [event.target.name] : event.target.value});
	},
	render: function(){
		return(
			<form>
				<div className="form-group">
					<textarea className="form-control msgarea" 
						value={this.state.txtArea} 
						name="txtArea" />
				</div>
				<div className="form-group">
					<input type="text" 
						 className="form-control"
						 name="txtSending"
						 value={this.state.txtSending}
						 onChange={this.onChangeHandler} />
					<button className="btn btn-default" 
						onClick={this.btnSendOnClick}>Enviar</button>
				</div>
			</form>
		)
	}
});

module.exports = ChatBody;