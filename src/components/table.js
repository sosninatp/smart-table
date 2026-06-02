import { cloneTemplate } from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
/*const sampleTable = initTable({
    tableTemplate: 'table',
    rowTemplate: 'row',
    before: [],
    after: []
}, render);*/
export function initTable(settings, onAction) {
  const { tableTemplate, rowTemplate, before, after } = settings;

  /*return {
        container: clone,
        elements: elements
    };*/
  const root = cloneTemplate(tableTemplate);

  // @todo: #1.2 —  вывести дополнительные шаблоны до и после таблицы
  /*Добавьте возможность расширения таблицы. Найдите комментарий @todo: #1.2. 
    После него вам нужно будет добавить код, который возьмёт 
    идентификаторы шаблонов из массивов before и after ////???
    и добавит эти клонированные шаблоны до и после таблицы соответственно. 
    Причём шаблоны «до» нужно выводить в обратном порядке, если мы используем функцию prepend.*/


  ////Сохраните объекты, полученные после клонирования, в объекте таблицы root для последующего доступа к ним.
  before.reverse().forEach((subName) => { // перебираем нужный массив идентификаторов
    root[subName] = cloneTemplate(subName); // клонируем и получаем объект, сохраняем в таблице
    root.container.prepend(root[subName].container); // добавляем к таблице после (append) или до (prepend)
  });

  after.forEach((subName) => { // перебираем нужный массив идентификаторов
    root[subName] = cloneTemplate(subName); // клонируем и получаем объект, сохраняем в таблице
    root.container.append(root[subName].container); // добавляем к таблице после (append) или до (prepend)
  });

  // @todo: #1.3 —  обработать события и вызвать onAction()

  // Навешиваем слушатель изменений для полей формы
  root.container.addEventListener('change', () => {
    onAction();
  });

  // Навешиваем слушатель сброса формы с задержкой
  root.container.addEventListener('reset', () => {
    setTimeout(() => {
      onAction();
    }, 10);
  });

  // Навешиваем слушатель отправки формы
  root.container.addEventListener('submit', (e) => {
    e.preventDefault();
    onAction(e.submitter);
  });


  const render = (data) => {
    console.log(data);
    ////[0 … 99]0: {id: 'receipt_1', date: '2023-12-04', seller: 'Nikolai Ivanov', customer: 'Andrey Alekseev', total: 4657.56}

    // @todo: #1.1 — преобразовать данные в массив строк на основе шаблона rowTemplate
    const nextRows = data.map((item) => {
      // 1. Клонируем шаблон ДЛЯ КАЖДОЙ итерации
      /*    return {
                container: clone,
                elements: elements
        };*/
      const row = cloneTemplate(rowTemplate);
      Object.keys(item).forEach((key) => {
        if (row.elements[key]) {
          row.elements[key].textContent = item[key];
        }
      });
      return row.container;
    });
    root.elements.rows.replaceChildren(...nextRows);
  };
  return { ...root, render };
}
