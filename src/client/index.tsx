import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css'


class Bootstrap extends React.Component<any, any> {
	render() {
		return (
			<div>
				I'm From Typescript React Hello Test
				<a href="javascript:;" >hello</a>
			</div>
		);
	}
}

ReactDOM.render(<Bootstrap />, document.getElementById('root'));
