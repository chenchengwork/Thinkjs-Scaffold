/**
 * Created by chencheng on 17-7-20.
 */
'use strict';

const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const file = require('async-file');
const queryString = require('querystring');

/**
 * 获取响应内容
 * @param status
 * @param data
 * @param msg
 * @returns {{status: boolean, data: *, msg: string}}
 */
const returnResult = (status = true, data = null, msg = null) => {
    msg = msg || status ? "request success" : "request failed";

    return {
        status,
        data,
        msg
    }
};

/**
 * 处理异常
 * @param {Object} error
 */
const handleException = (error) => {

    //已发送请求，同时也收到回应
    if (error.response) {
        return error.response.data
    }
    //已发送请求，但没有收到回应
    else if (error.request) {
        return error.request;
    }
    // Something happened in setting up the request that triggered an Error
    else {
        return error.message;
    }
};

module.exports = class extends think.Service {

    /**
     * curl get
     *
     * @param {String} url
     * @param {Object} params
     * @param {Object} options
     * @returns {Promise.<*>}
     */
    async get(url,params = {}, options = {}) {

        options = Object.assign({
            method:'get',
            url,
            params,
        },options);

        return await axios(options).then((resp) => {
            return returnResult(true, resp.data);
        }).catch(e => returnResult(false,handleException(e)));
    }

    /**
     * curl post (default Content-Type:application/x-www-form-urlencoded)
     *
     * @param {String} url
     * @param {Object} params
     * @param {Object} options
     * @returns {Promise.<*>}
     */
    async post(url, params = {}, options = {}) {

        options = Object.assign({
            method: "post",
            url,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: queryString.stringify(params),
        },options);

        return await axios(options).then((resp) => {
            return returnResult(true, resp.data);
        }).catch(e => returnResult(false,handleException(e)));
    };


    /**
     * curl post (default Content-Type:application/json)
     *
     * @param {String} url
     * @param {Object} params
     * @param {Object} options
     * @returns {Promise.<*>}
     */
    async postJson(url, params = {}, options = {}) {

        options = Object.assign({
            method: 'post',
            url,
            headers: {
                "Content-Type": 'application/json'
            },
            data: params
        },options);

        return await axios(options).then((resp) => {
            return returnResult(true, resp.data);
        }).catch(e => returnResult(false,handleException(e)));
    };

    /**
     * restful delete
     * @param {String} url
     * @param {Object} params
     * @param {Object} options
     * @returns {Promise}
     */
    async del(url,params = {},options = {}) {
        options = Object.assign({
            url,
            method:'delete',
            data:params,
            headers:{
                "Content-Type":'application/json'
            }
        },options)

        return await axios(options).then((resp) => {
            return returnResult(true, resp.data);
        }).catch(e => returnResult(false,handleException(e)));
    }


    /**
     * restful put
     * @param {String} url
     * @param {Object} params
     * @param {Object} options
     * @returns {Promise}
     */
    async put(url,params = {},options = {}) {
        options = Object.assign({
            url,
            method:'put',
            data:params,
            headers:{
                "Content-Type":'application/json'
            }
        },options)

        return await axios(options).then((resp) => {
            return returnResult(true, resp.data);
        }).catch(e => returnResult(false,handleException(e)));
    }


    /**
     * upload file (default Content-Type:multipart/form-data)
     * 支持多文件上传
     *
     * @param {String} url
     * @param {Object} params {file1:"文件路径",...}
     * @returns {Promise.<*>}
     *
     * usage:
     *  const resp = await restClient.upload("http://localhost:3001/homeDisposeUpload",{
        file1:__dirname + '/../static/img/meinv1.jpg',
        file2:__dirname + '/../static/img/meinv2.jpg',
        field1:"test"
    });
     */
    async upload(url, params) {
        if (!params) {
            return returnResult(false, null, "parameter does not exist");
        }

        let form = new FormData();

        for (let [k, v] of Object.entries(params)) {
            if (await file.exists(v)) {
                form.append(k, fs.createReadStream(v));
            } else {
                form.append(k, v);
            }
        }

        const headers = form.getHeaders();

        return await axios.post(url, form, {headers}).then((resp) => {
            return returnResult(true, resp.data);
        }).catch(e => returnResult(false,handleException(e)));
    }

    /**
     * upload file (default Content-Type:application/octet-stream)
     *
     * @param url
     * @param filePath
     * @param options
     * @returns {Promise.<*>}
     */
    async uploadBinary(url, filePath, options = {}){

        options = Object.assign({
            method: 'post',
            url:url,
            data: fs.createReadStream(filePath),
            headers: {
                "Content-Type": "application/octet-stream",
            },
        },options);

        return await axios(options).then((resp) => {

            return returnResult(true, resp.data, "request success");

        }).catch(e => returnResult(false,handleException(e)));
    }


}
