import { NextFunction, Request, Response, Router } from 'express';
import PostService from './../dao/postService';

export default class PostController {
	postService: PostService
	constructor() {
		this.postService = new PostService();
	}
	create(router: Router) {
		console.log('[PostController::create] Creating PostController route.')
		router.get('/api/post/get', (req: Request, res: Response, _next: NextFunction) => {
			const page = + req.query.page as number;
			const pageSize = + req.query.pageSize as number;
			const keyWord = req.query.q as string;
			this.postService.getList(
				page,
				pageSize,
				keyWord
			).then((postList) => {
				res.json({
					code: 200,
					message: 'ok',
					data: postList
				});
				res.end();
			});
		});
	}
}
