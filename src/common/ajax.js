/**
 * author: zhuqingguang
 * date: 2017/01/09
 * description: 封装了 jQuery 的 ajax 请求方法
 */
import { address, baseUrl } from './config';
 /**
 * Ajax请求
 *
 * @param {String} option.url
 * @param {Object} option.data
 * @param {Function} option.success
 * @param {Function} [option.fail]
 */
function ajax (option) {
    if (!(option.url.startsWith(address) || option.url.startsWith('http'))) {
        // 如果请求的 api 不是以服务器地址为开头
        option.url = baseUrl + option.url;
    }
    $.ajax({
        url: option.url,
        data: option.data,
        type: 'post',
        dataType: 'json',
        success: option.success
    });
}

export default ajax;