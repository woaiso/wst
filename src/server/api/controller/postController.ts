import { NextFunction, Request, Response, Router } from 'express';
import PostService from './../dao/postService';

export default class PostController {
	postService: PostService
	constructor() {
		this.postService = new PostService();
	}
	create(router: Router) {
		console.log('[PostController::create] Creating PostController route.')
		router.get('/api/post/get', (_req: Request, res: Response, _next: NextFunction) => {
			this.postService.getList().then((postList) => {
				res.json({
					list: postList
				});
				res.end();
			});
		});
	}
}
