import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, Row, Col } from 'antd';
import './index.css';
// import LoginPage from './pages/login';
import DashBoard from './dashboard';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
	<div className="mainBoard">
		{/*<LoginPage />*/}
		<header id="header" className="clearfix">
			<nav className="global-nav">
				<Row>
					<Col xs={2} sm={4} md={6} lg={8} xl={10}>
						<a href="/" title="logo">
							<span className="logo" />
							<span className="logo-text">柠檬</span>
						</a>
					</Col>
					<Col xs={20} sm={16} md={12} lg={8} xl={4}>Title</Col>
					<Col xs={2} sm={4} md={6} lg={8} xl={10} className="pull-right">
						<Link to="/dashboard"><Button type="dashed" ghost>DashBoard</Button></Link>
					</Col>
				</Row>
			</nav>
		</header>
		<section>
			<div className="slide" />
			<div className="slide" >
				<Link to="/dashboard"><Button size="large" ghost>打开操作中心</Button></Link>
			</div>
		</section>
	</div>
)

ReactDOM.render(<Bootstrap />, document.getElementById('root'));
