export default class ServerError {

	constructor(vm, error, options) {

		this.title = error.title || 'General Error';

		if (error.message instanceof Array) {
			this.desc = '<pre>' + JSON.stringify(error.message, null, 2).trim() + '</pre>';
		} else  if (error.trace) {
			this.desc = '<pre>' + JSON.stringify(error.trace, null, 2).trim() + '</pre>';
		} else {
			this.desc = error.message.toLowerCase();
		}

		this.options = options;
	}
}
