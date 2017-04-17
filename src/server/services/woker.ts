/**
 * 用于处理任务队列
 */

var Queue = require('bull');
import { fetchWithProxy } from './fetch';

export default class Woker {
	maxWoker = 30
	workers = []
	jobs = 0
	completedCallback: (html, jobData) => void
	constructor() {
		for (let i = 0; i < this.maxWoker; i++) {
			const articlesQueue = Queue('worker_' + i, 6379, '127.0.0.1');
			articlesQueue.process((job) => {
				return fetchWithProxy(job.data.url).then((html) => this.completedCallback(html, job.data));
			});
			this.workers.push(articlesQueue);
		}
	}
	/**
	 * 添加任务
	 *
	 * @param {any} data 任务
	 *
	 * @memberOf Woker
	 */
	addJob(data) {
		this.workers[this.jobs % this.maxWoker].add(data);
		this.jobs++;
	}
	on(type: string, callback: (html: string, data: any) => void) {
		if (type === 'completed') {
			this.completedCallback = callback;
		}
	}
}
