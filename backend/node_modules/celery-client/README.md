# celery-client

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

A Celery client for node.

Supported Brokers and Backends.
- Redis

### Quick Example:
```javascript
var celery = require('celery-client');

var broker  = new celery.RedisHandler('redis://:password@localhost:6379/0');
var backend = new celery.RedisHandler('redis://:password@localhost:6379/1');
var celeryClient = new celery.Client(broker, backend);

var args   = [1, 2, 3];
var kwargs = {'key': 'value'};
var taskOptions = {
  eta      : Date.now() + 3000,
  retries  : 3,
  timeLimit: 5,
}
celeryClient.putTask('your-celery-project.task', args, kwargs, taskOptions,
  function(err, taskId) {
    console.log('Task >', taskId);
  },
  function(err, result) {
    console.log('Result >', result);
    process.exit();
  }
);
```

### Task option list
- id
  - Task ID
- eta
  - Task ETA
- expires
  - Task expires
- retries
  - Task retry times
- expires
  - Task expires
- timeLimit
  - Task time limit (in seconds)
- softTimeLimit
  - Task time limit (soft, in seconds)
- origin
  - Task sender name
- priority
  - Task priority (0 ~ 255, 0 is the lowest)
- queue
  - Target queue

### Install:
```shell
npm install celery-client
```

### TODO

- RabbitMQ support

### License
[MIT](LICENSE)

[downloads-image]: http://img.shields.io/npm/dm/celery-client.svg

[npm-url]: https://npmjs.org/package/celery-client
[npm-image]: http://img.shields.io/npm/v/celery-client.svg
