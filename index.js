'use strict';

var assign = require('object-assign');
var process = require('process');

module.exports = function (source) {

  var localConfig = {
    name: process.env.npm_package_name || '',
    version: process.env.npm_package_version || '',
    description: process.env.npm_package_description || ''
  };
  Object.keys(process.env)
    .filter(function (envkey) {
      return envkey.lastIndexOf('npm_package_config_', 0) === 0;
    })
    .forEach(function (key) {
      localConfig[key.replace('npm_package_config_', '')] = process.env[key];
    });

  return JSON.stringify(assign({}, JSON.parse(source), localConfig));
};