// @ts-nocheck
'use strict';

/**
 * food-node controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::food-node.food-node',
  ({strapi}) => ({
    async createNestedTree(ctx) {
      try {

        const entries = await strapi.entityService.findMany('api::food-node.food-node', {
          populate: '*',
        });
        const entryMap = {};
        entries.forEach(entry => {
          entryMap[entry.id] = {
            id: entry.id,
            name: entry.name,
            parentId: entry.parent ? entry.parent.id : null,
            children: [],
          };
        });
        const nestedData = [];
        entries.forEach(entry => {
          if (!entry.parent) {
            nestedData.push(entryMap[entry.id]);
          } else {
            entryMap[entry.parent.id].children.push(entryMap[entry.id]);
          }
        });

        ctx.body = { nestedData };

      } catch (error) {
        console.log(error.message)
      }
    }

  })
);
