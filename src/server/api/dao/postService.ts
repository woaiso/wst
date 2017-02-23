/**
 * 消息的服务查询器
 */
import BaseDao from './baseDao';
import { ListData } from './baseDao';
interface Post {
	id?: number
	title?: string
	content?: string
	text?: string
}

export default class PostService extends BaseDao<Post> {
	constructor() {
		super();
		super.setCollection('post');
	}
	getList(pageNo: number = 1, pageSize: number = 20, keyword?: string): Promise<ListData<Post>> {
		return this.find({ title: new RegExp(keyword) }, { limit: pageSize, skip: (pageNo - 1) * pageSize, sort: [['id', 1]] });
	}
}
