import fetch from 'node-fetch';
var HttpsProxyAgent = require('https-proxy-agent');
var URL  = require('url');

export const fetchWithProxy = (url) => {
	url = URL.parse(url);
	return fetch(url, {
		method: 'GET',
		headers: {
			'Host': url.host,
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
			'Referer': url,
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
			'Accept-Encoding': 'gzip, deflate, sdch'
		},
		redirect: 'manual', // set to `manual` to extract redirect headers, `error` to reject redirect
		follow: 20,         // maximum redirect count. 0 to not follow redirect
		timeout: 0,        // req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies)
		compress: true,    // support gzip/deflate content encoding. false to disable
		size: 0,           // maximum response body size in bytes. 0 to disable
		agent: new HttpsProxyAgent('http://127.0.0.1:1080'),       // http.Agent instance, allows custom proxy, certificate etc.
	}).then((res) => {
		return res.text();
	})
}

