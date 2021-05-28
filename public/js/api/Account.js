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

  static get(id='' ,  callback = f =>f) {
    let options = {
      url: `${this.url}`+ '/' + `${id}`,
      responseType: 'json',
      data: null, //????????
      id: id,
      method: 'GET',
      callback: callback
    }
    createRequest(options)
    console.log(options)
  }
}

// Entity.get (21, (e, response)=>{
//   console.log(e)
//   console.log(rsponse)
// })
