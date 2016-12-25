import fetch from 'node-fetch';
import * as http from 'http';
var HttpsProxyAgent = require('https-proxy-agent');
import * as cheerio from 'cheerio';
import { seed } from './../../../seed';

class Video {
	init() {
		const agent = new http.Agent({

		})
		fetch(seed, {
			method: 'GET',
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
			},
			redirect: 'follow', // set to `manual` to extract redirect headers, `error` to reject redirect
			follow: 20,         // maximum redirect count. 0 to not follow redirect
			timeout: 0,        // req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies)
			compress: true,    // support gzip/deflate content encoding. false to disable
			size: 0,           // maximum response body size in bytes. 0 to disable
			agent: new HttpsProxyAgent('http://127.0.0.1:1080'),       // http.Agent instance, allows custom proxy, certificate etc.
		})
			.then((res) => {
				return res.text();
			}).then((body) => {
				let $ = cheerio.load(body);
				const channels = $('li');
				channels.each((index, item) => {
					console.log($(item).find('img').attr('src'))
				})
			});
	}
}

new Video().init();
