/**
 * 单元测试
 */
import Video from './../video';
import { fetchWithProxy } from './../fetch';
describe('fetch video and extract', () => {
  const video = new Video();
  const url = '';

  it('extract Article has text', () => {
    fetchWithProxy(url).then((html) => {
      const postMessage = video.extractArticle(html, { url: url });
      expect(postMessage.id).toBe(3201231);
    });
  });
});
