import dayjs, { Dayjs } from 'dayjs';

const getStandardizedDate = (date: Dayjs | string | null) => dayjs(date).format('YYYY-MM-DD');

const getLocaleDate = (date: string) => new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

const getLocaleDateWithHours = (date: string) => new Date(date).toLocaleDateString('pt-BR', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'UTC',
});

const dateHelper = {
  getStandardizedDate,
  getLocaleDate,
  getLocaleDateWithHours,
};

export default dateHelper;
