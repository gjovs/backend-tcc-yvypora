import moment from 'moment-timezone';

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

export const getHourInSpTz = (): string => {
  const now = moment();
  // config tz in sp
  now.tz('America/Sao_Paulo')

  return now.format('HH')
}

export const getDayInSpTz = (): number => {
  const now = moment();
  // config tz in sp
  now.tz('America/Sao_Paulo')
  return now.day() + 1 
}

export const getDateFromCurrentHour = (): Date => {
  const hour = getHourInSpTz()
  const dateString = `1900-01-01T${hour}:00:00.000Z`;
  return moment.utc(dateString).toDate();
};