const db = require('monk')('localhost/wst');

export interface ListData<T> {
	list: T[],
	total: number
}

export enum SortOrder {
	/**
	 * 倒序
	 */
	DESC_END = -1,
	/**
	 * 正序
	 */
	ASC_END = 1
}

export default class BaseDao<T> {
	collectionName = 'temp'
	setCollection(collectionName) {
		this.collectionName = collectionName;
	}
	insert(data) {
		db.get(this.collectionName).insert(data);
	}
	find(querySelector, options: any = { limit: 2 }): Promise<ListData<T>> {
		console.log(querySelector, options);
		return new Promise((resolve: (data: ListData<T>) => void, _reject) => {
			const data = {
				list: [],
				total: 0
			};
			db.get(this.collectionName).find(querySelector, options).then((list: T[]) => {
				data.list = list;
				db.get(this.collectionName).count(querySelector).then((count) => {
					data.total = count;
					resolve(data);
				})
			})
		})
	}
}
