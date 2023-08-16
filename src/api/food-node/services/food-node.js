'use strict';

/**
 * food-node service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::food-node.food-node');
