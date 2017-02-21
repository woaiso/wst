/**
 * 图片
 *
 * @export
 * @class Image
 */
export default class Image {
	/**
	 * ID
	 *
	 * @type {number}
	 * @memberOf Image
	 */
	id?: number
	/**
	 * 图片网络地址
	 *
	 * @type {string}
	 * @memberOf Image
	 */
	url: string
	/**
	 * 图片名称（网络地址部分）
	 *
	 * @type {string}
	 * @memberOf Image
	 */
	fileName: string
	/**
	 * 图片名称（上传的文件名称）
	 *
	 * @type {string}
	 * @memberOf Image
	 */
	title?: string
	/**
	 * 图片宽
	 *
	 * @type {number}
	 * @memberOf Image
	 */
	width?: number
	/**
	 * 图片高
	 *
	 * @type {number}
	 * @memberOf Image
	 */
	height?: number
	/**
	 * 图片大小（单位KB）
	 *
	 * @type {number}
	 * @memberOf Image
	 */
	size?: number
	/**
	 * 图片后缀
	 *
	 * @type {string}
	 * @memberOf Image
	 */
	ext?: string
	/**
	 * 发布日期
	 *
	 * @type {string}
	 * @memberOf Image
	 */
	postTime?: string
	/**
	 * 图片的描述
	 *
	 * @type {string}
	 * @memberOf Image
	 */
	desc?: string
}
