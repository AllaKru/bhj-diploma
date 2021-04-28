// // // // // // /**
// // // // // //  * Основная функция для совершения запросов
// // // // // //  * на сервер.
// // // // // //  * */
let formData = new FormData();

const createRequest = (options = {}) => {

  try {
    const xhr = new XMLHttpRequest;
    if (options.method === "GET") {
      options.url += `?mail=${options.data.email}&password=${options.data.password}`;
      console.log('Отправили гет')
    } else {
      for (let option in options.data) {
        formData.append(option, options.data[option]);
        console.log('Отправили пост')
      }
    }
    if (options.headers) {
      for (let header in options.headers) {
        xhr.setRequestHeader(header, options.headers[header]);
      }
    }

    xhr.open(options.method, options.url);
    xhr.withCredentials = true;
    xhr.responseType = "json";
    xhr.send(formData);
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        options.callback(null, xhr.response);
        console.log(xhr.response, xhr);
      }
    })
    return xhr;
  }
  catch (e) {
    options.callback(e, null);
    console.log('Произошла ошибка ' + e)
  }
}
