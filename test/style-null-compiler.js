/*
This file is necessary to run the tests under Mocha since the component requires a local css file which fails if webpack isn't used.
Therefore, as per a stackoverflow comment here http://stackoverflow.com/questions/32683440/handle-webpack-css-imports-when-testing-with-mocha
we just return an empty object whenever something requires a css file
 */

'use strict';

function noop() {
    return {};
}

require.extensions['.css'] = noop;
