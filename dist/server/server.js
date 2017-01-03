/**
 * Web Server服务器配置
 * @version 0.0.1
 * @author woaiso@woaiso.com
 */
"use strict";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');
const ejs = require('ejs');
const compression = require('compression');
const index_1 = require("./routes/index");
const viewsPath = path.resolve(process.cwd(), 'dist/client');
class Server {
    /**
     * 程序入口
     *
     * @static
     * @returns {Server}
     *
     * @memberOf Server
     */
    static bootstrap() {
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
    config() {
        //add static paths
        this.app.use(compression());
        this.app.use('/', express.static(path.join(process.cwd(), 'dist/client')));
        //configure pug
        this.app.set('views', viewsPath);
        this.app.set('view engine', 'html');
        this.app.engine('html', ejs.renderFile);
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
        this.app.use((err, _req, _res, next) => {
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
    routes() {
        let router;
        router = express.Router();
        //IndexRoute
        index_1.IndexRoute.create(router);
        //use router middleware
        this.app.use(router);
    }
    /**
     * API配置
     *
     *
     * @memberOf Server
     */
    api() {
    }
}
exports.Server = Server;
