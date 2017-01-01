import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from 'antd';
import './index.css';

class Bootstrap extends React.Component<any, any> {
	render() {
		return (
			<div>
				<h1>I'm From Typescript React Hello Test</h1>
				<Button>Hello</Button>
			</div>
		);
	}
}

ReactDOM.render(<Bootstrap />, document.getElementById('root'));
