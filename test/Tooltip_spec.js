'use strict';

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const Tooltip = require('../Tooltip');
const {expect} = require('chai');
const sinon = require('sinon');

describe('Tooltip', () => {
    let renderer;
    let component;
    let props;

    beforeEach(() => {
        renderer = TestUtils.createRenderer();
    });

    describe('If the tooltip is not visible', () => {
        it('should not render the tooltip', () => {
            renderer.render(React.createElement(Tooltip, props));
            component = renderer.getRenderOutput();

            expect(component.props.children).to.be.null;
        });
    });

    describe('If the tooltip is visible', () => {

        beforeEach(() => {
            props = Object.assign({
                isVisible: true
            }, props);
            const children = React.DOM.div('tooltip contents');
            renderer.render(React.createElement(Tooltip, props, children));
            component = renderer.getRenderOutput();
        });

        it('should render the tooltip', () => {
            const tooltip = component.props.children;
            expect(tooltip.type).to.equal('div');

            const inner = tooltip.props.children[0];
            const triangle = tooltip.props.children[1];

            expect(inner.type).to.equal('div');
            expect(triangle.type).to.equal('svg');
        });
    });

    describe('Updating the component', () => {

        let elementRect;
        let rootRect;
        let tooltip;
        let mockedTooltip;
        let stub;

        beforeEach(() => {

            elementRect = {
                top: 30,
                left: 10,
                height: 100,
                width: 100
            };
            rootRect = {
                top: 200,
                left: 0,
                height: 0,
                width: 0
            };

            props = Object.assign({
                isVisible: true,
                tooltipDirection: 'top',
                positionThresholds: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10
                },
                triangleSize: 10,
                onThresholdPassed: () => {},
                getBounds: () => ({top:0, left: 0, right: 500, bottom: 500})
            }, props);

            tooltip = new Tooltip(props);
            mockedTooltip = sinon.mock(tooltip);

            stub = sinon.stub(tooltip, 'setState', state => {
                tooltip.state = Object.assign({}, tooltip.state, state);
            });

            mockedTooltip.expects('_getElementsPositions').returns({elementRect, rootRect});
        });

        it('should display on top if the tooltip fits on the screen', () => {
            tooltip._adjustPosition();

            expect(tooltip.state.moved).to.equal(true);
            expect(tooltip.state.tooltipDirection).to.equal('top');
            expect(tooltip.state.flippedFrom).to.equal(null);
        });

        it('should flip from the top to the bottom if the tooltip passes the top threshold', () => {
            elementRect.top = 10;
            rootRect.top = 20;

            tooltip._adjustPosition();

            expect(tooltip.state.moved).to.equal(false);
            expect(tooltip.state.tooltipDirection).to.equal('bottom');
            expect(tooltip.state.flippedFrom).to.equal('top');
        });

        it('should flip from the left to the right if the tooltip passes the left threshold', () => {
            elementRect.left = 10;
            rootRect.left = 20;
            tooltip.state.tooltipDirection = 'left';

            tooltip._adjustPosition();

            expect(tooltip.state.moved).to.equal(false);
            expect(tooltip.state.tooltipDirection).to.equal('right');
            expect(tooltip.state.flippedFrom).to.equal('left');
        });

    });

});
