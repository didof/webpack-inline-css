const { loadCSS } = require('./loaders');

module.exports = (env) => {
	const loaders = {
		css: (i) => {
			switch (i) {
				case 'inline':
					return loadCSS()
				default:
					throw new Error('production is not implemented yet');
			}
		},
	};

	// developer interface
	const instructions = {
		css: {
			development: 'inline',
			production: null,
		},
	};

	// business logic
	let message = '[useRules] ';
	const rules = Object.entries(instructions).map(([key, value]) => {
		const i = instructions[key][env];
		message += key + '|' + i;
		return loaders[key](i);
	});

	console.info(message);
	return { rules };
};
