import Article from './Article';

export default class Post extends Article {
	/**
	 * 帖子ID
	 *
	 * @type {number}
	 * @memberOf Post
	 */
	id: number
	/**
	 * 主题ID
	 *
	 * @type {number}
	 * @memberOf Post
	 */
	articleId?: number
	/**
	 * 帖子内容（包含HTML）  like jQuery.html()
	 *
	 * @type {string}
	 * @memberOf Post
	 */
	content?: string
	/**
	 * 帖子内容（仅包含文本） like jQuery.text()
	 *
	 * @type {string}
	 * @memberOf Post
	 */
	text?: string
}
