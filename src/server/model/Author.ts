/**
 * 用户
 */

export default class Author {
	/**
	 * 用户ID
	 *
	 * @type {number}
	 * @memberOf Author
	 */
	userId?: number
	/**
	 * 用户昵称
	 *
	 * @type {string}
	 * @memberOf Author
	 */
	userName?: string
	/**
	 * 用户头像
	 *
	 * @type {string}
	 * @memberOf Author
	 */
	userAvatar?: string
	/**
	 * 等级
	 *
	 * @type {string}
	 * @memberOf Author
	 */
	level?: string
	/**
	 * 帖子数量
	 *
	 * @type {number}
	 * @memberOf Author
	 */
	postNum?: number

	/**
	 * 主题数量
	 *
	 * @type {number}
	 * @memberOf Author
	 */
	articleNum?: number
	/**
	 * 精华数量
	 *
	 * @type {number}
	 * @memberOf Author
	 */
	gemNum?: number
	/**
	 * 金币
	 *
	 * @type {number}
	 * @memberOf Author
	 */
	coin?: number
	/**
	 * 来自（地区）
	 *
	 * @type {string}
	 * @memberOf Author
	 */
	from?: string
	/**
	 * 注册时间
	 *
	 * @type {string}
	 * @memberOf Author
	 */
	registerTime?: string
	/**
	 * 最后登录时间
	 *
	 * @type {string}
	 * @memberOf Author
	 */
	lastLoginTime?: string
	/**
	 * 被顶次数
	 *
	 * @type {string}
	 * @memberOf Author
	 */
	raiseNum?: string
}
