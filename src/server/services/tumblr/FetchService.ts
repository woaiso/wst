/**
 * 数据抓取服务
 */
//基础库
import tumblr from './API';

export default class FetchService {
	client: any
	init() {
		this.client = tumblr.createClient({
			consumer_key: 'CUNchAUJJA0xnZP0Wbb491ZCW4raIYeC8egzPUZZtIAhfmGbZh',
			consumer_secret: 'Pmod34vwIIQy12OA7TjTZt11QYsrBypZJUw0Nkit8xNH6EMXxd',
			token: 'Nn3XIuGE1tRAVlBwxgc7f5wnAyKuaB36JAwa6MG1QqHsrW4uKq',
			token_secret: 'WPD1zs1jFLblLaSrrncOEyZmkoU9DsIRCTuaErTF7pWNDFQNp7'
		});
	}
	getUserInfo() {
		this.client.userFollowing((_e, data) => {
			const blogs = data.blogs;
			blogs.forEach((blog) => {
				this.client.blogInfo(blog.name, (_, blogInfo) => {
					console.log(JSON.stringify(blogInfo, null, 2));
				})
			})

		});
	}
}

const services = new FetchService();
services.init();
services.getUserInfo();
