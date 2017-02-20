const db = require('monk')('localhost/wst');

export default class BaseDao<T> {
	collectionName = 'temp'
	setCollection(collectionName) {
		this.collectionName = collectionName;
	}
	insert(data) {
		db.get(this.collectionName).insert(data);
	}
	find(querySelector, options: any = { limit: 2 }): Promise<T[]> {
		return db.get(this.collectionName).find(querySelector, options) as Promise<T[]>;
	}
}
