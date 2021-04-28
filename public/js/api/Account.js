/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */

class Account extends Entity {

  static URL = '/account';
  /**
   * Получает информацию о счёте
   * */

  static get(id, callback) {
    let options = {
      url: `${this.URL}/ ${id}`,
      responseType: 'JSON',
      data: data,
      method: 'GET',
      callback: callback
    }
    createRequest(options)
    console.log(options)
  }
}
