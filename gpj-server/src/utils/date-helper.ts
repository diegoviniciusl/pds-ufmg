import dayjs from 'dayjs';

export const getStartOfDay = (date: Date): Date => {
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

export const getEndOfDay = (date: Date): Date => {
  date.setUTCHours(23, 59, 59, 999);
  return date;
};

export const getDateFromDateTime = (date: Date): string => date.toISOString().split('T')[0];

export const getCurrentDate = () => new Date(dayjs().format().split('T')[0]);

export const formatDate = (date: Date | string) => dayjs(date).format('DD/MM/YYYY');

export const formatDateTime = (date: Date | string) => dayjs(date).format('DD/MM/YYYY HH:mm:ss');
