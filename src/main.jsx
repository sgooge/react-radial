"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var Radial = require('./reactRadial.jsx');

var Main = React.createClass({
    getInitialState: function () {
        return {
            radialx: 30,
            radialy: 30
        }
    },
    onRadialChange: function (x, y) {
        this.setState({
            radialx: x,
            radialy: y
        });
    },

    render: function () {
        return (
            <div>
                <Radial
                    width={300}
                    maxValue={255}
                    currentPos={{x: this.state.radialx, y: this.state.radialy}}
                    onChange={this.onRadialChange} />
                <div>Output: {this.state.radialx}, {this.state.radialy}</div>
            </div>
        );
    }
});

ReactDOM.render(<Main />, document.getElementById('app'));