export interface InCondition {
  $in: string[];
}

export interface RegexCondition {
  $regex: RegExp;
}

export interface BaseAggregation {
  $match: Record<string, unknown>,
  $sort: Record<string, number>
}

export interface Aggregation {
  'os.platform'?: InCondition;
  'hostname'?: RegexCondition;
}