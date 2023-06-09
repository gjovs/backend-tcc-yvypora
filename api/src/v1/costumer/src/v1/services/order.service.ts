class OrderService {
  groupByMarketer = (objects : any) => {
    const groupedObjects = objects.shopping_list.products_in_shopping_list.reduce(
      (groups: any, obj: any) => {
        const group = obj.product.marketer.name;
        if (!groups[group]) {
          groups[group] = [];
        }
        groups[group].push(obj);
        return groups;
      },
      {}
    );
    return groupedObjects;
  };
}

export default new OrderService();