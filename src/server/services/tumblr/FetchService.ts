/**
 * 数据抓取服务
 */
//基础库
import tumblr from './API';
const db = require('monk')('localhost/wst');
const blogCollection = db.get('blogs');


class UserInfo {
	name: string
	likes: number
	following: number
	default_post_format: 'html'
	blogs: BlogInfo[]
}

class BlogInfo {
	'title': string
	'name': string
	'total_posts': number
	'posts': number
	'url': string
	'updated': number
	'description': string
	'is_nsfw': boolean
	'ask': boolean
	'ask_page_title': string
	'ask_anon': boolean
	'followed': boolean
	'can_send_fan_mail': boolean
	'is_blocked_from_primary': boolean
	'share_likes': boolean
	'twitter_enabled': boolean
	'twitter_send': boolean
	'facebook_opengraph_enabled': 'N' | 'Y'
	'tweet': 'N' | 'Y'
	'facebook': 'N' | 'Y'
	'followers': number
	'primary': boolean
	'admin': boolean
	'messages': number
	'queue': number
	'drafts': number
	'type': 'public'
	'reply_conditions': number
	'subscribed': boolean
	'can_subscribe': boolean
}

export default class FetchService {
	client: any
	init() {
		if (this.client === null || this.client === undefined) {
			this.client = tumblr.createClient({
				consumer_key: 'CUNchAUJJA0xnZP0Wbb491ZCW4raIYeC8egzPUZZtIAhfmGbZh',
				consumer_secret: 'Pmod34vwIIQy12OA7TjTZt11QYsrBypZJUw0Nkit8xNH6EMXxd',
				token: 'pGJqrTwYaZ8sQRmxuq0L3eqdlbYoO0ofB9geB1TfSKq0krBulG',
				token_secret: '3pFaYByMp25nILoFTWmU9sgVz5f7M7dWyS9OmKaJIXIhVt1MhI'
			});
		}
	}
	async getUserInfo(): Promise<UserInfo> {
		return new Promise<UserInfo>((resolve, reject) => {
			this.client.userInfo((e, userInfoData: { user: UserInfo }) => {
				console.log(userInfoData);
				resolve(userInfoData.user);
			})
		});
	}
	async getUserFollowing(offset: number): Promise<BlogInfo[]> {
		return new Promise<BlogInfo[]>((resolve, reject) => {
			this.client.userFollowing({ offset: offset }, (e: Error, data: { blogs: BlogInfo[] }) => {
				if (e) {
					reject(e);
				} else {
					resolve(data.blogs);
				}
			});
		});
	}
	/**
	 * 获取博客基本信息
	 *
	 * @param {string} blogName
	 * @returns {Promise<BlogInfo>}
	 *
	 * @memberOf FetchService
	 */
	async getBlogInfo(blogName: string): Promise<BlogInfo> {
		return new Promise<BlogInfo>((resolve, reject) => {
			this.client.blogInfo(blogName, (e: Error, blogInfoData: { blog: BlogInfo }) => {
				if (e) {
					reject(e);
				} else {
					resolve(blogInfoData.blog);
				}
			});
		});
	}

	async storeFollowingBlogs(userInfo: UserInfo) {
		const { following = 0 } = userInfo;
		const limit = 20;
		const maxPage = Math.ceil(following / limit);
		for (let i = 0; i < maxPage - 1; i++) {
			const blogs = await this.getUserFollowing(i * limit);
			for (let j = 0; j < blogs.length; j++) {
				const blog = blogs[j];
				const blogInfoDetail = await this.getBlogInfo(blog.name);
				blogCollection.insert(blogInfoDetail);
			}
		}
	}
}


async function test() {
	let services = new FetchService();
	services.init();
	try {
		let userInfo = await services.getUserInfo();
		// services.storeFollowingBlogs(userInfo);
	} catch (e) {
		console.log(e);
	}
}

test();

