'use strict';
const axios = require("axios");

/**
 * m3u8 url의 ts 리스트 확인
 * @param {String} url  스트리밍 URL
 * @return {Array}
 */

const getChucklist = async (url) => {

    let tsObj = {};
    const result = await axios.get(url, { validateStatus: false });
    tsObj.url = url;
    if(result.status == 200)
    {
        if(result.data !== '')
        {
            const tsList = result.data.split('\n').reduce((pre, cur, index) => {
                
                // media seq find
                if(cur.includes('#EXT-X-MEDIA-SEQUENCE'))
                {
                    tsObj.squence = cur.split(':')[1];
                }

                // console.log(cur);
                if(!cur.includes('#EXT') && cur !== '')
                {
                    pre.push(cur);
                }

                return pre;
            }, []);

            tsObj.items = tsList;

        }
        return tsObj;
    }  else {
        return tsObj;
    }
};

module.exports = {
    getChucklist
};