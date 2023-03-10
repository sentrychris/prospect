export interface InCondition {
  $in: string[];
}

export interface RegexCondition {
  $regex: RegExp;
}

export interface Aggregation {
  'os.platform'?: InCondition;
  'hostname'?: RegexCondition;
}