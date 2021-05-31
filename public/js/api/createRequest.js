// // // // // // /**
// // // // // //  * Основная функция для совершения запросов
// // // // // //  * на сервер.
// // // // // //  * */


const createRequest = (options = {}) => {


  try {
    let formData = new FormData();
    const xhr = new XMLHttpRequest;

    if (options.method === "GET") {
      options.url += `?`;
      for (let option in options.data) {

        options.url += `${option}=${options.data[option]}&`;
        console.log('Отправили гет, options.data =' + options.data, options)
      }
    }
    else {
      for (let option in options.data) {
        formData.append(option, options.data[option]);
        console.log('Отправили пост, options.data =' + options.data, options)
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
        // let err = null;
        options.callback(null, xhr.response);

        // options.callback(xhr.response.success, xhr.response);
        // console.log(xhr.response, xhr);
      }
    })
  }
  catch (e) {
    options.callback(e, null);
    // xhr.response = null;
    console.log('Произошла ошибка ' + e)
  }
}
