"use strict";

var React = require('react');
var ReactDOM = require('react-dom');

var Radial = React.createClass({
    propTypes: {
        width: React.PropTypes.number,
        maxValue: React.PropTypes.number,
        currentPos: React.PropTypes.shape({
            x: React.PropTypes.number,
            y: React.PropTypes.number
        }),
        onChange: React.PropTypes.func
    },

    getInitialState: function () {
        return {
            radius: 0,
            x: 0,
            y: 0
        };
    },

    componentWillMount: function () {
        var radius = 100 / 2,
            x, y;
        if (this.props.width) {
            radius = this.props.width / 2;
        }

        if (this.props.currentPos) {
            var maxValue = this.props.maxValue ? this.props.maxValue : this.state.radius * 2;
            x = (this.props.currentPos.x / maxValue + 1) * radius;
            y = (this.props.currentPos.y / maxValue + 1) * radius;
        } else {
            x = radius;
            y = radius;
        }

        this.setState({
            radius: radius,
            x: x,
            y: y
        });
    },
    componentWillReceiveProps: function (newProps) {
        if (newProps.width != this.props.width) {
            this.setState({
                radius: newProps.width / 2
            });
        }
    },

    elmPos: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
    },

    onMouseDown: function (evt) {
        this.elmPos = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.setPoint(evt.clientX, evt.clientY);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    },
    onMouseMove: function (evt) {
        this.setPoint(evt.clientX, evt.clientY);
    },
    onMouseUp: function (evt) {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    },

    setPoint: function (clientX, clientY) {
        var x = clientX - this.elmPos.left,
            y = clientY - this.elmPos.top;

        var diffx = x - this.state.radius,
            diffy = y - this.state.radius,
            angle = Math.atan2(diffy, diffx),
            boundx = this.state.radius + this.state.radius * Math.cos(angle),
            boundy = this.state.radius + this.state.radius * Math.sin(angle);

        if ((x > boundx && x > this.state.radius) || (x < boundx && x < this.state.radius)) {
            x = boundx;
        }
        if ((y > boundy && y > this.state.radius) || (y < boundy && y < this.state.radius)) {
            y = boundy;
        }

        this.setState({
            x: x,
            y: y
        });

        var maxValue = this.props.maxValue ? this.props.maxValue : this.state.radius * 2,
            actualx = maxValue * (x / this.state.radius - 1),
            roundedx = Math.round(actualx * 100) / 100,
            actualy = maxValue * (y / this.state.radius - 1),
            roundedy = Math.round(actualy * 100) / 100;

        this.props.onChange(roundedx, roundedy);
    },

    render: function () {
        var radialStyle = {
            position: 'relative',
            width: this.props.width + 'px',
            height: this.props.width + 'px',
            borderRadius: this.state.radius + 'px'
        };
        var pointStyle = {
            position: 'absolute',
            top: this.state.y + 'px',
            left: this.state.x + 'px'
        };

        return (
            <div
                className="react-radial"
                style={radialStyle}
                onMouseDown={this.onMouseDown}>
                <div className="center"></div>
                <div className="point" style={pointStyle}></div>
            </div>
        );
    }
});

module.exports = Radial;