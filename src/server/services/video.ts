import fetch from 'node-fetch';
import * as http from 'http';
import { fetchWithProxy } from './fetch';
import * as cheerio from 'cheerio';
import { seed } from './../seed';
import Worker from './woker';
import Article from './../model/Article';
import Image from './../model/Image';
import Post from './../model/Post';
import Author from './../model/Author';


const db = require('monk')('localhost/wst');
const articlesModel = db.get('articles');

var Queue = require('bull');
var url = require('url');
export default class Video {
	currentPage = 0
	maxPage = 1
	fid = 19
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

			/**主题数据 */

			const article = new Article();
			article.id = + $(item).attr('id').replace(/.*?(\d+)/, '$1');
			article.forumId = jobData.fid;
			article.title = page.text(); //标题
			article.author = {
				userId: authorId,
				userName: $(item).find('.author cite a').text()
			};
			article.postTime = $(item).find('.author > em').text();
			article.readNum = +$(item).find('.nums strong').text();
			article.commentNum = + $(item).find('.nums em').text();
			article.raiseNum = +$(item).find('font[color=green]').text().replace(/.*?(\d+).*/, '$1');

			const commenter = new Author();
			commenter.userName = $(item).find('.lastpost cite a').text();

			article.lastCommenter = commenter;
			article.lastCommentTime = $(item).find('.lastpost em span').attr('title');
			article.website = url.parse(jobData.url).hostname;
			article.url = url.resolve(jobData.url, page.attr('href')) + '&authorid=' + authorId;

			// articlesModel.insert(data);
			//fetch page work
			console.log(JSON.stringify(article, null, 2));
			this.worker.addJob(article);
		});
	}
	extractArticle(html, jobData) {
		const article = jobData.article;
		let $ = cheerio.load(html, { decodeEntities: false });

		// get all post message . the first one is main message
		const postElement = $($('[id^=post_]')[0]);
		postElement.find('.attach_popup').remove();
		postElement.find('div.t_attach').remove();
		postElement.find('span[id^=attach_]').remove();

		// const images = new Array<Image>();



		const images = Array.prototype.slice.call(postElement.find('img[id^=aimg_]').map((_index, item) => {
			return $(item).attr('file');
		}));

		postElement.find('img[id^=aimg_]').each((index, imageElement) => {
			$(imageElement).attr('src', url.resolve(jobData.url, images[index]));
			$(imageElement).removeAttr('file');
			$(imageElement).removeAttr('onmouseover');
		});

		const post = Object.assign({}, jobData.article) as Post;

		post.articleId = jobData.article.id;
		post.id = + postElement.attr('id').replace(/.*?(\d+)/, '$1')
		post.content = postElement.find('.t_msgfont').html().replace(/\r|\n/g, '');
		post.text = postElement.find('.t_msgfont').text().replace(/\r\n\r\n/g, '');
		post.images = images;

		console.log(JSON.stringify(postMessage, null, 2));
		// console.log(post.content);

		// db.get('post').insert(post);
		return post;
	}
}

// const video = new Video();
// const testUrl = 'http://91.t9m.space/viewthread.php?tid=202723';

// fetchWithProxy(testUrl)
// 	.then((html) => {
// 		video.extractArticle(html, { url: testUrl });
// 	});

new Video().init();
