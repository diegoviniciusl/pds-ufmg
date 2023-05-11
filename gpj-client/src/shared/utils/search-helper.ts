type SearchableTypes = string | number;

const isSearchable = (value: any) => (['string', 'number'].includes(typeof value));

const getFilteredRecordsBySearchTerm = <ModelSchema>(records: ModelSchema[], partialMatchKeys: (keyof ModelSchema)[], fullMatchKeys: (keyof ModelSchema)[], searchTerm: string) => {
  if (searchTerm === '' || searchTerm === undefined || searchTerm === null) return records;

  const standardizedSearchTerm = searchTerm.toLocaleLowerCase();

  const keys: (keyof ModelSchema)[] = partialMatchKeys.concat(fullMatchKeys);

  return records.filter((record) => keys.some((key) => {
    if (!isSearchable(record[key])) return false;

    const standardizedRecordValue = (record[key] as SearchableTypes).toString().toLocaleLowerCase();
    if (partialMatchKeys.includes(key)) return standardizedRecordValue.includes(standardizedSearchTerm);

    return standardizedRecordValue === standardizedSearchTerm;
  }));
};

const searchHelper = {
  getFilteredRecordsBySearchTerm,
};

export default searchHelper;
