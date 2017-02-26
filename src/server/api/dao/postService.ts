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

export enum SortOrder {
	/**
	 * 倒序
	 */
	DESC_END = -1,
	/**
	 * 正序
	 */
	ASC_END = 1
}

export default class PostService extends BaseDao<Post> {
	constructor() {
		super();
		super.setCollection('post');
	}
	getList(pageNo: number = 1, pageSize: number = 20, queryKey?: string, queryValue?: string, sortField: string = 'id', sortOrder?: SortOrder): Promise<ListData<Post>> {
		return this.find({ [queryKey]: new RegExp(queryValue) }, { limit: +pageSize, skip: +(pageNo - 1) * pageSize, sort: { [sortField]: sortOrder } });
	}
}
