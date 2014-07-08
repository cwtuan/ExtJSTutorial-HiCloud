var loadJS = function(url) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	head.appendChild(script);
};

var addDomEventListener = function(dom, eventName, fn, options) {
	options = options || {};
	if (dom.attachEvent) { // for IE9-
		dom.attachEvent('on' + eventName, fn);
	} else {
		dom.addEventListener(eventName, fn, options.capture || false);
	}
};

var removeDomEventListener = function(dom, eventName, fn, options) {
	options = options || {};
	if (dom.detachEvent) { // for IE9-
		dom.detachEvent('on' + eventName, fn);
	} else {
		dom.removeEventListener(eventName, fn, options.capture || false);
	}
};

// String Operations
if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function(str) {
		return str.length > 0 && this.substring(0, str.length) === str;
	};
};

if (typeof String.prototype.endsWith != 'function') {
	String.prototype.endsWith = function(str) {
		return str.length > 0 && this.substring(this.length - str.length, this.length) === str;
	};
};