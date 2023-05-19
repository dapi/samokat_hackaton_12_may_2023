import requests
from flask import Flask, request
from config import bot_username, bot_password, server_url

app = Flask(__name__)

def send_message(recipient, message_text, type):
    # Аутентификация бота и получение токена авторизации
    auth_url = f"{server_url}/api/v1/login"
    auth_payload = {"user": bot_username, "password": bot_password}
    auth_response = requests.post(auth_url, json=auth_payload)
    auth_response_json = auth_response.json()
    auth_token = auth_response_json["data"]["authToken"]
    bot_id = auth_response_json["data"]["userId"]
    if type == 'direct':
        # Создание личного чата между ботом и пользователем
        im_create_url = f"{server_url}/api/v1/im.create"
        headers = {"Content-type": "application/json", "X-Auth-Token": auth_token, "X-User-Id": bot_id}
        im_create_payload = {"username": recipient}
        im_create_response = requests.post(im_create_url, headers=headers, json=im_create_payload)
        im_create_response_json = im_create_response.json()
        im_id = im_create_response_json["room"]["_id"]
        # Отправка сообщения в личный чат
        chat_post_url = f"{server_url}/api/v1/chat.postMessage"
        chat_post_payload = {"roomId": im_id, "text": message_text}
        chat_post_response = requests.post(chat_post_url, headers=headers, json=chat_post_payload)
    elif type == 'general':
        # Отправка сообщения в глобальный чат
        chat_post_url = f"{server_url}/api/v1/chat.postMessage"
        headers = {"Content-type": "application/json", "X-Auth-Token": auth_token, "X-User-Id": bot_id}
        chat_post_payload = {"channel": recipient, "text": message_text}
        chat_post_response = requests.post(chat_post_url, headers=headers, json=chat_post_payload)
    # Вывод результатов запроса
    if chat_post_response.status_code == 200:
        return "Сообщение отправлено!"
    else:
        return f"Ошибка отправки сообщения: {chat_post_response.text}"


@app.route('/send_message', methods=['POST'])
def handle_send_message():
    recipient = request.form['recipient']
    message_text = request.form['message_text']
    type_get = request.form['type']
    return send_message(recipient, message_text, type_get)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

