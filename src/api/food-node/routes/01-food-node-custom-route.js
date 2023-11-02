module.exports = {
  routes: [
        {
            method: "GET",
            path: "/food-nodes/create-food-nodes",
            handler: "food-node.createNestedTree",
        },
        {
          method: "DELETE",
          path: "/food-nodes/:id",
          handler: "food-node.deleteNode",
      }
    ]
}
