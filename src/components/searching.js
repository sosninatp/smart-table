import {rules, createComparison} from "../lib/compare.js";      ////это было


export function initSearching(searchField) {    ////это было
    // @todo: #5.1 — настроить компаратор
    // const compare = createComparison(rules);    ////?
    const compare = createComparison(
        ['skipEmptyTargetValues'], 
        [rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)]
    );    ////?



    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        // return data;
        return data.filter((row) => compare(row, state));
    }
}

/*
Для подключения модуля вам нужно добавить в настройки таблицы шаблон search перед header, а при инициализации — передать имя поля search в функцию, чтобы знать, какое значение брать из фильтров для поиска по полям. 

Для реализации поиска мы используем аналогичный компаратор, как и при фильтрации, 
но его нужно будет создать внутри функции initSearching(), 
чтобы использовать переданное имя поля для настройки.           ////???

В стандартных правилах вам понадобится только skipEmptyTargetValues,  ////???
а не весь набор defaultRules. 
Вторым аргументом вам нужно будет подключить правило rules.searchMultipleFields (searchField, ['date', 'customer', 'seller'], false), которое и выполнит всю работу.*/