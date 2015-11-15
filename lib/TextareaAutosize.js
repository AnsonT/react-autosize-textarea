'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _autosize = require('autosize');

var _autosize2 = _interopRequireDefault(_autosize);

var UPDATE = 'autosize:update',
    DESTROY = 'autosize:destroy',
    RESIZED = 'autosize:resized';

var TextareaAutosize = _react2['default'].createClass({
  displayName: 'TextareaAutosize',

  propTypes: {
    onResize: _react2['default'].PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      rows: 1
    };
  },

  componentDidMount: function componentDidMount() {
    _autosize2['default'](_reactDom2['default'].findDOMNode(this.refs.textarea));
    if (this.props.onResize) {
      _reactDom2['default'].findDOMNode(this.refs.textarea).addEventListener(RESIZED, this.props.onResize);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.props.onResize) {
      _reactDom2['default'].findDOMNode(this.refs.textarea).removeEventListener(RESIZED, this.props.onResize);
    }
    this.dispatchEvent(DESTROY);
  },

  dispatchEvent: function dispatchEvent(EVENT_TYPE, defer) {
    var _this = this;

    var event = document.createEvent('Event');
    event.initEvent(EVENT_TYPE, true, false);
    var dispatch = function dispatch() {
      return _reactDom2['default'].findDOMNode(_this.refs.textarea).dispatchEvent(event);
    };
    if (defer) {
      setTimeout(dispatch);
    } else {
      dispatch();
    }
  },

  getValue: function getValue(props) {
    if (props) {
      return props.valueLink ? props.valueLink.value : props.value;
    }
  },

  render: function render() {
    return _react2['default'].createElement(
      'textarea',
      _extends({}, this.props, { ref: 'textarea' }),
      this.props.children
    );
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.getValue(nextProps) !== this.getValue(this.props)) {
      this.dispatchEvent(UPDATE, true);
    }
  }

});

exports['default'] = TextareaAutosize;
module.exports = exports['default'];