/*!
 * https://www.npmjs.com/package/tumblr.js
 *
 * <3 always,
 *     Tumblr
 */

/**
 * @namespace tumblr
 */

import request from './fetch';

import * as qs from 'query-string';
import {
	get,
	set,
	keys,
	intersection,
	extend,
	reduce,
	partial,
	zipObject,
	isString,
	isFunction,
	isArray,
	isPlainObject,
	omit
} from 'lodash';

const CLIENT_VERSION = '1.0.0';
const API_BASE_URL = 'https://api.tumblr.com/v2';

var API_METHODS = {
	GET: {
        /**
         * Gets information about a given blog
         *
         * @method blogInfo
         *
         * @param  {string} blogIdentifier - blog name or URL
         * @param  {Object} [params] - optional data sent with the request
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		blogInfo: '/blog/:blogIdentifier/info',

        /**
         * Gets the avatar URL for a blog
         *
         * @method blogAvatar
         *
         * @param  {string} blogIdentifier - blog name or URL
         * @param  {number} [size] - avatar size, in pixels
         * @param  {Object} [params] - optional data sent with the request
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		blogAvatar: '/blog/:blogIdentifier/avatar/:size',

        /**
         * Gets the likes for a blog
         *
         * @method blogLikes
         *
         * @param  {string} blogIdentifier - blog name or URL
         * @param  {Object} [params] - optional data sent with the request
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		blogLikes: '/blog/:blogIdentifier/likes',

        /**
         * Gets the followers for a blog
         *
         * @method blogLikes
         *
         * @param  {string} blogIdentifier - blog name or URL
         * @param  {Object} [params] - optional data sent with the request
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		blogFollowers: '/blog/:blogIdentifier/followers',

        /**
         * Gets a list of posts for a blog
         *
         * @method blogPosts
         *
         * @param  {string} blogIdentifier - blog name or URL
         * @param  {string} [type] - filters returned posts to the specified type
         * @param  {Object} [params] - optional data sent with the request
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @memberof TumblrClient
         */
		blogPosts: '/blog/:blogIdentifier/posts/:type',

        /**
         * Gets the queue for a blog
         *
         * @method blogQueue
         *
         * @param  {string} blogIdentifier - blog name or URL
         * @param  {Object} [params] - optional data sent with the request
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		blogQueue: '/blog/:blogIdentifier/posts/queue',

        /**
         * Gets the drafts for a blog
         *
         * @method blogDrafts
         *
         * @param  {string} blogIdentifier - blog name or URL
         * @param  {Object} [params] - optional data sent with the request
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		blogDrafts: '/blog/:blogIdentifier/posts/draft',

        /**
         * Gets the submissions for a blog
         *
         * @method blogSubmissions
         *
         * @param  {string} blogIdentifier - blog name or URL
         * @param  {Object} [params] - optional parameters sent with the request
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		blogSubmissions: '/blog/:blogIdentifier/posts/submission',

        /**
         * Gets information about the authenticating user and their blogs
         *
         * @method userInfo
         *
         * @param  {Object} [params] - optional parameters sent with the request
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		userInfo: '/user/info',

        /**
         * Gets the dashboard posts for the authenticating user
         *
         * @method userDashboard
         *
         * @param  {Object} [params] - optional parameters sent with the request
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		userDashboard: '/user/dashboard',

        /**
         * Gets the blogs the authenticating user follows
         *
         * @method userFollowing
         *
         * @param  {Object} [params] - optional parameters sent with the request
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		userFollowing: '/user/following',

        /**
         * Gets the likes for the authenticating user
         *
         * @method userLikes
         *
         * @param  {Object} [params] - optional parameters sent with the request
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		userLikes: '/user/likes',

        /**
         * Gets posts tagged with the specified tag
         *
         * @method taggedPosts
         *
         * @param  {string} [tag] - tag to search for
         * @param  {Object} [params] - optional parameters sent with the request
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		taggedPosts: ['/tagged', ['tag']],
	},

	POST: {
        /**
         * Creates a post on the given blog.
         * See the {@link https://www.tumblr.com/docs/api/v2#posting|API docs} for more information
         * about the parameters accepted.
         *
         * @method createPost
         *
         * @param  {string} blogIdentifier - blog name or URL
         * @param  {Object} params - parameters sent with the request
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		createPost: '/blog/:blogIdentifier/post',

        /**
         * Edits a given post
         *
         * @method editPost
         *
         * @param  {string} blogIdentifier - blog name or URL
         * @param  {Object} params - parameters sent with the request
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		editPost: '/blog/:blogIdentifier/post/edit',

        /**
         * Edits a given post
         *
         * @method reblogPost
         *
         * @param  {string} blogIdentifier - blog name or URL
         * @param  {Object} params - parameters sent with the request
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		reblogPost: '/blog/:blogIdentifier/post/reblog',

        /**
         * Edits a given post
         *
         * @method deletePost
         *
         * @param  {string} blogIdentifier - blog name or URL
         * @param  {Object} params - parameters sent with the request
         * @param  {Object} params.id - ID of the post to delete
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		deletePost: ['/blog/:blogIdentifier/post/delete', ['id']],

        /**
         * Follows a blog as the authenticating user
         *
         * @method followBlog
         *
         * @param  {Object} params - parameters sent with the request
         * @param  {Object} params.url - URL of the blog to follow
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		followBlog: ['/user/follow', ['url']],

        /**
         * Unfollows a blog as the authenticating user
         *
         * @method unfollowBlog
         *
         * @param  {Object} params - parameters sent with the request
         * @param  {Object} params.url - URL of the blog to unfollow
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		unfollowBlog: ['/user/unfollow', ['url']],

        /**
         * Likes a post as the authenticating user
         *
         * @method likePost
         *
         * @param  {Object} params - parameters sent with the request
         * @param  {Object} params.id - ID of the post to like
         * @param  {Object} params.reblog_key - Reblog key for the post ID
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		likePost: ['/user/like', ['id', 'reblog_key']],

        /**
         * Unlikes a post as the authenticating user
         *
         * @method unlikePost
         *
         * @param  {Object} params - parameters sent with the request
         * @param  {Object} params.id - ID of the post to unlike
         * @param  {Object} params.reblog_key - Reblog key for the post ID
         * @param  {TumblrClient~callback} [callback] - invoked when the request completes
         *
         * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
         *
         * @memberof TumblrClient
         */
		unlikePost: ['/user/unlike', ['id', 'reblog_key']],
	},
};

/**
 * Turns a blog name to a full blog URL
 *
 * @param  {string} blogUrl - blog name or URL
 *
 * @return {string} full blog URL
 *
 * @private
 */
function forceFullBlogUrl(blogUrl) {
	if (blogUrl.indexOf('.') < 0) {
		blogUrl += '.tumblr.com';
	}
	return blogUrl;
}

/**
 * Creates a named function with the desired signature
 *
 * @param  {string} name - function name
 * @param  {Array} [args] - array of argument names
 * @param  {Function} fn - function that contains the logic that should run
 *
 * @return {Function} a named function that takes the desired arguments
 *
 * @private
 */
function createFunction(name, args, fn) {
	if (isFunction(args)) {
		fn = args;
		args = [];
	}

	return new Function('body',
		'return function ' + name + '(' + args.join(', ') + ') { return body.apply(this, arguments); };'
	)(fn);
}

/**
 * Take a callback-based function and returns a Promise instead
 *
 * @param  {Function} requestMethod - callback-based method to promisify
 *
 * @return {Function} function that returns a Promise that resolves with the response body or
 *         rejects with the error message
 *
 * @private
 */
function promisifyRequest(requestMethod) {
	return function (apiPath, params, callback) {
		var promise = new Promise(function (resolve, reject) {
			requestMethod.call(this, apiPath, params, (err, resp) => {
				if (err) {
					reject(err);
				} else {
					resolve(resp);
				}
			});
		});
		if (callback) {
			promise
				.then((body) => {
					callback(null, body);
				})
				.catch((err) => {
					callback(err, null);
				});
		}

		return promise;
	};
}

/**
 * Wraps a function for use as a request callback
 *
 * @param  {TumblrClient~callback} callback - function to wrap
 *
 * @return {TumblrClient~callback} request callback
 *
 * @private
 */
function requestCallback(callback) {
	if (!callback) {
		return undefined;
	}

	return function (err, response, body) {
		if (err) {
			return callback(err, null, response);
		}

		if (response.statusCode >= 400) {
			var errString = body.meta ? body.meta.msg : body.error;
			return callback(new Error('API error: ' + response.statusCode + ' ' + errString), null, response);
		}

		if (body && body.response) {
			return callback(null, body.response, response);
		} else {
			return callback(new Error('API error (malformed API response): ' + body), null, response);
		}
	};
}

/**
 * Make a get request
 *
 * @param  {Function} requestGet - function that performs a get request
 * @param  {Object} credentials - OAuth credentials
 * @param  {string} baseUrl - base URL for the request
 * @param  {string} apiPath - URL path for the request
 * @param  {Object} requestOptions - additional request options
 * @param  {Object} params - query parameters
 * @param  {TumblrClient~callback} callback - request callback
 *
 * @return {Request} Request object
 *
 * @private
 */
function getRequest(requestGet, credentials, baseUrl, apiPath, requestOptions, params, callback) {
	params = params || {};

	if (credentials.consumer_key) {
		params.api_key = credentials.consumer_key;
	}

	return requestGet(extend({
		url: baseUrl + apiPath + '?' + qs.stringify(params),
		oauth: credentials,
		json: true,
	}, requestOptions), requestCallback(callback));
}

/**
 * Create a function to make POST requests to the Tumblr API
 *
 * @param  {Function} requestPost - function that performs a get request
 * @param  {Object} credentials - OAuth credentials
 * @param  {string} baseUrl - base URL for the request
 * @param  {string} apiPath - URL path for the request
 * @param  {Object} requestOptions - additional request options
 * @param  {Object} params - form data
 * @param  {TumblrClient~callback} callback - request callback
 *
 * @return {Request} Request object
 *
 * @private
 */
function postRequest(requestPost, credentials, baseUrl, apiPath, requestOptions, params, callback) {
	params = params || {};

	// Sign without multipart data
	var currentRequest = requestPost(extend({
		url: baseUrl + apiPath,
		oauth: credentials,
	}, requestOptions), function (err, response, body) {
		try {
			body = JSON.parse(body);
		} catch (e) {
			body = {
				error: 'Malformed Response: ' + body,
			};
		}
		requestCallback(callback)(err, response, body);
	});

	// Sign it with the non-data parameters
	var dataKeys = ['data'];
	currentRequest.form(omit(params, dataKeys));
	currentRequest.oauth(credentials);

	// Clear the side effects from form(param)
	delete currentRequest.headers['content-type'];
	delete currentRequest.body;

	// And then add the full body
	var form = currentRequest.form();
	for (var key in params) {
		form.append(key, params[key]);
	}

	// Add the form header back
	extend(currentRequest.headers, form.getHeaders());

	return currentRequest;
}

/**
 * Adds a request method to the client
 *
 * @param  {Object} client - add the method to this object
 * @param  {string} methodName - the name of the method
 * @param  {string} apiPath - the API route, which uses any colon-prefixed segments as arguments
 * @param  {Array} paramNames - ordered list of required request parameters used as arguments
 * @param  {String|Function} requestType - the request type or a function that makes the request
 *
 * @private
 */
function addMethod(client, methodName, apiPath, paramNames, requestType) {
	var apiPathSplit = apiPath.split('/');
	var apiPathParamsCount = apiPath.split(/\/:[^\/]+/).length - 1;

	var buildApiPath = function (args) {
		var pathParamIndex = 0;
		return reduce(apiPathSplit, function (apiPath, apiPathChunk, _i) {
			// Parse arguments in the path
			if (apiPathChunk === ':blogIdentifier') {
				// Blog URLs are special
				apiPathChunk = forceFullBlogUrl(args[pathParamIndex++]);
			} else if (apiPathChunk[0] === ':') {
				apiPathChunk = args[pathParamIndex++];
			}

			if (apiPathChunk) {
				return apiPath + '/' + apiPathChunk;
			} else {
				return apiPath;
			}
		}, '');
	};

	var namedParams = (apiPath.match(/\/:[^\/]+/g) || []).map((param) => {
		return param.substr(2);
	}).concat(paramNames, 'params', 'callback');

	function methodBody() {
		var argsLength = arguments.length;
		var args = new Array(argsLength);
		for (var i = 0; i < argsLength; i++) {
			args[i] = arguments[i];
		}

		var requiredParamsStart = apiPathParamsCount;
		var requiredParamsEnd = requiredParamsStart + paramNames.length;
		var requiredParamArgs = args.slice(requiredParamsStart, requiredParamsEnd);

		// Callback is at the end
		var callback = isFunction(args[args.length - 1]) ? args.pop() : null;

		// Required Parmas
		var params = zipObject(paramNames, requiredParamArgs);
		extend(params, isPlainObject(args[args.length - 1]) ? args.pop() : {});

		// Path arguments are determined after required parameters
		var apiPathArgs = args.slice(0, apiPathParamsCount);

		var request = requestType;
		if (isString(requestType)) {
			request = requestType.toUpperCase() === 'POST' ? client.postRequest : client.getRequest;
		} else if (!isFunction(requestType)) {
			request = client.getRequest;
		}
		return request.call(client, buildApiPath(apiPathArgs), params, callback);
	};

	set(client, methodName, createFunction(methodName, namedParams, methodBody));
}

/**
 * Adds methods to the client
 *
 * @param  {TumblrClient} client - an instance of the `tumblr.js` API client
 * @param  {Object} methods - mapping of method names to endpoints. Endpoints can be a string or an
 *         array of format `[apiPathString, requireParamsArray]`
 * @param  {String|Function} requestType - the request type or a function that makes the request
 *
 * @private
 */
function addMethods(client, methods, requestType) {
	var apiPath, paramNames;
	for (var methodName in methods) {
		apiPath = methods[methodName];
		if (isString(apiPath)) {
			paramNames = [];
		} else if (isPlainObject(apiPath)) {
			paramNames = apiPath.paramNames || [];
			apiPath = apiPath.path;
		} else {
			paramNames = apiPath[1] || [];
			apiPath = apiPath[0];
		}
		addMethod(client, methodName, apiPath, paramNames, requestType || 'GET');
	}
}

/**
 * Wraps createPost to specify `type` and validate the parameters
 *
 * @param  {string} type - post type
 * @param  {Function} [validate] - returns `true` if the parameters validate
 *
 * @return {Function} wrapped function
 *
 * @private
 */
function wrapCreatePost(type, validate) {
	return function (blogIdentifier, params, callback) {
		params = extend({ type: type }, params);

		if (isArray(validate)) {
			validate = partial(function (params, requireKeys) {
				if (requireKeys.length) {
					var keyIntersection = intersection(keys(params), requireKeys);
					if (requireKeys.length === 1 && !keyIntersection.length) {
						throw new Error('Missing required field: ' + requireKeys[0]);
					} else if (!keyIntersection.length) {
						throw new Error('Missing one of: ' + requireKeys.join(', '));
					} else if (keyIntersection.length > 1) {
						throw new Error('Can only use one of: ' + requireKeys.join(', '));
					}
				}
				return true;
			}, params, validate);
		}

		if (isFunction(validate)) {
			if (!validate(params)) {
				throw new Error('Error validating parameters');
			}
		}

		if (arguments.length > 2) {
			return this.createPost(blogIdentifier, params, callback);
		} else {
			return this.createPost(blogIdentifier, params);
		}
	};
}

/**
 * Creates a Tumblr API client using the given options
 *
 * @param  {Object} [options] - client options
 * @param  {Object} [options.credentials] - OAuth credentials
 * @param  {string} [options.baseUrl] - API base URL
 * @param  {Object} [options.request] - library to use for making requests
 *
 * @constructor
 */

class TumblrClient {
	version: string
	credentials
	baseUrl
	request: any
	requestOptions: any
	createTextPost: any
	createPhotoPost: any
	createLinkPost: any
	createQuotePost: any
	createChatPost: any
	createAudioPost: any
	createVideoPost: any
	constructor(options) {
		// Support for `TumblrClient(credentials, baseUrl, requestLibrary)`
		if (arguments.length > 1) {
			options = {
				credentials: arguments[0],
				baseUrl: arguments[1],
				request: arguments[2],
				returnPromises: false,
			};
		}

		options = options || {};

		this.version = CLIENT_VERSION;
		this.credentials = get(options, 'credentials', omit(options, 'baseUrl', 'request'));
		this.baseUrl = get(options, 'baseUrl', API_BASE_URL);
		this.request = get(options, 'request', request);
		this.requestOptions = {
			followRedirect: false,
			headers: {
				'User-Agent': 'tumblr.js/' + CLIENT_VERSION,
			},
		};

		this.addGetMethods(API_METHODS.GET);
		this.addPostMethods(API_METHODS.POST);

		/**
		 * Creates a text post on the given blog
		 *
		 * @see {@link https://www.tumblr.com/docs/api/v2#ptext-posts|API docs}
		 *
		 * @method createTextPost
		 *
		 * @param  {string} blogIdentifier - blog name or URL
		 * @param  {Object} params - parameters sent with the request
		 * @param  {string} [params.title] - post title text
		 * @param  {string} params.body - post body text
		 * @param  {TumblrClient~callback} [callback] - invoked when the request completes
		 *
		 * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
		 *
		 * @memberof TumblrClient
		 */
		this.createTextPost = wrapCreatePost('text', ['body']);

		/**
		 * Creates a photo post on the given blog
		 *
		 * @see {@link https://www.tumblr.com/docs/api/v2#pphoto-posts|API docs}
		 *
		 * @method createPhotoPost
		 *
		 * @param  {string} blogIdentifier - blog name or URL
		 * @param  {Object} params - parameters sent with the request
		 * @param  {string} params.source - image source URL
		 * @param  {Stream|Array} params.data - an image or array of images
		 * @param  {string} params.data64 - base64-encoded image data
		 * @param  {string} [params.caption] - post caption text
		 * @param  {TumblrClient~callback} [callback] - invoked when the request completes
		 *
		 * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
		 *
		 * @memberof TumblrClient
		 */
		this.createPhotoPost = wrapCreatePost('photo', ['data', 'data64', 'source']);

		/**
		 * Creates a quote post on the given blog
		 *
		 * @see {@link https://www.tumblr.com/docs/api/v2#pquote-posts|API docs}
		 *
		 * @method createQuotePost
		 *
		 * @param  {string} blogIdentifier - blog name or URL
		 * @param  {Object} params - parameters sent with the request
		 * @param  {string} params.quote - quote text
		 * @param  {string} [params.source] - quote source
		 * @param  {TumblrClient~callback} [callback] - invoked when the request completes
		 *
		 * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
		 *
		 * @memberof TumblrClient
		 */
		this.createQuotePost = wrapCreatePost('quote', ['quote']);

		/**
		 * Creates a link post on the given blog
		 *
		 * @see {@link https://www.tumblr.com/docs/api/v2#plink-posts|API docs}
		 *
		 * @method createLinkPost
		 *
		 * @param  {string} blogIdentifier - blog name or URL
		 * @param  {Object} params - parameters sent with the request
		 * @param  {string} [params.title] - post title text
		 * @param  {string} params.url - the link URL
		 * @param  {string} [params.thumbnail] - the URL of an image to use as the thumbnail
		 * @param  {string} [params.excerpt] - an excerpt from the page the link points to
		 * @param  {string} [params.author] - the name of the author of the page the link points to
		 * @param  {string} [params.description] - post caption text
		 * @param  {TumblrClient~callback} [callback] - invoked when the request completes
		 *
		 * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
		 *
		 * @memberof TumblrClient
		 */
		this.createLinkPost = wrapCreatePost('link', ['url']);

		/**
		 * Creates a chat post on the given blog
		 *
		 * @see {@link https://www.tumblr.com/docs/api/v2#pchat-posts|API docs}
		 *
		 * @method createLinkPost
		 *
		 * @param  {string} blogIdentifier - blog name or URL
		 * @param  {Object} params - parameters sent with the request
		 * @param  {string} [params.title] - post title text
		 * @param  {string} params.conversation - chat text
		 * @param  {TumblrClient~callback} [callback] - invoked when the request completes
		 *
		 * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
		 *
		 * @memberof TumblrClient
		 */
		this.createChatPost = wrapCreatePost('chat', ['conversation']);

		/**
		 * Creates a photo post on the given blog
		 *
		 * @see {@link https://www.tumblr.com/docs/api/v2#paudio-posts|API docs}
		 *
		 * @method createAudioPost
		 *
		 * @param  {string} blogIdentifier - blog name or URL
		 * @param  {Object} params - parameters sent with the request
		 * @param  {string} params.external_url - image source URL
		 * @param  {Stream} params.data - an audio file
		 * @param  {string} [params.caption] - post caption text
		 * @param  {TumblrClient~callback} [callback] - invoked when the request completes
		 *
		 * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
		 *
		 * @memberof TumblrClient
		 */
		this.createAudioPost = wrapCreatePost('audio', ['data', 'data64', 'external_url']);

		/**
		 * Creates a photo post on the given blog
		 *
		 * @see {@link https://www.tumblr.com/docs/api/v2#pvideo-posts|API docs}
		 *
		 * @method createVideoPost
		 *
		 * @param  {string} blogIdentifier - blog name or URL
		 * @param  {Object} params - parameters sent with the request
		 * @param  {string} params.embed - embed code or a video URL
		 * @param  {Stream} params.data - a video file
		 * @param  {string} [params.caption] - post caption text
		 * @param  {TumblrClient~callback} [callback] - invoked when the request completes
		 *
		 * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
		 *
		 * @memberof TumblrClient
		 */
		this.createVideoPost = wrapCreatePost('video', ['data', 'data64', 'embed']);

		// Enable Promise mode
		if (get(options, 'returnPromises', false)) {
			this.returnPromises();
		}
	}
	/**
	 * Performs a GET request
	 *
	 * @param  {string} apiPath - URL path for the request
	 * @param  {Object} params - query parameters
	 * @param  {TumblrClient~callback} [callback] - request callback
	 *
	 * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
	 */
	getRequest = (apiPath, params, callback) => {
		if (isFunction(params)) {
			callback = params;
			params = {};
		}
		return getRequest(this.request.get, this.credentials, this.baseUrl, apiPath, this.requestOptions, params, callback);
	};

	/**
	 * Performs a POST request
	 *
	 * @param  {string} apiPath - URL path for the request
	 * @param  {Object} params - form parameters
	 * @param  {TumblrClient~callback} [callback] - request callback
	 *
	 * @return {Request|Promise} Request object, or Promise if {@link returnPromises} was used
	 */
	postRequest = (apiPath, params, callback) => {
		if (isFunction(params)) {
			callback = params;
			params = {};
		}
		return postRequest(this.request.post, this.credentials, this.baseUrl, apiPath, this.requestOptions, params, callback);
	};

	/**
	 * Sets the client to return Promises instead of Request objects by patching the `getRequest` and
	 * `postRequest` methods on the client
	 */
	returnPromises = () => {
		this.getRequest = promisifyRequest(this.getRequest);
		this.postRequest = promisifyRequest(this.postRequest);
	};

	/**
	 * Adds GET methods to the client
	 *
	 * @param  {Object} methods - mapping of method names to endpoints
	 */
	addGetMethods = (methods) => {
		addMethods(this, methods, 'GET');
	};

	/**
	 * Adds POST methods to the client
	 *
	 * @param  {Object} methods - mapping of method names to endpoints
	 */
	addPostMethods = (methods) => {
		addMethods(this, methods, 'POST');
	};
}


/**
 * Handles the response from a client reuest
 *
 * @callback TumblrClient~callback
 * @param {?Error} err - error message
 * @param {?Object} resp - response body
 * @param {?string} [response] - raw response
 */

/*
 * Please, enjoy our luxurious exports.
 */

class Tumblr {
	/**
     * Passthrough for the {@link TumblrClient} class
     *
     * @memberof tumblr
     * @see {@link TumblrClient}
     */
	Client: TumblrClient

    /**
     * Creates a Tumblr Client
     *
     * @param  {Object} [options] - client options
     * @param  {Object} [options.credentials] - OAuth credentials
     * @param  {string} [options.baseUrl] - API base URL
     * @param  {Object} [options.request] - library to use for making requests
     *
     * @return {TumblrClient} {@link TumblrClient} instance
     *
     * @memberof tumblr
     * @see {@link TumblrClient}
     */
	createClient = (options): TumblrClient => {
		// Support for `TumblrClient(credentials, baseUrl, requestLibrary)`
		if (arguments.length > 1) {
			options = {
				credentials: arguments[0],
				baseUrl: arguments[1],
				request: arguments[2],
				returnPromises: false,
			};
		}

		// Create the Tumblr Client
		var client = new TumblrClient(options);

		return client;
	}
}
export default new Tumblr();
