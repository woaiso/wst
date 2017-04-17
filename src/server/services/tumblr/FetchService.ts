/**
 * 数据抓取服务
 */
//基础库
import tumblr from './API';
const db = require('monk')('localhost/wst');
const blogCollection = db.get('blogs');
const postsCollection = db.get('posts');


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

interface BlogPostOptions {
	limit: number
	offset: number
}

export default class FetchService {
	client: any
	init() {
		if (this.client === null || this.client === undefined) {
			this.client = tumblr.createClient({
				consumer_key: 'CUNchAUJJA0xnZP0Wbb491ZCW4raIYeC8egzPUZZtIAhfmGbZh',
				consumer_secret: 'Pmod34vwIIQy12OA7TjTZt11QYsrBypZJUw0Nkit8xNH6EMXxd',
				token: 'nNlOLjYmFv9seb3HBUh6qWtQuSyBgAvEliSltD59JJqNu8tqv5',
				token_secret: 'ap7c8WNcyVTwxrB1RnNWHkmCE4HADv4aZzM14cbpg4Wvcf4H9t'
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

	async getPosts(blogInfo: BlogInfo, options: BlogPostOptions) {
		this.client.blogPosts(blogInfo.name, (error: Error, data: { posts: any[] }) => {
			if (error) {
				console.log(error);
			} else {
				console.log(data.posts[0]);
				postsCollection.insert(data.posts);
			}
		})
	}
	async fetchBlogPost(blogInfo: BlogInfo) {
		return new Promise((resolve, reject) => {
			const page = 1;
			const pageSize = 20;
			const maxPage = Math.ceil(blogInfo.total_posts / pageSize);
			for (let i = 0; i < maxPage; i++) {
				this.getPosts(blogInfo, { limit: 20, offset: i * pageSize })
			}
		});

	}

	async getBlogsFromDB() {
		const data: BlogInfo[] = await blogCollection.find();
		for (let i = 0; i < data.length; i++) {
			console.log(data[i])
			await this.fetchBlogPost(data[i]);
		}
	}
}


async function test() {
	let services = new FetchService();
	services.init();
	try {
		// let userInfo = await services.getUserInfo();
		const blogInfo = new BlogInfo();
		blogInfo.name = 'iamsoeasytocum';
		blogInfo.total_posts = 1116;
		// services.fetchBlogPost(blogInfo);
		services.getBlogsFromDB();
		// services.storeFollowingBlogs(userInfo);
	} catch (e) {
		console.log(e);
	}
}

test();

