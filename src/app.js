const hls = require('./middleware/hlsParser.js');
const downloader = require('./middleware/tsDownload.js');

const streamUrl = 'http://192.168.30.200/0.m3u8';

(async () => {
    try {
        // chunk 리스트 가져오기.
        const chunk = await hls.getChucklist(streamUrl);

        // chunk 다운로드 처리.
        const result = await downloader.tsDownload(chunk);
        

        //console.log(result);
    } catch (e) {
        // Deal with the fact the chain failed
    }
})();




