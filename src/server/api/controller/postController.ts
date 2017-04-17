import { NextFunction, Request, Response, Router } from 'express';
import { SortOrder } from './../dao/baseDao';
import PostService from './../dao/postService';

export default class PostController {
	postService: PostService
	constructor() {
		this.postService = new PostService();
	}
	create(router: Router) {
		console.log('[PostController::create] Creating PostController route.')
		router.get('/api/post/get', (req: Request, res: Response, _next: NextFunction) => {
			const page = req.query.page;
			const pageSize = req.query.pageSize;
			const queryKey = req.query.queryKey || 'title';
			const queryValue = req.query.queryValue || '';
			const sortField = req.query.sortField;
			const sortOrder = req.query.sortOrder === 'ascend' ? SortOrder.ASC_END : SortOrder.DESC_END; //sortOrder descend //倒序， ascend 正序
			console.log(page, pageSize);
			this.postService.getList(
				page,
				pageSize,
				queryKey,
				queryValue,
				sortField,
				sortOrder
			).then((postData) => {
				res.json({
					code: 200,
					message: 'ok',
					data: postData
				});
				res.end();
			});
		});
	}
}
