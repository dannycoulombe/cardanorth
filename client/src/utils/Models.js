export class DirectusResponse {

	constructor(props = {}, single = false) {
		this.data = single ? props : [];
		this.meta = {
			filter_count: 0,
			total_count: 0,
		};
		Object.assign(this, props);
	}
}
