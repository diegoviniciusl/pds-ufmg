type ComparatorMethod<ModelSchema> = (
  a: ModelSchema,
  b: ModelSchema,
) => number;

export default ComparatorMethod;
