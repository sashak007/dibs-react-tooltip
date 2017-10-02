Usage:
```
const Tooltip = require('dibs-react-tooltip');
require('dibs-react-tooltip/dist/main.css'); // to include default styles

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
tooltipDirection: 		PropTypes.oneOf(['top', 'bottom', 'left', 'right']),	// TODO: adjust position if the tooltip doesn't fit when left/right is used
lockDirection:                  PropTypes.bool,

// Whether to render the tooltip
isVisible: 				PropTypes.bool,

// Whether to show triangle, close, shadow
hasTriangle:            PropTypes.bool,
hasClose:               PropTypes.bool,
hasShadow:              PropTypes.bool,

// These can be used to override the default local styles
containerClass: 		PropTypes.string,
triangleClass:          PropTypes.string,
closeClass: 			PropTypes.string,

// Determines if debounce is needed for visibility animations
debounce:               PropTypes.number,

// The height of the triangle arrow of the tooltip
triangleSize: 			PropTypes.number,

// Determines at what point the tooltip will flip to the opposite direction
// 		For example, if tooltipDirection=top and positionThresholds.top=60, the direction
//		will become bottom once the top of the tooltip is less than 60px from the top of
//		the window
positionThresholds: 	PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number
}),

// Handler for when the tooltip is clicked
onClick:                PropTypes.func,
onCloseClick: 			PropTypes.func,

// Handler for when a position threshold is crossed and the direction changes
onThresholdPassed: 		PropTypes.func
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