'use strict';

var API 				= require('../api')
	, UrlPattern	= require('url-pattern');

var endpoints	= {
  ticker	: new UrlPattern('/ticker'),
  tobtc   : new UrlPattern('/tobtc?value=:value&currency=:currency')
};

var api = new API(endpoints);

module.exports = {
	getTicker	: getTicker,
	toBTC			: toBTC
};

function getTicker(options) {
	options = options || {};
	return api.request('ticker', {})
		.then(function (data) { return data[options.currency] || data; });
}

function toBTC(amount, currency) {
	return api.request('tobtc', { value: amount, currency: currency })
		.then(function (amount) { return amount.replace(',', ''); });
}