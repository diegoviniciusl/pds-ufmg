interface HeaderCell<ModelSchema> {
  key?: keyof ModelSchema;
  label: string;
  sortable: boolean;
  width: string;
}

export default HeaderCell;
