import {React, ReactDOM, Router, Route, hashHistory} from '../suppliers/vendor-supplier.js';
import {Main} from '../suppliers/ui-supplier.js';

var Routing = React.createClass({
	render: function(){
		return(
			<Router history={hashHistory}>
				<Route path='/' component={Main}>
					
				</Route>
			</Router>
		)
	}
});


ReactDOM.render(
	<Routing />, app
);
