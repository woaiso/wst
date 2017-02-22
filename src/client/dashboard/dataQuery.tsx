import * as React from 'react';
import { articles } from './mock';
import { Table, Pagination, Input, Button } from 'antd';
import { TableColumnConfig } from 'antd/lib/table/Table';
import fetch from './../utils/fetch';
var Qs = require('qs');
import Article from './../../server/model/Article';



interface IArticle extends Article {
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
		searchText: '',
	}
	componentDidMount() {
		this.fetchData();
	}
	handleTableChange = (pagination, filters: any = {}, sorter: any = {}) => {
		const pager = this.state.pagination;
		filters.q = this.state.searchText;
		pager.current = pagination.current;
		this.setState({
			pagination: pager,
		});
		this.fetchData({
			pageSize: pagination.pageSize,
			page: pagination.current,
			sortField: sorter.field,
			sortOrder: sorter.order,
			...filters,
		});
	}
	fetchData = (params = { pageSize: 20, page: 1, q: '' }) => {
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
		this.setState({ searchText: e.target.value });
	}
	onSearch = () => {
		const { searchText } = this.state;
		this.fetchData({
			page: 1,
			pageSize: 20,
			q: searchText
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
				dataIndex: 'id'
			},
			{
				title: '分类',
				dataIndex: 'forumId'
			},
			{
				title: '作者ID',
				dataIndex: 'author.userId'
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
				dataIndex: 'author.userName'
			},
			{
				title: '标题',
				dataIndex: 'title',
				filterDropdown: (
					<div className="custom-filter-dropdown">
						<Input
							placeholder="keyword"
							value={this.state.searchText}
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
				dataIndex: 'readNum'
			},
			{
				title: '评论数量',
				dataIndex: 'commentNum'
			},
			{
				title: '发布日期',
				dataIndex: 'postTime'
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
				render: (text)=>{
					return {
						children: <a href={text} target="_blank">来源</a>
					};
				}
			}
		];
		const {pagination} = this.state;
		return (
			<div>
				<ArticleTable
					columns={columns}
					dataSource={data}
					rowKey={(record) => record._id.toString()}
					pagination={false}
					loading={this.state.loading}
					onChange={this.handleTableChange}
					size="small"
					expandedRowRender={(record) => <div className="expanded-row-wrap" dangerouslySetInnerHTML={{ __html: record.content }}/>}
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

			</div>
		);
	}
}
