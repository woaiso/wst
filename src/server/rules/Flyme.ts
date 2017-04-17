import { Rule } from './Rule';
import URL from './../model/URL';
import $ from 'cheerio';
import Job from './../services/Job';

/**
 * FLyme 论坛的BBS数据解析
 *
 * @export
 * @class Flyme
 * @extends {Task}
 * @implements {Rule}
 */
export default class Flyme extends Job implements Rule {
	private urlTemplate = 'http://bbs.flyme.cn/forum-${forumId}-${pageId}.html';
	test = (url: string): boolean => {
		return /bbs\.flyme\.cn/.test(url)
	}

	extract = (html: string, url: URL): void => {
		console.log('download DOM', html);
		const htmlElement = $.load(html, { decodeEntities: false });
		console.log(url);
	}
	setRootTask() {
		const forums = ['100007', '88'];
		const maxPage = 1000;
		forums.forEach((forum) => {
			for (let i = 1; i <= maxPage; i++) {
				super.addJob({
					url: this.urlTemplate.replace('${forumId}', forum).replace(/\$\{pageId\}/, i.toString())
				});
			}
		})
	}
}
