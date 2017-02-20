/**
 * 消息的服务查询器
 */
import BaseDao from './baseDao';

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
	getList(): Promise<Post[]> {
		return this.find({ title: /狗/ });
	}
}
