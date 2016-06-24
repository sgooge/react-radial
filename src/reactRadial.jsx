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

    getInitialState: function (){
        return {
            radius: 0,
            x: 0,
            y: 0
        };
    },

    componentWillMount: function () {
        var radius = 100 / 2;
        if(this.props.width) {
            radius = this.props.width / 2;
        }

        this.setState({
            radius: radius
        });
    },
    componentWillReceiveProps: function (newProps) {
        if(newProps.width != this.props.width) {
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
        this.setState({
            x: clientX - this.elmPos.left,
            y: clientY - this.elmPos.top
        });
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