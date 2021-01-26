import { ValidationType } from './validation-type.enum';

export class Validation {
  type: ValidationType | string;
  message: string;
}
