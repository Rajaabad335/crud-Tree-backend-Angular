'use strict';

/**
 * food-node router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::food-node.food-node');
