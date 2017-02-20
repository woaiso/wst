import fetch from 'node-fetch';
import * as http from 'http';
import { fetchWithProxy } from './fetch';
import * as cheerio from 'cheerio';
import { seed } from './../seed';
import Worker from './woker';

const db = require('monk')('localhost/wst');
const articlesModel = db.get('articles');

var Queue = require('bull');
var url = require('url');
export default class Video {
	currentPage = 0
	maxPage = 386
	fid = 21
	worker
	init() {
		this.worker = new Worker();
		this.worker.on('completed', (html: string, data: any): void => {
			if (/forumdisplay/.test(data.url)) {
				this.extractList(html, data);
			} else if (/viewthread/.test(data.url)) {
				this.extractArticle(html, data);
			} else {
				console.log('not support page ' + data.url);
			}

		})
		for (; this.currentPage <= this.maxPage; this.currentPage++) {
			this.worker.addJob({
				url: seed.replace(/\$fid/, this.fid.toString()).replace(/\$page/, this.currentPage.toString()),
				fid: this.fid,
				page: this.currentPage
			})
		}
	}
	extractList(html, jobData) {
		let $ = cheerio.load(html);
		const channels = $('[id^=normalthread]');
		channels.each((_index, item) => {
			const page = $(item).find('[id^=thread] > a');
			const author = $(item).find('.author a');
			const authorId = author.attr('href') ? + author.attr('href').replace(/.*?=/, '') : -1
			const data = {
				id: + $(item).attr('id').replace(/.*?(\d+)/, '$1'),
				fid: jobData.fid,
				title: page.text(), //标题
				authorName: $(item).find('.author cite').text(),
				authorId: authorId,
				postDate: $(item).find('.author > em').text(),
				viewCount: +$(item).find('.nums strong').text(),
				replyCount: +$(item).find('.nums em').text(),
				raiseCount: +$(item).find('font[color=green]').text().replace(/.*?(\d+).*/, '$1'),
				lastpost: {
					userName: $(item).find('.lastpost cite a').text(),
					date: $(item).find('.lastpost em span').attr('title')
				},
				website: '91porn'
			}
			articlesModel.insert(data);
			//fetch page work
			const href = url.resolve(jobData.url, page.attr('href')) + '&authorid=' + authorId;
			this.worker.addJob({
				url: href,
				fid: jobData.fid
			})
			//console.log(JSON.stringify(data, null, 2));
		});
	}
	extractArticle(html, jobData) {
		let $ = cheerio.load(html, { decodeEntities: false });

		// get all post message . the first one is main message
		const post = $($('[id^=post_]')[0]);
		post.find('.attach_popup').remove();
		post.find('div.t_attach').remove();
		post.find('span[id^=attach_]').remove();
		const images = Array.prototype.slice.call(post.find('img[id^=aimg_]').map((_index, item) => $(item).attr('file')));
		post.find('img[id^=aimg_]').each((index, imageElement) => {
			$(imageElement).attr('src', url.resolve(jobData.url, images[index]));
			$(imageElement).removeAttr('file');
			$(imageElement).removeAttr('onmouseover');
		});
		const postMessage = {
			id: + post.attr('id').replace(/.*?(\d+)/, '$1'),
			author: {
				id: post.find('.postauthor .postinfo a').attr('href').replace(/.*?uid=/, ''),
				userName: post.find('.postauthor .postinfo a').text()
			},
			title: post.find('#threadtitle h1').text(),
			content: post.find('.t_msgfont').html().replace(/\r|\n/g, ''),
			text: post.find('.t_msgfont').text().replace(/\r\n\r\n/g, ''),
			images: images
		}

		console.log(JSON.stringify(postMessage, null, 2));
		// console.log(postMessage.content);

		db.get('post').insert(postMessage);
		// posts.each((_index, item) => {
		return postMessage;
	}
}

// const video = new Video();
// const testUrl = 'http://91.t9m.space/viewthread.php?tid=220654&extra=page%3D1%26amp%3Bfilter%3Ddigest';

// fetchWithProxy(testUrl)
// 	.then((html) => {
// 		video.extractArticle(html, { url: testUrl });
// 	});

new Video().init();
