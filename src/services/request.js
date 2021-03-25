import axios from 'axios';
import { Message } from '@alicloud/console-components';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import errorCode from './errorCode';
import cache from '@/utils/storage';

const TOKEN = 'token';
const TENANT_ID = 'skyview-tenant-id';
const PROJECT_ID = 'skyview-project-id';
const ROLE_ID = 'skyview-role-id';
const DC_ID = 'skyview-dc-id';
// To add to window  解决promise 在ie中未定义的问题
if (!window.Promise) {
	window.Promise = Promise;
}

NProgress.configure({
	minimum: 0.1,
	easing: 'ease',
	speed: 800,
	showSpinner: false
});

axios.interceptors.request.use(
	(config) => {
		NProgress.start();
		config.headers.Authorization = `${cache.getLocal(TOKEN)}`;
		config.headers[TENANT_ID] = `${cache.getSession(TENANT_ID)}`;
		config.headers[PROJECT_ID] = `${cache.getSession(PROJECT_ID)}`;
		config.headers[ROLE_ID] = `${cache.getSession(ROLE_ID)}`;
		config.headers[DC_ID] = `${cache.getSession(DC_ID)}`;
		return config;
	},
	(err) => {
		NProgress.done();
		return Promise.reject(err);
	}
);

// http response 拦截器
axios.interceptors.response.use(
	(response) => {
		NProgress.done();
		return response;
	},
	(err) => {
		NProgress.done();
		err.message =
			errorCode[err?.response?.status] || `${err?.response?.data?.data}`;
		Message.show({
			type: 'error',
			title: <div>错误</div>,
			content: (
				<div className="message-box">
					<p>{err.message}</p>
				</div>
			),
			duration: 10000,
			align: 'tr tr',
			closeable: true,
			offset: [-24, 24]
		});
		return Promise.reject(err);
	}
);

/**
 * _get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} option [请求配置]
 * @param {String} method [请求方法]
 * @return {Promise}
 */
function _get(url, params = {}, option = {}, method = 'GET') {
	return new Promise((resolve, reject) => {
		const { restUrl, data } = restfulAPI(url, params);
		let options = {
			url: restUrl,
			params: data,
			method,
			...option
		};
		axios(options)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err.data);
			});
	});
}

function _delete(url, params = {}, option = {}) {
	return _get(url, params, option, 'DELETE');
}

/**
 * _post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} option [请求配置]
 * @param {String} method [请求方法]
 */
function _post(url, params = {}, option = {}, method = 'POST') {
	return new Promise((resolve, reject) => {
		const { restUrl, data } = restfulAPI(url, params);
		let options = {
			url: restUrl,
			data,
			method,
			headers: {
				'Content-Type':
					'application/x-www-form-urlencoded;charset=UTF-8'
			},
			...option
		};
		axios(options)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err.data);
			});
	});
}

function _put(url, params = {}, option = {}) {
	return _post(url, params, option, 'PUT');
}

/**
 * _json方法
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} option [请求配置]
 * @param {String} method [请求方法]
 */
function _json(url, params = {}, option = {}, method) {
	return new Promise((resolve, reject) => {
		const { restUrl, data } = restfulAPI(url, params);
		let options = {
			url: restUrl,
			data,
			method,
			headers: {
				'Content-type': 'application/json;charset=UTF-8'
			},
			...option
		};
		axios(options)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err.data);
			});
	});
}

/**
 * _json方法
 * @param {String} url [请求的url地址]
 * @return {Boolean} method [请求方法]
 */
const isRestful = (url) => {
	return url.indexOf('{') > -1;
};

/**
 * _json方法
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} option [请求配置]
 * @param {String} method [请求方法]
 */
const restfulAPI = function (url, formData) {
	if (!url) throw new Error('url不能为空');
	let restfulUrl = url;
	const newFormData = Array.isArray(formData)
		? [...formData]
		: { ...formData };
	if (isRestful(url) && formData) {
		const restfulArray = url.split('/');
		restfulUrl = restfulArray
			.map((item) => {
				if (item.indexOf('{') !== -1) {
					const key = item.substring(1, item.length - 1);
					delete newFormData[key];
					return formData[key] || '';
				}
				return item;
			})
			.join('/');
	}
	return { restUrl: restfulUrl, data: newFormData };
};

export default {
	get: _get,
	delete: _delete,
	post: _post,
	put: _put,
	json: _json,
	restfulAPI: restfulAPI
};
