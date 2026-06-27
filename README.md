# neo-design-patterns-hw-11

Design Patterns: Chain of Responsibility and Mediator

1. Система обробки структурованих JSON-записів, що демонструє два поведінкові патерни:
   Chain of Responsibility — ланцюги валідації та обробки даних за типом запису
   Mediator — централізована маршрутизація та збереження результатів

2. Архітектура патернів

Chain of Responsibility: Для кожного типу запису (`access_log`, `transaction`, `system_error`) будується власний ланцюг обробників через `AbstractHandler`. Кожен обробник або трансформує запис і передає далі, або кидає `Error` при невалідних даних.

access_log: TimestampParser → UserIdValidator → IpValidator
transaction: TimestampParser → AmountParser → CurrencyNormalizer
system_error: TimestampParser → LevelValidator → MessageTrimmer

3. Mediator

`ProcessingMediator` це єдина точка збереження. Він отримує оброблені записи через `onSuccess()` і відхилені через `onRejected()`, делегуючи запис відповідному writer-у. Файли записуються лише після виклику `finalize()`.

4. Запуск
   npm install
   npx ts-node src/main.ts

Результати з'являться у директорії `output/`.
Приклад:
[INFO] Завантажено записів: 9
[INFO] Успішно оброблено: 4
[WARN] Відхилено з помилками: 5
[INFO] Звіт збережено у директорії output/

5. Як додати новий тип запису
   Модель — додати новий інтерфейс у `src/models/DataRecord.ts` і включити його у union-тип `DataRecord`.
   Обробники — створити потрібні handler-и у `src/chain/handlers/` (розширити `AbstractHandler`).
   Ланцюг — створити файл у `src/chain/chains/` і зібрати ланцюг через `setNext()`.
   Writer — створити `src/mediator/writers/MetricWriter.ts` з методами `write()` і `finalize()`.
   Mediator — додати новий writer у `ProcessingMediator`, обробити новий тип у `switch` всередині `onSuccess()`.
   main.ts — додати новий тип до `handlerMap`:
   typescript
   metric: buildMetricChain,
