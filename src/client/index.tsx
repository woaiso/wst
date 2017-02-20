import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from 'antd';
import './index.css';
// import LoginPage from './pages/login';
import DashBoard from './dashboard';
class Bootstrap extends React.Component<any, any> {
	render() {
		return (
			<div>
				<DashBoard />
			</div>
		);
	}
}

ReactDOM.render(<Bootstrap />, document.getElementById('root'));
