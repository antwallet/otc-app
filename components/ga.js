// /components/ga.js
export default {
	mounted() {
		// this.initGA();
	},
	methods: {
		initGA() {
			// 判断当前平台是否为H5
			// if (process.env.NODE_ENV === 'development' && uni.getSystemInfoSync().platform === 'ios') {
			const script = document.createElement('script');
			script.async = true;
			script.src = 'https://www.googletagmanager.com/gtag/js?id=G-711T4X1X8B';
			document.head.appendChild(script);

			window.dataLayer = window.dataLayer || [];

			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());
			gtag('config', 'G-711T4X1X8B');
		}
	}
};