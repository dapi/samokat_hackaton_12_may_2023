Приложение написано на основе фреймворка [NestJS](https://docs.nestjs.com/) и представляет собой бэкенд приложение, реализующее функционал по управлению Личным пространством сотрудников компании.

В качестве ORM для упрщенной работы с БД используется [TypeORM](https://typeorm.io/)

Авторизация пользователей реализована с использованием JWT и пакета [@nestjs/jwt](https://github.com/nestjs/jwt)

Swagger описание гененрируется автоматически и реализовано с помощбю пакета [@nestjs/swagger](https://github.com/nestjs/swagger)

## Подготовка БД

1. [Установить MS SQLServer](https://metanit.com/sql/sqlserver/1.2.php#:~:text=%D0%94%D0%BB%D1%8F%20%D1%8D%D1%82%D0%BE%D0%B3%D0%BE%20%D0%BF%D0%B5%D1%80%D0%B5%D0%B9%D0%B4%D0%B5%D0%BC%20%D0%BF%D0%BE%20%D0%B0%D0%B4%D1%80%D0%B5%D1%81%D1%83,%D0%B2%D0%B0%D1%80%D0%B8%D0%B0%D0%BD%D1%82%D0%B0%20%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B8%3A%20%D0%B1%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D1%8F%20%D0%B8%20%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%B0%D0%B8%D0%B2%D0%B0%D0%B5%D0%BC%D0%B0%D1%8F.)

2. [Установить SSMS](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16)

3. Создать БД, создать пользователя БД, выдать пользователю права Администратора

## Разворачивание проекта на localhost

### Установка зависимостей

Первоначально необходимо установить зависимости проекта используя команду

```
    npm ci
```

### Конфигурирование проекта

В корне проекта создайте файл `.env` (либо переименуйте `.env.sample`)

Заполните поля конфигурации: 

```
    DATABASE_TYPE=... # тип СУБД (например, mssql)
    DATABASE_PORT=... # порт для подключения к БД (по умолчанию 1433)
    DATABASE_HOST=... # хост БД (по умолчанию localhost)
    DATABASE_NAME=... # имя БД
    DATABASE_USERNAME=... # имя пользователя БД
    DATABASE_PASSWORD=... # пароль пользователя для подключения к БД
```

### Запуск

Для запуска в режиме разработки выполнить команду:

```
    npm start
```

Сервис станет доступен по адресу: [http://localhost:3000/](http://localhost:3000/)

Swagger описание эндпоинтов сервиса станет доступен по адресу: [http://localhost:3000/api](http://localhost:3000/api)



