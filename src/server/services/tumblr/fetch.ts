import * as  request from 'request';

export default class Fetch {
	static get(options, callback) {
		options.proxy = 'http://127.0.0.1:1080';
		return request(options, callback);
	}
}
