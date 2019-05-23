
/** @file httpsprovider.js
 * @authors:
 *   jongseok lee <aristos@hanmail.net>
 * @date 2018
 */

var errors = require('./errors');

// browser
if (typeof window !== 'undefined' && window.XMLHttpRequest) {
    XMLHttpRequest = window.XMLHttpRequest; // jshint ignore: line
// node
} else {
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; // jshint ignore: line
}

var XHR2 = require('xhr2'); // jshint ignore: line

const http = require('http');
const https = require('https');
/**
 * HttpProvider should be used to send rpc calls over http
 */
var HttpsProvider = function (host, key, cert, ca, rejectUnauthorized, timeout, user, password) {
    this.host = host || 'http://localhost:8545';
    this.timeout = timeout || 0;
    this.user = user;
    this.password = password;
    this.key = key;
    this.cert = cert;
    this.ca =  ca;
    this.rejectUnauthorized = rejectUnauthorized;
};

/**
 * Should be called to prepare new XMLHttpRequest
 *
 * @method prepareRequest
 * @param {Boolean} true if request should be async
 * @return {XMLHttpRequest} object
 */
HttpsProvider.prototype.prepareRequest = function (async) {

    XHR2.XMLHttpRequest.prototype.setClientTLS = function (key, cert, ca, rejectUnauthorized){
        this._key = key;
        this._cert = cert;
        this._ca = ca;
        this._rejectUnauthorized = rejectUnauthorized;
    };


    XHR2.XMLHttpRequest.prototype._sendHxxpRequest = function() {
        var agent, hxxp, request;
//        console.log ("clientKey : " + this._clientKey + ", clientCert : " + this._clientCert);
        if (this._url.protocol === 'http:') {
            hxxp = http;
            agent = this.nodejsHttpAgent;
        } else {
            hxxp = https;
            agent = this.nodejsHttpsAgent;
        }
        request = hxxp.request({
            hostname: this._url.hostname,
            port: this._url.port,
            path: this._url.path,
            auth: this._url.auth,
            method: this._method,
            headers: this._headers,
            key: this._key,
            cert: this._cert,
            ca : this._ca,
            rejectUnauthorized : this._rejectUnauthorized,
            agent: agent
        });
        this._request = request;
        if (this.timeout) {
            request.setTimeout(this.timeout, (function(_this) {
                return function() {
                    return _this._onHttpTimeout(request);
                };
            })(this));
        }
        request.on('response', (function(_this) {
            return function(response) {
                return _this._onHttpResponse(request, response);
            };
        })(this));
        request.on('error', (function(_this) {
            return function(error) {
                return _this._onHttpRequestError(request, error);
            };
        })(this));
        this.upload._startUpload(request);
        if (this._request === request) {
            this._dispatchProgress('loadstart');
        }
        return void 0;
    };

    var request;

    if (async) {
        request = new XHR2();
        request.timeout = this.timeout;

        request.setClientTLS(this.key , this.cert, this.ca, this.rejectUnauthorized);

    } else {
        request = new XMLHttpRequest();
    }

    request.open('POST', this.host, async);
    if (this.user && this.password) {
        var auth = 'Basic ' + new Buffer(this.user + ':' + this.password).toString('base64');
        request.setRequestHeader('Authorization', auth);
    } request.setRequestHeader('Content-Type', 'application/json');
    return request;
};

/**
 * Should be called to make sync request
 *
 * @method send
 * @param {Object} payload
 * @return {Object} result
 */
HttpsProvider.prototype.send = function (payload) {
    var request = this.prepareRequest(false);

    try {
        request.send(JSON.stringify(payload));
    } catch (error) {
        throw errors.InvalidConnection(this.host);
    }

    var result = request.responseText;

    try {
        result = JSON.parse(result);
    } catch (e) {
        throw errors.InvalidResponse(request.responseText);
    }

    return result;
};

/**
 * Should be used to make async request
 *
 * @method sendAsync
 * @param {Object} payload
 * @param {Function} callback triggered on end with (err, result)
 */
HttpsProvider.prototype.sendAsync = function (payload, callback) {
    var request = this.prepareRequest(true);

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.timeout !== 1) {
            var result = request.responseText;
            var error = null;

            try {
                result = JSON.parse(result);
            } catch (e) {
                error = errors.InvalidResponse(request.responseText);
            }

            callback(error, result);
        }
    };

    request.ontimeout = function () {
        callback(errors.ConnectionTimeout(this.timeout));
    };

    try {
        request.send(JSON.stringify(payload));
    } catch (error) {
        callback(errors.InvalidConnection(this.host));
    }
};

/**
 * Synchronously tries to make Http request
 *
 * @method isConnected
 * @return {Boolean} returns true if request haven't failed. Otherwise false
 */
HttpsProvider.prototype.isConnected = function () {
    try {
        this.send({
            id: 9999999999,
            jsonrpc: '2.0',
            method: 'net_listening',
            params: []
        });
        return true;
    } catch (e) {
        return false;
    }
};

module.exports = HttpsProvider;

