import * as React from 'react';
import { articles } from './mock';
import { Table } from 'antd';
import { TableColumnConfig } from 'antd/lib/table/Table';

interface IArticle {
	'key': number,
	'id': number
	'category': string
	'title': string
	'author': {
		'userId': number
		'userName': string
		'userAvatar': string
	},
	'readNum': number
	'commentNum': number
	'postTime': string
	'lastCommenter': string
	'lastCommentTime': string
}
class ArticleTable extends Table<IArticle>{

}

export default class DataQuery extends React.Component<any, any>{
	render() {
		const data = articles as IArticle[];
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
				dataIndex: 'category'
			},
			{
				title: '标题',
				dataIndex: 'title'
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
				dataIndex: 'lastCommenter'
			},
			{
				title: '最后评论用户',
				dataIndex: 'lastCommentTime'
			},
			{
				title: '作者ID',
				dataIndex: 'author.userId'
			},
			{
				title: '作者名称',
				dataIndex: 'author.userName'
			},
			{
				title: '作者头像',
				dataIndex: 'author.userAvatar',
				className: 'avatar-column',
				render: (text, _record, _index) => {
					return {
						children: <img style={{width:20, height:20}} src={text} />
					}
				}
			}
		]
		return (
			<div>
				<ArticleTable columns={columns} dataSource={data} size="small" pagination={{ defaultPageSize: 25, total: data.length }} />
			</div>
		);
	}
}
