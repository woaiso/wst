import * as React from 'react';
import SlideMenu from './slideMenu';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import './dashboard.css';
import DataQuery from './dataQuery';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

export default class DashBoard extends React.Component<any, any> {
	state = {
		collapsed: false,
		contentHeight: 640
	}
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}
	render() {
		return (
			<Router>
				<div className="dashboard">
					<Layout>
						<Sider
							trigger={null}
							collapsible
							collapsed={this.state.collapsed}
						>
							<div className="logo" onClick={this.toggle}>
								<span className="icon"/>
								<span className="logo-text" style={{display: this.state.collapsed ? 'none':'block'}}>柠檬监控</span>
							</div>
							<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
								<Menu.Item key="1">
									<Icon type="hdd" />
									<span className="nav-text">文章数据</span>
								</Menu.Item>
								<Menu.Item key="2">
									<Icon type="code-o" />
									<span className="nav-text">规则管理</span>
								</Menu.Item>
							</Menu>
						</Sider>
						<Layout style={{ background: '#FFF' }}>
							<div
								className="content-wrap"
							>
								<Content>
									<DataQuery />
								</Content>
							</div>
						</Layout>
					</Layout>
				</div>
			</Router>
		);
	}
}
