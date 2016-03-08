import {React} from '../../../suppliers/vendor-supplier.js';
import {MainActions} from '../../../suppliers/action-supplier.js';

var InsertName = React.createClass({
	getInitialState: function(){
		return {
			visible: true,
			txtUsername: ''
		}
	},
	changeHandler: function(event){
		this.setState({txtUsername: event.target.value});
	},
	closeAction: function(event){
		MainActions.connectToServer(this.state.txtUsername);
		this.setState({visible: false});
	},
	render: function(){
		return(
			this.state.visible 
			?<div className="full-screen">
				<div className="nameForm">
					<label>Nombre:</label>
					<input value={this.state.txtUsername}
					   type="text" 
					   className="form-control"
					   onChange={this.changeHandler} />
					<button className="btn btn-success" onClick={this.closeAction}>Aceptar</button>
			 	</div>
			 </div>
			: null
		)
	}
});

module.exports = InsertName;