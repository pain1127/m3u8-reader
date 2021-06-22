'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('../config/common');
const axios = require("axios");
const urlParse = require("url-parse");
const mi = require('mediainfo-wrapper');

/**
 * tsDownload 파일 다운로드 처리
 * @param {String} chunk  chunk object
 * @return {Boolean}
 */

const tsDownload = async (chunk) => {
    try {
        const url = new urlParse(chunk.url);
        // chunk 리스트 반복하며, 각 개별 파일 다운로드 진행
        chunk.items.map((file) => {
            // 파일 스트림 주소
            const fileUrl = path.join(url.origin, file);
            // 저장 경로
            const destination = path.join(config.destination, file);
            download(fileUrl, destination, tsDownloadCallback(chunk, destination, file));
        })
    }
    catch (error) {
        console.log(error);
    }

};

const tsDownloadCallback = (chunk, destination, file) => {
    console.log(destination);
    console.log(file);
}

/**
 * download 파일 다운로드 처리
 * @param {String} url  url
 * @param {String} dest  저장 경로
 * @param {Callback} cb  콜백함수
 * @return {Boolean}
 */

const download = (url, dest, cb) => {
    const file = fs.createWriteStream(dest);
    const request = http.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    }).on('error', function (err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
};

module.exports = {
    tsDownload
};