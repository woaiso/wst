const db = require('monk')('localhost/wst');

export default class BaseDao<T> {
	collectionName = 'temp'
	setCollection(collectionName) {
		this.collectionName = collectionName;
	}
	insert(data) {
		db.get(this.collectionName).insert(data);
	}
	find(querySelector, sort?: any): Promise<T[]> {
		return db.get(this.collectionName).find(querySelector, sort).skip(0).limit(10) as Promise<T[]>;
	}
}
