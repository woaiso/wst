"use strict";
const node_fetch_1 = require("node-fetch");
const http = require("http");
var HttpsProxyAgent = require('https-proxy-agent');
const cheerio = require("cheerio");
const seed_1 = require("./../seed");
class Video {
    init() {
        const agent = new http.Agent({});
        node_fetch_1.default(seed_1.seed, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
            },
            redirect: 'follow',
            follow: 20,
            timeout: 0,
            compress: true,
            size: 0,
            agent: new HttpsProxyAgent('http://127.0.0.1:1080'),
        })
            .then((res) => {
            return res.text();
        }).then((body) => {
            let $ = cheerio.load(body);
            const channels = $('li');
            channels.each((index, item) => {
                console.log($(item).find('img').attr('src'), index);
            });
        });
    }
}
new Video().init();
