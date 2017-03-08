import { Rule } from './Rule';
import URL from './../model/URL';
import $ from 'cheerio';
/**
 * FLyme 论坛的BBS数据解析
 */

export default class Flyme implements Rule {
	test = (url: string): boolean => {
		return /bbs\.flyme\.cn/.test(url)
	}

	extract = (html: string, url: URL): void => {
		const htmlElement = $.load(html, { decodeEntities: false });
		console.log(url);
	}

}
