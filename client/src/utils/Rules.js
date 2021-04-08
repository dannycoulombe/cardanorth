export default class Rules {

	static required(value = '') {
		return !!value;
	}

	static email(value = '') {
		//eslint-disable-next-line
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(value).toLowerCase());
	}

	static min(min = 8, value = '') {
		return value && value.length >= min || false;
	}

	static max(min = 16, value = '') {
		return value && value.length <= min || false;
	}

	static identical(value = '', compare = '') {
		return value === compare;
	}

	static code(value = '') {
		return !!value;
	}
}
