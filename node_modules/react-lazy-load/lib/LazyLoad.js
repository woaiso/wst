'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var _require = require('react-dom');

var findDOMNode = _require.findDOMNode;
var Children = React.Children;
var Component = React.Component;
var PropTypes = React.PropTypes;

var _require2 = require('eventlistener');

var add = _require2.add;
var remove = _require2.remove;

var debounce = require('lodash.debounce');
var throttle = require('lodash.throttle');

var parentScroll = require('./utils/parentScroll');
var inViewport = require('./utils/inViewport');

var LazyLoad = function (_Component) {
  _inherits(LazyLoad, _Component);

  function LazyLoad(props) {
    _classCallCheck(this, LazyLoad);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LazyLoad).call(this, props));

    _this.lazyLoadHandler = _this.lazyLoadHandler.bind(_this);

    if (props.throttle > 0) {
      if (props.debounce) {
        _this.lazyLoadHandler = debounce(_this.lazyLoadHandler, props.throttle);
      } else {
        _this.lazyLoadHandler = throttle(_this.lazyLoadHandler, props.throttle);
      }
    }

    _this.state = { visible: false };
    return _this;
  }

  _createClass(LazyLoad, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var eventNode = this.getEventNode();

      this.lazyLoadHandler();

      if (this.lazyLoadHandler.flush) {
        this.lazyLoadHandler.flush();
      }

      add(window, 'resize', this.lazyLoadHandler);
      add(eventNode, 'scroll', this.lazyLoadHandler);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      if (!this.state.visible) {
        this.lazyLoadHandler();
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(_nextProps, nextState) {
      return nextState.visible;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.lazyLoadHandler.cancel) {
        this.lazyLoadHandler.cancel();
      }

      this.detachListeners();
    }
  }, {
    key: 'getEventNode',
    value: function getEventNode() {
      return parentScroll(findDOMNode(this));
    }
  }, {
    key: 'getOffset',
    value: function getOffset() {
      var _props = this.props;
      var offset = _props.offset;
      var offsetVertical = _props.offsetVertical;
      var offsetHorizontal = _props.offsetHorizontal;
      var offsetTop = _props.offsetTop;
      var offsetBottom = _props.offsetBottom;
      var offsetLeft = _props.offsetLeft;
      var offsetRight = _props.offsetRight;
      var threshold = _props.threshold;

      var _offsetAll = threshold || offset;
      var _offsetVertical = offsetVertical || _offsetAll;
      var _offsetHorizontal = offsetHorizontal || _offsetAll;

      return {
        top: offsetTop || _offsetVertical,
        bottom: offsetBottom || _offsetVertical,
        left: offsetLeft || _offsetHorizontal,
        right: offsetRight || _offsetHorizontal
      };
    }
  }, {
    key: 'lazyLoadHandler',
    value: function lazyLoadHandler() {
      var offset = this.getOffset();
      var node = findDOMNode(this);
      var eventNode = this.getEventNode();

      if (inViewport(node, eventNode, offset)) {
        var onContentVisible = this.props.onContentVisible;

        this.setState({ visible: true });
        this.detachListeners();

        if (onContentVisible) {
          onContentVisible();
        }
      }
    }
  }, {
    key: 'detachListeners',
    value: function detachListeners() {
      var eventNode = this.getEventNode();

      remove(window, 'resize', this.lazyLoadHandler);
      remove(eventNode, 'scroll', this.lazyLoadHandler);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var children = _props2.children;
      var className = _props2.className;
      var height = _props2.height;
      var width = _props2.width;
      var visible = this.state.visible;

      var elStyles = { height: height, width: width };
      var elClasses = 'LazyLoad' + (visible ? ' is-visible' : '') + (className ? ' ' + className : '');

      return React.createElement(
        'div',
        { className: elClasses, style: elStyles },
        visible && Children.only(children)
      );
    }
  }]);

  return LazyLoad;
}(Component);

LazyLoad.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  debounce: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  offset: PropTypes.number,
  offsetBottom: PropTypes.number,
  offsetHorizontal: PropTypes.number,
  offsetLeft: PropTypes.number,
  offsetRight: PropTypes.number,
  offsetTop: PropTypes.number,
  offsetVertical: PropTypes.number,
  threshold: PropTypes.number,
  throttle: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onContentVisible: PropTypes.func
};

LazyLoad.defaultProps = {
  debounce: true,
  offset: 0,
  offsetBottom: 0,
  offsetHorizontal: 0,
  offsetLeft: 0,
  offsetRight: 0,
  offsetTop: 0,
  offsetVertical: 0,
  throttle: 250
};

module.exports = LazyLoad;