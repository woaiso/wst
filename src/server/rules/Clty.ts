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
	private urlTemplate = 'http://www.t66y.com/thread0806.php?fid=${forumId}&search=&page=${pageId}';
	test = (url: string): boolean => {
		return /bbs\.flyme\.cn/.test(url)
	}

	extract = (html: string, data: any): void => {
		console.log(data.url, html);
		const htmlElement = $.load(html, { decodeEntities: false });
	}
	setRootTask() {
		const forums = ['16'];
		const maxPage = 100;
		forums.forEach((forum) => {
			for (let i = 1; i <= maxPage; i++) {
				super.addJob({
					url: this.urlTemplate.replace('${forumId}', forum).replace(/\$\{pageId\}/, i.toString())
				});
			}
		})
	}
}
