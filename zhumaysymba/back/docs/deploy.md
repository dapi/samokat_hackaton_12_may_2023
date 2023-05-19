# Установка и запуск <img align="left" alt="install" width="50px" src="https://cdn-icons-png.flaticon.com/512/3104/3104000.png" />

## С использованием Docker <img align="left" alt="docker" width="50px" src="https://cdn-icons-png.flaticon.com/512/919/919853.png" />

Все приложения контейнеризованы, поэтому потребуется лишь только:
1. Создать `.env` конфиг для API (см. [.env-example](/.env-example))
2. Поменять данные конфига для rocket-bot в файле [rocket-bot/config.py](./rocket-bot/config.py)
3. Запустить приложения с использованием `docker-compose`

```bash
 $ cp .env-example .env  # modify as well
 $ docker-compose up --build -d
```

## Мануально

### Сборка API

Чтобы собрать сервис api, вам потребуется go версии v1.20.

После этого сборку и локальный запуск можно выполнить так:
```bash
 $ cp .env-example .env  # modify as well
 $ cd cmd/api
 $ go build .
 $ ./api
```

### Сборка rocket-bot

Чтобы собрать сервис rocket-bot, вам понадобится Python одной из последних версий.

После этого сборку и локальный запуск можно выполнить так:
```bash
 $ cd rocket-bot
 $ vim cofig.py  # modify config
 $ pip3 install -r requirements.txt
 # python3 main.py
```

### Сборка web-ui

Сборка фронта описана [в репозитории](https://github.com/Andronzi/abnysyamuhz)
