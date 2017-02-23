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
		seed.forEach((seed) => {
			const fids = seed.fid;
			fids.forEach((fid) => {
				const id = fid[0];
				const maxPage = fid[1];
				for (let i = 1; i <= maxPage; i++) {
					this.worker.addJob({
						url: seed.urlTemplate.replace(/\$fid/, id.toString()).replace(/\$page/, i.toString()),
						fid: id,
						page: i
					})
				}
			})
		})
	}
	/** */
	getTotalCount() {

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
			article.readNum = + $(item).find('.nums em').text();
			article.commentNum = +$(item).find('.nums strong').text();
			article.raiseNum = +$(item).find('font[color=green]').text().replace(/.*?(\d+).*/, '$1');

			const commenter = new Author();
			commenter.userName = $(item).find('.lastpost cite a').text();

			article.lastCommenter = commenter;
			article.lastCommentTime = $(item).find('.lastpost em span').attr('title');
			article.website = url.parse(jobData.url).hostname;
			article.url = url.resolve(jobData.url, page.attr('href')) + '&authorid=' + authorId;

			articlesModel.insert(article);
			//fetch page work
			console.log(JSON.stringify(article, null, 2));
			this.worker.addJob({ article, url: article.url });
		});
	}
	extractArticle(html, jobData) {
		const article = jobData.article;
		let $ = cheerio.load(html, { decodeEntities: false });

		// get all post message . the first one is main message
		const postElement = $($('[id^=post_]')[0]);
		const post = Object.assign({}, article) as Post;
		const images = new Array<Image>();
		post.id = + postElement.attr('id').replace(/.*?(\d+)/, '$1');
		postElement.find('img[id^=aimg_]').each((_index, imageElement) => {
			const filename = $(imageElement).attr('file');
			const image = new Image();
			const imageElementId = $(imageElement).attr('id');
			image.parentId = post.id;
			image.id = + imageElementId.replace(/.*?_(\d+)/, '$1');
			image.url = url.resolve(article.url, filename);
			image.fileName = filename.replace(/.*?\//, '');
			image.ext = filename.replace(/.*?\./, '');
			image.title = $(imageElement).attr('alt');
			image.width = + $(imageElement).attr('width');
			const menuText = postElement.find('#' + imageElementId + '_menu').text();
			const group = /(\d+\.\d+)[\D]*(\d{4}-\d{1,2}-\d{1,2}\s\d{1,2}:\d{1,2})?/.exec(menuText);
			const timeTitle = postElement.find('#' + imageElementId + '_menu' + ' .t_smallfont  span').attr('title');
			image.postTime = timeTitle ? timeTitle : group[2];
			image.size = + group[1];
			images.push(image);
		});
		postElement.find('img[id^=aimg_]').each((index, imageElement) => {
			$(imageElement).attr('src', images[index].url);
			$(imageElement).removeAttr('file');
			$(imageElement).removeAttr('onmouseover');
		});

		postElement.find('.attach_popup').remove();
		postElement.find('div.t_attach').remove();
		postElement.find('span[id^=attach_]').remove();
		post.articleId = article.id;
		post.content = postElement.find('.t_msgfont').html().replace(/\r|\n/g, '');
		post.text = postElement.find('.t_msgfont').text().replace(/\r\n\r\n/g, '');
		post.images = images;

		console.log(JSON.stringify(post, null, 2));
		db.get('post').insert(post);
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
