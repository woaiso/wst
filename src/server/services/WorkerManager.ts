
import Worker from './woker';
import Flyme from './../rules/Flyme';
import Clty from './../rules/Clty';

export default class WorkerManager {
	private worker: Worker
	start() {
		this.worker = new Worker();
		let job = new Clty(this.worker);
		this.worker.completedCallback = job.extract;
		job.setRootTask();
	}
}

new WorkerManager().start();
