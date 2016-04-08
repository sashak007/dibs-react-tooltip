Usage:
```
const Tooltip = require('dibs-react-tooltip');


render() {
	return (
		<Tooltip isVisible>
			I'm a tooltip!
		</Tooltip>
	)
}
```

Props:
```
// Determines the initial position of the tooltip relative to rootPosition
tooltipDirection: 		React.PropTypes.oneOf(['top', 'bottom', 'left', 'right']),	// TODO: adjust position if the tooltip doesn't fit when left/right is used

// Whether to render the tooltip
isVisible: 				React.PropTypes.bool,

// Whether to show triangle, close
hasTriangle:            React.PropTypes.bool,
hasClose:               React.PropTypes.bool,

// These can be used to override the default local styles
containerClass: 		React.PropTypes.string,
triangleClass:          React.PropTypes.string,
closeClass: 			React.PropTypes.string,

// The height of the triangle arrow of the tooltip
triangleSize: 			React.PropTypes.number,

// Determines at what point the tooltip will flip to the opposite direction
// 		For example, if tooltipDirection=top and positionThresholds.top=60, the direction
//		will become bottom once the top of the tooltip is less than 60px from the top of
//		the window
positionThresholds: 	React.PropTypes.shape({
    top: React.PropTypes.number,
    bottom: React.PropTypes.number,
    left: React.PropTypes.number,
    right: React.PropTypes.number
}),

// Handler for when the tooltip is clicked
onClick:                React.PropTypes.func,
onCloseClick: 			React.PropTypes.func,

// Handler for when a position threshold is crossed and the direction changes
onThresholdPassed: 		React.PropTypes.func
```


Building:
```
npm install
npm run build
```

This will transpile all the ES6, JSX, and [local styles](https://github.com/webpack/css-loader) to `dist/Tooltip.js`.

Tests:
```
npm run test
```