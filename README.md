Usage:
```
const Tooltip = require('dibs-react-tooltip');


render() {
	return (
		<Tooltip isVisible={true} rootPosition={{x: 50, y: 50}}>
			I'm a tooltip!
		</Tooltip>
	)
}
```

Building:
```
npm build
```

This will transpile all the ES6, JSX, and [local styles](https://github.com/webpack/css-loader) to `dist/Tooltip.js`.