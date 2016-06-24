"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var Radial = require('./reactRadial.jsx');

ReactDOM.render(<Radial width={300} maxValue={255} />, document.getElementById('app'));