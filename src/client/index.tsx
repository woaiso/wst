import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from 'antd';
import './index.css';
import LoginPage from './pages/login';
class Bootstrap extends React.Component<any, any> {
	render() {
		return (
			<div>
				<LoginPage />
			</div>
		);
	}
}

ReactDOM.render(<Bootstrap />, document.getElementById('root'));
