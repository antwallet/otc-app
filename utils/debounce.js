export class Debounce {
	constructor() {
		this.timeout = null;
	}

	use(fn, wait = 1000) {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			fn();
		}, wait);
	}
}