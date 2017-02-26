import * as React from 'react';
import SlideMenu from './slideMenu';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import './dashboard.css';
import DataQuery from './dataQuery';

export default class DashBoard extends React.Component<any, any> {
	state = {
		collapsed: true,
	};
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}
	render() {
		return (
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
								<Icon type="user" />
								<span className="nav-text">nav 1</span>
							</Menu.Item>
							<Menu.Item key="2">
								<Icon type="video-camera" />
								<span className="nav-text">nav 2</span>
							</Menu.Item>
							<Menu.Item key="3">
								<Icon type="upload" />
								<span className="nav-text">nav 3</span>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout style={{ background: '#FFF' }}>
						<Header style={{ background: '#333', padding: 0 }}>
							<Icon
								className="trigger"
								style={{ color: '#FFF' }}
								type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
								onClick={this.toggle}
							/>
						</Header>
						<Content className="content-wrap">
							<DataQuery />
						</Content>
					</Layout>
				</Layout>
			</div>
		);
	}
}
