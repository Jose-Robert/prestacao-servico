export class StringUtils {

  static toSpinalCase(value: string): string {
    return value.replace(/\s/g, '').split(/(?=[A-Z])/).join('-').toLowerCase();
  }

  static toReplaceCpfCnpj(value: string): string {
    if(!value) {
      return null;
    }
    return value.replace(/[^\w\s]/gi, '');
  }

  static somenteNumeros(value: string): string {
    if(!value) {
      return null;
    }
    return value.replace(/\D/g, '');
  }

  static removeCaracteresEspeciais(value: string): string {
    if(!value) {
      return null;
    }

    return value.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '');
  }

  static removeNumeros(value: string): string {
    if(!value) {
      return null;
    }

    return value.replace(/[0-9]/g, '');
  }

  static toUpperCase(value: string): string {
    if(!value) {
      return null;
    }

    return value.toUpperCase();
  }

  static removeCaracteresEspeciaisAndNumerosAndToUpperCase(value: string): string {
    if(!value) {
      return null;
    }

    let parsed = this.removeCaracteresEspeciais(value);
    parsed = this.removeNumeros(parsed);
    parsed = this.toUpperCase(parsed);

    return parsed;
  }

}
