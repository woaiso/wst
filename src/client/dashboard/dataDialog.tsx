import * as React from 'react';
import { Modal, Row, Col } from 'antd';

import Post from './../../server/model/Post';
import Image from './../../server/model/Image';
import './style.css';

interface IDialogProps {
	post: Post,
	visible: boolean,
	onCancel?: () => void,
	onOk?: () => void
}

export default class DataDialog extends React.Component<IDialogProps, any> {
	state = {
		visible: false,
		previewImages: [],
		previewIndex: 0,
		previewVisible: false
	}
	componentWillReceiveProps(nextProps: IDialogProps) {
		this.setState({
			visible: nextProps.visible,
			post: nextProps.post
		})
	}
	previewImage = (images: Image[], index: number) => {
		this.setState({
			previewImages: images,
			previewIndex: index,
			previewVisible: true,
			visible: false
		})
	}
	closePreview = () => {
		this.setState({
			previewImages: [],
			previewIndex: 0,
			previewVisible: false,
			visible: true
		})
	}
	render() {
		//处理数据
		const { post = new Post() } = this.props;
		const { images = [] } = post;
		//rowMax
		const rowMaxNum = 5;
		const modalMaxWidth = 1400;
		const imagesData = [];
		images.forEach((image, index) => {
			if (!imagesData[~~(index / rowMaxNum)]) {
				imagesData[~~(index / rowMaxNum)] = [];
			}
			const imageCss = {
				width: '100%',
				height: '100%',
				backgroundImage: `url(${image.url})`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center center',
				backgroundSize: 'cover'
			}
			imagesData[~~(index / rowMaxNum)][index % rowMaxNum] = <div onClick={() => this.previewImage(images, index)} key={index} style={imageCss} />;
		});
		const modalWidth = imagesData.length === 1 ? modalMaxWidth / rowMaxNum * imagesData[0].length : modalMaxWidth;
		const imageBoxWidth = imagesData.length === 1 ? modalWidth / imagesData[0].length : modalWidth / rowMaxNum
		const { previewImages, previewIndex, previewVisible } = this.state;
		return (
			<Modal
				visible={this.state.visible}
				title={null}
				footer={null}
				closable={false}
				width={modalWidth}
				wrapClassName="image-modal vertical-center-modal"
				onCancel={this.props.onCancel}
				onOk={this.props.onOk}
			>
				<div className="image-modal-body">
					{
						imagesData.map((rows, rowIndex) => {
							return (
								<Row key={rowIndex} type="flex" justify="center">
									{
										rows.map((col, colIndex) => {
											return (
												<Col
													className="image-box"
													style={{ width: imageBoxWidth + 'px', height: imageBoxWidth + 'px' }}
													key={colIndex}
												>
													{col}
												</Col>
											);
										})
									}
								</Row>
							);
						})
					}
					<PreviewImage images={previewImages} index={previewIndex} visible={previewVisible} close={this.closePreview} />
				</div>
			</Modal>
		);
	}
}

interface IPreviewImageProps {
	images: Image[]
	index: number
	visible: boolean
	close: () => void
}

class PreviewImage extends React.Component<IPreviewImageProps, any>{
	state = {
		index: 0,
		image: null
	}
	componentWillMount() {
		this.setState({
			index: this.props.index,
			image: this.props.images[this.props.index]
		})
	}
	componentDidMount() {
		document.body.addEventListener('keydown', (event) => {
			const keyCode = event.keyCode;
			const { index } = this.state
			if (keyCode === 39 || keyCode === 32) { //Next
				const nextIndex = index + 1 >= this.props.images.length ? this.props.images.length - 1 : index + 1
				this.setState({
					index: nextIndex,
					image: this.props.images[nextIndex]
				})
				console.log(nextIndex);
			} else if (keyCode === 37) { //Prev
				const prevIndex = index - 1 < 0 ? 0 : index - 1
				this.setState({
					index: prevIndex,
					image: this.props.images[prevIndex]
				})
				console.log(prevIndex);
			} else if (keyCode === 13) {
				this.props.close();
			} else {

			}
		})
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			index: nextProps.index,
			image: nextProps.images[nextProps.index]
		})
	}
	render() {
		const { images, visible, close } = this.props;
		const { index, image } = this.state;
		return (
			<Modal
				width={image ? image.width : 0}
				title={null}
				footer={null}
				visible={visible}
				closable={false}
				onCancel={close}
				wrapClassName="image-modal vertical-center-modal"
			>
				<div className="image-modal-body">
					<div className="image-box" style={{ paddingBottom: 0 }}>
						{image ? <img src={image.url} style={{ width: '100%' }} /> : null}
					</div>
				</div>
			</Modal>
		)
	}
}
