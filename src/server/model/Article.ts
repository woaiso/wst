import Author from './Author';

export default class Article {
	/**
	 * 帖子ID
	 *
	 * @type {number}
	 * @memberOf Article
	 */
	'id': number
	/**
	 * 板块ID
	 *
	 * @type {number}
	 * @memberOf Article
	 */
	'forumId': number
	/**
	 * 分类ID
	 *
	 * @type {string}
	 * @memberOf Article
	 */
	'category'?: string
	/**
	 * 标题
	 *
	 * @type {string}
	 * @memberOf Article
	 */
	'title': string
	/**
	 * 作者
	 *
	 * @type {{
	 * 		'userId': number
	 * 		'userName': string
	 * 		'userAvatar': string
	 * 	}}
	 * @memberOf Article
	 */
	'author'?: Author
	/**
	 * 阅读次数
	 *
	 * @type {number}
	 * @memberOf Article
	 */
	'readNum': number
	/**
	 * 评论次数
	 *
	 * @type {number}
	 * @memberOf Article
	 */
	'commentNum': number
	/**
	 * 被顶次数
	 *
	 * @type {number}
	 * @memberOf Article
	 */
	'raiseNum'?: number
	/**
	 * 发表日期
	 *
	 * @type {string}
	 * @memberOf Article
	 */
	'postTime': string
	/**
	 * 最后评论
	 *
	 * @type {string}
	 * @memberOf Article
	 */
	'lastCommenter': Author
	/**
	 * 最后评论时间
	 *
	 * @type {string}
	 * @memberOf Article
	 */
	'lastCommentTime': string
	/**
	 * 站点
	 *
	 * @type {string}
	 * @memberOf Article
	 */
	'website'?: string
	/**
	 * 帖子的地址
	 *
	 * @type {string}
	 * @memberOf Article
	 */
	'url'?: string
}
