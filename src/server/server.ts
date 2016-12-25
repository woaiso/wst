/**
 * Web Server服务器配置
 * @version 0.0.1
 * @author woaiso@woaiso.com
 */

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');

import { IndexRoute } from './routes/index';

const viewsPath = path.resolve(process.cwd(), 'src/server/views');

export class Server {
	public app: express.Application;


    /**
     * 程序入口
     *
     * @static
     * @returns {Server}
     *
     * @memberOf Server
     */
	public static bootstrap(): Server {
		return new Server();
	}

	constructor() {
		//create expressjs application
		this.app = express();
		//configure application
		this.config();

		//add Route

		this.routes();

		//add API配置

		this.api();
	}

    /**
     * 应用配置
     *
     *
     * @memberOf Server
     */
	public config() {
		//add static paths
		this.app.use('/static', express.static(path.join(process.cwd(), 'public')));

		//configure pug
		this.app.set('views', viewsPath);
		this.app.set('view engine', 'ejs');

		//use logger middlware
		this.app.use(logger('dev'));

		//use json form parser middlware
		this.app.use(bodyParser.json());

		//use query string parser middlware
		this.app.use(bodyParser.urlencoded({
			extended: true
		}));

		//use cookie parker middleware middlware
		this.app.use(cookieParser('SECRET_GOES_HERE'));

		//use override middlware
		this.app.use(methodOverride());

		//catch 404 and forward to error handler
		this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
			err.status = 404;
			next(err);
		});

		//error handling
		this.app.use(errorHandler());
	}

    /**
     * 路由配置
     *
     *
     * @memberOf Server
     */
	public routes() {
		let router: express.Router;
		router = express.Router();

		//IndexRoute
		IndexRoute.create(router);

		//use router middleware
		this.app.use(router);
	}

    /**
     * API配置
     *
     *
     * @memberOf Server
     */
	public api() {

	}

}
