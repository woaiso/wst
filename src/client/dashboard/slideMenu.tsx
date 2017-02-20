/**
 * 左侧菜单导航
 */
import * as React from 'react';
import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;

export default class SlideMenu extends React.Component<any, any> {
	render() {
		return (
			<Menu
				theme="dark"
				style={{ width: 240 }}
				defaultOpenKeys={['sub1']}
				selectedKeys={['1']}
				mode="inline"
			>
				<SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
					<Menu.Item key="1">Option 1</Menu.Item>
					<Menu.Item key="2">Option 2</Menu.Item>
					<Menu.Item key="3">Option 3</Menu.Item>
					<Menu.Item key="4">Option 4</Menu.Item>
				</SubMenu>
			</Menu>
		);
	}
}
