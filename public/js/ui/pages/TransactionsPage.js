/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
   /**
    * Если переданный элемент не существует,
    * необходимо выкинуть ошибку.
    * Сохраняет переданный элемент и регистрирует события
    * через registerEvents()
    * */
   constructor(element) {
      if (!element) {
         throw new Error('Элемент не существует');
      }
      this.element = element;
      this.registerEvents();
      // console.log(this, this.element, element);

   }

   //   /**
   //    * Вызывает метод render для отрисовки страницы
   //    * */
   update() {
      this.render(this.lastOptions);
   }
   //   /**
   //    * Отслеживает нажатие на кнопку удаления транзакции
   //    * и удаления самого счёта. Внутри обработчика пользуйтесь
   //    * методами TransactionsPage.removeTransaction и
   //    * TransactionsPage.removeAccount соответственно
   //    * */
   registerEvents() {
      this.element.addEventListener("click", (e) => {
         e.preventDefault();
         const removeAccountBtn = e.target.closest('.remove-account');
         const removeTransBtn = e.target.closest('.transaction__remove');
         if (removeAccountBtn) {
            this.removeAccount();
            console.log(e.target.dataset, e.target)
         }
         if (removeTransBtn) {
            this.removeTransaction(e.target.dataset.id);
            console.log(e.target.dataset.id, e.target.dataset, e.target)
         }
      })
   }

   //   /**
   //    * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   //    * Если пользователь согласен удалить счёт, вызовите
   //    * Account.remove, а также TransactionsPage.clear с
   //    * пустыми данными для того, чтобы очистить страницу.
   //    * По успешному удалению необходимо вызвать метод App.update()
   //    * для обновления приложения
   //    * */
   removeAccount() {
      if (!this.lastOptions) {
         return
      } else {
         if (confirm("Вы действительно хотите удалить счёт?")) {
            Account.remove(this.lastOptions.account_id, (e, response) => {

            })

            this.clear();
            // App.updateWidgets();
            App.update();
         }
      }

   }

   //   /**
   //    * Удаляет транзакцию (доход или расход). Требует
   //    * подтверждеия действия (с помощью confirm()).
   //    * По удалению транзакции вызовите метод App.update()
   //    * */
   removeTransaction(id) {
      if (confirm("Вы действительно хотите удалить транзакцию?")) {
         Transaction.remove(id, (e, response) => {

         });
         // App.updateWidgets();
         App.update();
      }
   }
   //   /**
   //    * С помощью Account.get() получает название счёта и отображает
   //    * его через TransactionsPage.renderTitle.
   //    * Получает список Transaction.list и полученные данные передаёт
   //    * в TransactionsPage.renderTransactions()
   //    * */
   render(options) {
      this.lastOptions = options;
      if (!options) {
         return
      }

      Account.get(options.account_id, (e, response) => {
         if (response.success) {
            this.renderTitle(response.data.name);//выдает ошибку
         }
         console.log(response)
      })
      Transaction.list(options, (e, response) => {
         if (response.success) {
            this.renderTransactions(response.data);
         }
      })

   }

   //   /**
   //    * Очищает страницу. Вызывает
   //    * TransactionsPage.renderTransactions() с пустым массивом.
   //    * Устанавливает заголовок: «Название счёта»
   //    * */
   clear() {
      this.renderTransactions([]);
      this.renderTitle('Название счёта');
      this.lastOptions = null;
   }

   //   /**
   //    * Устанавливает заголовок в элемент .content-title
   //    * */
   renderTitle(name) {
      this.element.querySelector(".content-title").textContent = name;
   }

   //   /**
   //    * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   //    * в формат «10 марта 2019 г. в 03:20»
   //    * */
   formatDate(date) {

      //     // const dateNew = new Date().toLocaleString('ru', {
      //     //   year: 'numeric',
      //     //   month: 'long',
      //     //   day: 'numeric',
      //     //   hour: 'numeric',
      //     //   minute: 'numeric'
      //     // })
      //     // return dateNew;
   }

   //   /**
   //    * Формирует HTML-код транзакции (дохода или расхода).
   //    * item - объект с информацией о транзакции
   //    * */
   getTransactionHTML(item) {
      return `<div class="transaction transaction_${item.type.toLowerCase()} row">
          <div class="col-md-7 transaction__details">
            <div class="transaction__icon">
                <span class="fa fa-money fa-2x"></span>
            </div>
            <div class="transaction__info">
                <h4 class="transaction__title">${item.name}</h4>
                <!-- дата -->
               //  <div class="transaction__date">${this.formatDate()}</div>
               <div class="transaction__date">10/03/19///</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="transaction__summ">
            ${item.sum} <span class="currency">₽</span>
            </div>
          </div>
          <div class="col-md-2 transaction__controls">
              <!-- в data-id нужно поместить id -->
              <button class="btn btn-danger transaction__remove" data-id=${item.id}>
                  <i class="fa fa-trash"></i>  
              </button>
          </div>
      </div>`
   }

    /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
     renderTransactions( data ) {
      this.element.querySelector('.content').innerHTML = '';
      data.forEach(item => this.element.querySelector('.content').innerHTML += this.getTransactionHTML(item))
    }
}

