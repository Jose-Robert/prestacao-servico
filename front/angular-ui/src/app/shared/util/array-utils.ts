export class ArrayUtils {

  /**
   * Obtém o item do array que contenha a propriedade {prop} com o valor {value}.
   *
   * @param list array a ser iterado
   * @param prop nome da propriedade a ser verificada
   * @param value valor de {prop}
   */
  static getItem<T>(list: T[], prop: string, value: string | number): T {
    for (const item of list) {
      if (item[prop] === value) {
        return item;
      }
    }

    return null;
  }
}
