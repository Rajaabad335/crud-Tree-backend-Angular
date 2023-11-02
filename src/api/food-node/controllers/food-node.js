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
          populate: 'parent',
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
    },
    async deleteNode(ctx) {
      try {
        const { id } = ctx.params;
        console.log("id",id)
        const nodeToDelete = await strapi.entityService.findMany('api::food-node.food-node', {
          populate:'food_nodes',
          filters:{
            id:id
          }
        } );
            for(let i=0;i<nodeToDelete[0].food_nodes.length;i++){
            const delteNode=await strapi.entityService.delete('api::food-node.food-node', nodeToDelete[0].food_nodes[i].id);

            }
        if (!nodeToDelete) {
          return ctx.notFound('Node not found');
        }
        const delteNode=await strapi.entityService.delete('api::food-node.food-node', nodeToDelete[0].id);
        ctx.send({ message: 'Node and its descendants deleted successfully' });
      } catch (error) {
        console.log(error.message);
        ctx.throw(500, 'An error occurred while deleting the node.');
      }
    }

  })
);
