import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
  // console.log(indexes )
  /*
    searchBySeller: 
    seller_1: "Alexey Petrov"
    ...*/
  // console.log(Object.keys(indexes) ) ////только 0: "searchBySeller". //// ???пока 1 поле фильтры??

  Object.keys(indexes) // Получаем ключи из объекта. ////"searchBySeller"
    .forEach((elementName) => {
      // Перебираем по именам    ////???именам полей фильтра?
      ////? видать добавляем элемент в select чтобы выпадашка с именами была
      elements[elementName].append(
        // в каждый элемент добавляем опции
        ...Object.values(indexes[elementName]) // формируем массив имён, значений опций
          .map((name) => {
            // используйте name как значение и текстовое содержимое ////???
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            // console.log(name) ////Ivan Petrov
            return option; // @todo: создать и вернуть тег опции
          }),
      );
    });

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    /*Добавьте очистку полей фильтров. 
проверьте наличие действия. 
Если это кнопка с именем clear,   ////!!!
тогда найдите input рядом с нашей кнопкой. 
Для этого можете получить родительский элемент кнопки и в нём выполнить поиск. ////???
Для найденного поля ввода сбросьте value 
и сделайте то же самое для соответствующего поля в state. 
Поле можно узнать через значение атрибута data-field кнопки.*/
    if (action && action.name === "clear") {
      // Ищем родительский контейнер
      const parent = action.closest(".filter-wrapper");
      console.log(parent);

      // Ищем инпут ИМЕННО внутри этого контейнера
      const input = parent.querySelector("input");
      console.log(input);
      input.value = "";
      console.log(action.getAttribute("data-field"));
      state[action.getAttribute("data-field")] = "";
      // console.log(state)
    }

    // @todo: #4.5 — отфильтровать данные используя компаратор
    return data.filter((row) => compare(row, state));
  };
}
