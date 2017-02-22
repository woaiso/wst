import * as React from 'react';
import { Modal, Row, Col } from 'antd';

import Post from './../../server/model/Post';

interface IDialogProps {
	post: Post,
	visible: boolean,
	onCancel?: () => void,
	onOk?: () => void
}

export default class DataDialog extends React.Component<IDialogProps, any> {
	state = {
		visible: false
	}
	componentWillReceiveProps(nextProps: IDialogProps) {
		this.setState({
			visible: nextProps.visible,
			post: nextProps.post
		})
	}
	render() {
		//处理数据
		const { post = new Post() } = this.props;
		const { images = [] } = post;
		//rowMax
		const rowMaxNum = 3;
		const imagesData = [];
		images.forEach((image, index) => {
			if (!imagesData[~~(index / rowMaxNum)]) {
				imagesData[~~(index / rowMaxNum)] = [];
			}
			imagesData[~~(index / rowMaxNum)][index % rowMaxNum] = <img key={index} src={image.url} style={{ width: '100%' }} />;
		});
		console.log(imagesData);
		return (
			<Modal
				visible={this.state.visible}
				title={post.title}
				width={960}
				wrapClassName="vertical-center-modal"
				onCancel={this.props.onCancel}
				onOk={this.props.onOk}
			>
				{
					imagesData.map((rows, rowIndex) => {
						return <Row key={rowIndex} type="flex" justify="start">{rows.map((col, colIndex) => <Col key={colIndex} span={24 / rows.length}>{col}</Col>)}</Row>;
					})
				}
			</Modal>
		);
	}
}
