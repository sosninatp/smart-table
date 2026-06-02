import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
  Object.keys(indexes) 
    .forEach((elementName) => {
      // Перебираем по именам  
      elements[elementName].append(
        // в каждый элемент добавляем опции
        ...Object.values(indexes[elementName]) // формируем массив имён, значений опций
          .map((name) => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            return option; // @todo: создать и вернуть тег опции
          }),
      );
    });

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
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
