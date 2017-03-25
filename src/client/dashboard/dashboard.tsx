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
	contentWrap: any
	headerWrap: any
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}
	onResize = () => this.setState({ contentHeight: window.innerHeight - this.headerWrap.clientHeight })
	componentDidMount() {
		this.onResize();
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
							<div className="logo" />
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
							<div ref={(rel) => this.headerWrap = rel}>
								<Header style={{ background: '#333', padding: 0 }} >
									<Icon
										className="trigger"
										style={{ color: '#FFF' }}
										type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
										onClick={this.toggle}
									/>
								</Header>
							</div>
							<div
								className="content-wrap"
								ref={(rel) => this.contentWrap = rel}
								style={{ height: this.state.contentHeight }}
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
