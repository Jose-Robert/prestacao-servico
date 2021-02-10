import { FormControl, ValidatorFn } from '@angular/forms';

export const trimValidator: ValidatorFn = (control: FormControl) => {
  if(!control.value){
    return null;
  }

  if (control.value.startsWith(' ')) {
    return {
      trimError: { value: 'control has leading whitespace' }
    };
  }
  if (control.value.endsWith(' ')) {
    return {
      trimError: { value: 'control has trailing whitespace' }
    };
  }
  return null;
};
