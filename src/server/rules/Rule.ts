import URL from './../model/URL';
/**
 * 基础规则
 *
 * @export
 * @interface Rule
 */
export interface Rule {
	/**
	 * 测试匹配规则
	 *
	 * @param {string} url 传入的URL链接
	 * @memberOf Rule
	 */
	test: (url: string) => boolean | RegExp
	/**
	 * 解析数据
	 *
	 * @param {string} html 下载的HTML文本数据
	 * @param {URL} url 网络地址
	 * @memberOf Rule
	 */
	extract: (html: string, url: URL) => void
	/**
	 * 设置启动任务
	 *
	 *
	 * @memberOf Rule
	 */
	setRootTask: () => void
}
