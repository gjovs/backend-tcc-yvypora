export function getDayOfWeek(day: number): string {
  switch (day) {
    case 1:
      return 'Domingo';
    case 2:
      return 'Segunda-Feira';
    case 3:
      return 'Terca-Feira';
    case 4:
      return 'Quarta-Feira';
    case 5:
      return 'Quinta-Feira';
    case 6:
      return 'Sexta-Feira';
    default:
      return 'Sabado';
  }
}

export const getDateFromCurrentHour = (): Date => {
  const now = new Date();
  const hour = now.getHours().toString().padStart(2, '0');
  const dateString = `1900-01-01T${hour}:00:00.000Z`;
  return new Date(dateString);
};

export const groupByMarketer = (objects) => {
  const groupedObjects = objects.shopping_list.products_in_shopping_list.reduce(
    (groups, obj) => {
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
