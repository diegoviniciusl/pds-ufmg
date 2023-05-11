import { SELECT_EMPTY_VALUE } from './constants';

const setEmptyStringsToNull = <ModelSchema extends { [s: string]: unknown; }>(obj: ModelSchema): ModelSchema => Object.fromEntries(
  Object.entries(obj).map(([key, value]) => [key, value === '' ? null : value]),
) as ModelSchema;

const setEmptyStringsToUndefined = <ModelSchema>(obj: {}): ModelSchema => Object.fromEntries(
  Object.entries(obj).map(([key, value]) => [key, value === '' ? undefined : value]),
) as ModelSchema;

const setUndefinedStringsToFalse = <ModelSchema>(obj: {}): ModelSchema => Object.fromEntries(
  Object.entries(obj).map(([key, value]) => [key, value === undefined ? false : value]),
) as ModelSchema;

const setNullToEmptyStrings = <ModelSchema>(obj: {}): ModelSchema => Object.fromEntries(
  Object.entries(obj).map(([key, value]) => [key, value === null ? '' : value]),
) as ModelSchema;

const getUndefinedFromEmptyString = (value: any) => {
  if (typeof value === 'string' && value.length === 0) return undefined;
  return value;
};

const getNullFromEmptyString = (value: any) => {
  if (typeof value === 'string' && value.length === 0) return null;
  return value;
};

const getEmptyStringFromUndefined = (value: any) => {
  if (!value) return '';
  return value;
};

const getSelectDefaultValue = <SelectPropsType = string>(selectRecords: any[], defaultValue: SelectPropsType): string | SelectPropsType => {
  if (selectRecords.length === 0) return SELECT_EMPTY_VALUE;

  return defaultValue;
};

const formHelper = {
  setEmptyStringsToNull,
  setEmptyStringsToUndefined,
  setUndefinedStringsToFalse,
  getUndefinedFromEmptyString,
  getEmptyStringFromUndefined,
  getNullFromEmptyString,
  getSelectDefaultValue,
  setNullToEmptyStrings,
};

export default formHelper;
