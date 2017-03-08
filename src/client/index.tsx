import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from 'antd';
import './index.css';
// import LoginPage from './pages/login';
import DashBoard from './dashboard';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Bootstrap extends React.Component<any, any> {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={Home} />
					<Route path="/dashboard" component={DashBoard} />
				</div>
			</Router>
		);
	}
}

const Home = () => (
	<div>
		<h2>Home</h2>
		<Link to="/dashboard"><Button>DashBoard</Button></Link>
	</div>
)

ReactDOM.render(<Bootstrap />, document.getElementById('root'));
