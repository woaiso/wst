import Worker from './woker';
/**
 * 单个任务
 *
 * @export
 * @class Job
 */
export default class Job {
	constructor(worker: Worker) {
		this.worker = worker;
	}
	private worker: Worker;
	/**
	 * 增加任务
	 *
	 * @param {any} data 任务数据
	 *
	 * @memberOf Job
	 */
	addJob(data) {
		this.worker.addJob(data);
	}
}
