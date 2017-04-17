/**
 * 博客服务
 */
import BaseDao, { ListData, SortOrder } from './baseDao';
import Blog from './../../model/Blog';

export default class BlogService extends BaseDao<Blog> {
	constructor() {
		super();
		super.setCollection('blogs');
	}
	getList(pageNo: number = 1, pageSize: number = 20, queryKey?: string, queryValue?: string, sortField: string = 'id', sortOrder?: SortOrder): Promise<ListData<Blog>> {
		return this.find({ [queryKey]: new RegExp(queryValue) }, { limit: +pageSize, skip: +(pageNo - 1) * pageSize, sort: { [sortField]: sortOrder } });
	}
}
