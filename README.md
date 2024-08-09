# Функция преобразования дат в формат ISO 8601.

## Анализ задачи

Согласно спецификации ISO 8601, стандарт для однозначного определение строки. 
В стандарте явно не указано использование timezone, т.е. предпалагается вывод строки 
в виде 2018-06-01T11:17:12.745Z, где время указывает в по Гринвичу UTC + 0; 

Стандартный метод JavaScript для работы с Date, согласно спецификации EcmaScript: 

**21.4.4.36 Date.prototype.toISOString()**

    7. Return a String representation of tv in the Date Time String Format on the UTC time scale, including all format elements and the UTC offset representation "Z".

Метод будет возвращать строку указанной даты по UTC. 

Однако, представленные тесты требуют возврат timezone. 

Следовательно, прямое использование Date.toISOString не возможно, поэтому, потребуется изобрести свой метод. 



## Реализация ##

## Тесты ##

## Ссылки ##

