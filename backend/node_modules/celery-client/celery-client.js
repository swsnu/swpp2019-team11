'use strict';

var uuid = require('uuid');

var DEFAULT_QUEUE = 'default';

var nope = function() {};

var canonicalizeTaskOptions = function(taskOptions) {
  taskOptions = taskOptions || {};

  // Canonicalize header
  taskOptions.id = (taskOptions.id || uuid.v4()).toString();

  taskOptions.eta = taskOptions.eta
                  ? new Date(taskOptions.eta).toISOString()
                  : null
  taskOptions.expires = taskOptions.expires
                  ? new Date(taskOptions.expires).toISOString()
                  : null

  taskOptions.retries = parseInt(taskOptions.retries || 0);

  taskOptions.timeLimit     = taskOptions.timeLimit     || null;
  taskOptions.softTimeLimit = taskOptions.softTimeLimit || null;

  taskOptions.origin = taskOptions.origin || null;

  // Canonicalize properties
  taskOptions.priority = taskOptions.priority || 0;
  taskOptions.queue    = taskOptions.queue    || DEFAULT_QUEUE;

  taskOptions.deliveryMode = 2;
  taskOptions.deliveryTag = uuid.v4();

  return taskOptions;
};

/**
 * Celery Client
 * @param {Object} brokerHandler                           - Broker handler
 * @param {Object} backendHandler                          - Backend handler
 * @param {Object} defaultTaskOptions                      - Default task options
 * @param {Object} [defaultTaskOptions.id=uuid.v4()]       - Task ID
 * @param {Object} [defaultTaskOptions.eta=null]           - Task ETA
 * @param {Object} [defaultTaskOptions.expires=null]       - Task expires
 * @param {Object} [defaultTaskOptions.retries=0]          - Task retry times
 * @param {Object} [defaultTaskOptions.timeLimit=null]     - Task time limit (in seconds)
 * @param {Object} [defaultTaskOptions.softTimeLimit=null] - Task time limit (soft, in seconds)
 * @param {Object} [defaultTaskOptions.origin=null]        - Task sender name
 * @param {Object} [defaultTaskOptions.priority=null]      - Task priority (0 ~ 255, 0 is the lowest)
 * @param {Object} [defaultTaskOptions.queue='celery']     - Target queue
 */
function Client(brokerHandler, backendHandler, defaultTaskOptions) {
  var self = this;

  self._brokerHandler      = brokerHandler;
  self._backendHandler     = backendHandler;
  self._defaultTaskOptions = canonicalizeTaskOptions(defaultTaskOptions) || {};

  if (self._brokerHandler)  self.broker  = self._brokerHandler._handler;
  if (self._backendHandler) self.backend = self._backendHandler._handler;
};

Client.prototype.putTask = function(name, args, kwargs, taskOptions, callback, onResultCallback) {
  var self = this;

  args        = args   || [];
  kwargs      = kwargs || {};
  taskOptions = canonicalizeTaskOptions(taskOptions) || {};

  var mergedTaskOptions = JSON.parse(JSON.stringify(self._defaultTaskOptions));
  Object.assign(mergedTaskOptions, taskOptions);

  self._backendHandler.onResult(mergedTaskOptions.id, onResultCallback || nope);
  self._brokerHandler.putTask(name, args, kwargs, mergedTaskOptions, callback || nope);
};

Client.prototype.getResult = function(taskId, callback) {
  var self = this;

  self._backendHandler.getResult(taskId, callback || nope);
};

Client.prototype.onResult = function(taskId, callback) {
  var self = this;

  self._backendHandler.onResult(taskId, callback || nope);
};

Client.prototype.listQueued = function(queue, callback) {
  var self = this;

  queue = queue || DEFAULT_QUEUE;
  self._brokerHandler.listQueued(queue, callback || nope);
};

Client.prototype.listScheduled = function(callback) {
  var self = this;

  self._brokerHandler.listScheduled(callback || nope);
};

Client.prototype.listRecent = function(callback) {
  var self = this;

  self._backendHandler.listRecent(callback || nope);
};

exports.Client = Client;

exports.RedisHandler = require('./handlers/redisHandler');