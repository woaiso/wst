import * as React from 'react';
import { Table, Pagination, Input, Button, Row, Col, Form } from 'antd';
import { TableColumnConfig } from 'antd/lib/table/Table';
import fetch from './../utils/fetch';
var Qs = require('qs');
import Post from './../../server/model/Post';
import DataDialog from './dataDialog';
const FormItem = Form.Item;


interface IArticle extends Post {
	'_id': string
	'key': number
}
class ArticleTable extends Table<IArticle>{

}

export default class DataQuery extends React.Component<any, any>{
	state = {
		data: [],
		pagination: {
			size: 'default',
			defaultPageSize: 20
		} as any,
		loading: false,
		filterDropdownVisible: false,
		queryKey: 'title',
		queryValue: '',
		dataDialogVisible: false,
		activePost: new Post()
	}
	componentDidMount() {
		this.fetchData();
	}
	handleTableChange = (pagination, filters: any = {}, sorter: any = {}) => {
		const pager = this.state.pagination;
		filters.queryKey = this.state.queryKey;
		filters.queryValue = this.state.queryValue;
		pager.current = pagination.current || 1;
		this.setState({
			pagination: pager,
		});
		this.fetchData({
			pageSize: pagination.pageSize || 20,
			page: pager.current,
			sortField: sorter.field,
			sortOrder: sorter.order,
			...filters,
		});
	}
	fetchData = (params = { pageSize: 20, page: 1, queryKey: '', queryValue: '' }) => {
		this.setState({ loading: true });
		fetch.get('/api/post/get', {
			params: params,
			paramsSerializer: (params) => {
				return Qs.stringify(params, { arrayFormat: 'brackets' })
			}
		}).then((response) => {
			const result = response.data;
			if (result.code === 200) {
				const data = result.data;
				const pagination = this.state.pagination;
				pagination.total = data.total;
				this.setState({
					loading: false,
					data: data.list,
					pagination,
				});
			} else {
				console.error('fetch error');
			}
		})
	}
	onInputChange = (e) => {
		this.setState({ queryValue: e.target.value });
	}
	onSearch = () => {
		const { queryValue } = this.state;
		this.fetchData({
			page: 1,
			pageSize: 20,
			queryKey: 'title',
			queryValue
		});
	}
	onClickTitle = (post: Post) => {
		this.setState({
			dataDialogVisible: true,
			activePost: post
		});
	}
	onClickUserName = (post: Post) => {
		this.setState({
			queryKey: 'author.userName',
			queryValue: post.author.userName
		}, () => {
			this.fetchData({
				page: 1,
				pageSize: 20,
				queryKey: 'author.userName',
				queryValue: post.author.userName
			});
		})
	}
	onDataDialogCancel = () => {
		this.setState({
			dataDialogVisible: false,
			activePost: new Post()
		});
	}
	onDataDialogOk = () => {
		this.setState({
			dataDialogVisible: false,
			activePost: new Post()
		});
	}
	render() {
		const data = this.state.data as IArticle[];
		data.forEach((item, index) => {
			item.key = index;
		})

		const columns: TableColumnConfig<IArticle>[] = [
			{
				title: 'ID',
				dataIndex: 'id',
				sorter: true
			},
			{
				title: '分类',
				dataIndex: 'forumId'
			},
			{
				title: '作者ID',
				dataIndex: 'author.userId',
				sorter: true
			},
			{
				title: '头像',
				dataIndex: 'author.userAvatar',
				className: 'avatar-column',
				render: (text, _record, _index) => {
					return {
						children: <img style={{ width: 20, height: 20 }} src={text} />
					}
				}
			},
			{
				title: '昵称',
				dataIndex: 'author.userName',
				render: (text, record: Post) => {
					return {
						children: <a href="javascript:;" onClick={() => this.onClickUserName(record)}>{text}</a>
					};
				},
			},
			{
				title: '标题',
				dataIndex: 'title',
				render: (text, record: Post) => {
					return {
						children: <a href="javascript:;" onClick={() => this.onClickTitle(record)}>{text}</a>
					};
				},
				filterDropdown: (
					<div className="custom-filter-dropdown">
						<Input
							placeholder="keyword"
							value={this.state.queryValue}
							onChange={this.onInputChange}
							onPressEnter={this.onSearch}
						/>
						<Button type="primary" onClick={this.onSearch}>Search</Button>
					</div>
				),
				// filterDropdownVisible: this.state.filterDropdownVisible,
				// onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
			},
			{
				title: '阅读数量',
				dataIndex: 'readNum',
				sorter: true
			},
			{
				title: '评论数量',
				dataIndex: 'commentNum',
				sorter: true
			},
			{
				title: '发布日期',
				dataIndex: 'postTime',
				sorter: true
			},
			{
				title: '最后评论',
				dataIndex: 'lastCommenter.userName'
			},
			{
				title: '最后评论时间',
				dataIndex: 'lastCommentTime'
			},
			{
				title: '操作',
				dataIndex: 'url',
				render: (text) => {
					return {
						children: <a href={text} target="_blank">来源</a>
					};
				}
			}
		];
		const { pagination } = this.state;
		return (
			<div>
				<div className="filter-wrap">
					<Form inline>
						<FormItem label="标题">
							<Input
								placeholder="输入搜索的文字"
								value={this.state.queryValue}
								onChange={this.onInputChange}
								onPressEnter={this.onSearch}
							/>
						</FormItem>
						<FormItem>
							<Button type="primary" htmlType="button" onClick={this.onSearch}>
								搜索
							</Button>
						</FormItem>
					</Form>
				</div>
				<ArticleTable
					columns={columns}
					dataSource={data}
					rowKey={(record) => record.id.toString()}
					pagination={false}
					loading={this.state.loading}
					onChange={this.handleTableChange}
					size="small"
					expandedRowRender={(record) => <div className="expanded-row-wrap" dangerouslySetInnerHTML={{ __html: record.content }} />}
				/>
				<div style={{ display: 'flex' }}>
					<Pagination
						style={{ margin: '16px 0 ' }}
						{...this.state.pagination}
						onChange={(current, pageSize) => this.handleTableChange({ current, pageSize })}
					/>
					<div style={{ lineHeight: '60px', marginLeft: 16 }}>
						<span>共{pagination.total}条</span>
					</div>
				</div>
				<DataDialog visible={this.state.dataDialogVisible} post={this.state.activePost} onOk={this.onDataDialogOk} onCancel={this.onDataDialogCancel} />
			</div >
		);
	}
}
