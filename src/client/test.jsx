import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'antd';

export default class Test extends React.Component {
	render() {
		return (
			<div>I'm From JSX<Button>ANTD</Button></div>
		);
	}
}
ReactDOM.render(<Test />, document.getElementById('root'));