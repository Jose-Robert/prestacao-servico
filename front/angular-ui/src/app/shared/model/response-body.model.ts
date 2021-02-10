export class ResponseBody<T> {
  data: T;
  errors: string[];
  links?: string[];
}
