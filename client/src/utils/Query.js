import { DirectusResponse } from "./Models";

function serializeQueryParams(params) {

	let str = [];
	for (let p in params) {
		if (Object.prototype.hasOwnProperty.call(params, p)) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
		}
	}

	return str.join("&");
}

export default class Query {

	static get(url, params) {
		return Query.prepare('GET', url, params);
	}

	static post(url, data, params) {
		return Query.prepare('POST', url, params, data);
	}

	static put(url, data, params) {
		return Query.prepare('PUT', url, params, data);
	}

	static patch(url, data, params) {
		return Query.prepare('PATCH', url, params, data);
	}

	static delete(url, params) {
		return Query.prepare('DELETE', url, params);
	}

	static prepare(method, url, params = {}, data) {

		const headers = {
			"Accept": "application/json",
			"Content-Type": "application/json",
		};

		if (params instanceof Object && Object.keys(params).length > 0) {
			url += '?' + serializeQueryParams(params);
		}

		return fetch('http://localhost:8055' + url, {
			method,
			headers,
			credentials: "same-origin",
			cache: 'no-cache',
			body: JSON.stringify(data)
		}).then(response => {

			if (method === 'DELETE' && response.status >= 200 && response.status <= 299) {
				return true;
			}

			return response.json().then(json => {

				if (response.status < 200 || response.status > 299) {
					let error = new Error();
					error = { ...error, ...json };
					throw error;
				}

				return new DirectusResponse(json, params.single === true);
			});
		});
	}
}
