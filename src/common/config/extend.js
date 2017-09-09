const view = require('think-view');
const model = require('think-model');
const websocket = require('think-websocket');

module.exports = [
    view,                   // make application support view
    model(think.app),
    websocket(think.app),
];
