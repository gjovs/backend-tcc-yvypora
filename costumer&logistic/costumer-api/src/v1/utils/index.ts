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

