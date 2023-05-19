import sqlite3
import random
from faker import Faker


def add_new_member(name, email, number, photo, roles, interests, departament):
    _sqlite_connection = sqlite3.connect('sqlite_python.db')
    print("Соединение с базой данных установлено!")
    sqlite_create_table_query = f'''INSERT INTO MEMBERS (id,name,email,number,photo,interests,roles,departament)
                                   VALUES ({random.randint(0, 10000000)},'{name}','{email}','{number}','{photo}','{interests}','{roles}','{departament}');'''

    cursor = _sqlite_connection.cursor()
    print("База данных подключена к SQLite")
    cursor.execute(sqlite_create_table_query)
    _sqlite_connection.commit()
    print("Запись создана!")
    cursor.close()
    _sqlite_connection.close()
    print("Соединение с SQLite закрыто")


def create_db(_sqlite_connection):
    sqlite_create_table_query = '''CREATE TABLE MEMBERS (
                                    id int NOT NULL,
                                    name TEXT NOT NULL,
                                    email text NOT NULL,
                                    number text NOT NULL,
                                    photo text NOT NULL,
                                    interests text NOT NULL,
                                    roles text NOT NULL,
                                    departament text NOT NULL);'''

    cursor = _sqlite_connection.cursor()
    print("База данных подключена к SQLite")
    cursor.execute(sqlite_create_table_query)
    sqlite_connection.commit()
    print("Таблица SQLite создана")
    cursor.close()


def parse_data(data):
    return [user.strip() for user in data.split(',')]


def string_to_map(data):
    new_data = []
    for user in data:
        new_data.append({
            "name": user[1],
            "email": user[2],
            "number": user[3],
            "photo": user[4],
            "interests": user[5],
            "roles": user[6],
            "departament": user[7]
        })

    return new_data


def get_all():
    _sqlite_connection = sqlite3.connect('sqlite_python.db')
    print("Соединение с базой данных установлено!")
    sqlite_create_table_query = '''SELECT * FROM MEMBERS;'''
    cursor = _sqlite_connection.cursor()
    print("База данных подключена к SQLite")
    cursor.execute(sqlite_create_table_query)
    data = cursor.fetchall()
    print(data)
    print("Таблица SQLite создана")
    cursor.close()
    _sqlite_connection.close()
    print("Соединение с SQLite закрыто")
    return data


def find_same_users(key):
    data = get_all()
    same_users = []

    for user in data:
        for field in user:
            if key.lower() in str(field).lower():
                same_users.append(user)
                break
    return same_users


def find_users_by_name(key):
    data = get_all()
    names = parse_data(key)
    same_users = []

    for user in data:
        for name in names:
            if name.lower() in user[1].lower():
                same_users.append(user)
                break

    return same_users


def find_users_by_email(key):
    data = get_all()
    emails = parse_data(key)
    same_users = []

    for user in data:
        for email in emails:
            if email.lower() in user[2].lower():
                same_users.append(user)
                break

    return same_users


def find_users_by_number(key):
    data = get_all()
    numbers = parse_data(key)
    same_users = []

    for user in data:
        for number in numbers:
            if number.lower() in user[3]:
                same_users.append(user)
                break

    return same_users


def find_users_by_interests(key):
    data = get_all()
    same_users = []
    interests = parse_data(key)

    for user in data:
        for interest in interests:
            if interest.lower() in user[5].lower():
                same_users.append(user)
                break

    return same_users


def find_users_by_roles(key):
    data = get_all()
    same_users = []
    roles = parse_data(key)

    for user in data:
        for role in roles:
            if role.lower() in user[6].lower():
                same_users.append(user)
                break

    return same_users


def find_users_by_departament(key):
    data = get_all()
    departaments = parse_data(key)
    same_users = []

    for user in data:
        for departament in departaments:
            if departament.lower() in user[7].lower():
                same_users.append(user)
                key

    return same_users


def delete_all():
    _sqlite_connection = sqlite3.connect('sqlite_python.db')
    print("Соединение с базой данных установлено!")
    sqlite_create_table_query = '''DELETE FROM MEMBERS;'''
    cursor = _sqlite_connection.cursor()
    print("База данных подключена к SQLite")
    cursor.execute(sqlite_create_table_query)
    print("Удаление успешно!")
    _sqlite_connection.commit()
    cursor.close()
    _sqlite_connection.close()
    print("Соединение с SQLite закрыто")


def generate_random_users(count):
    fake = Faker()
    for i in range(count):
        name = fake.name()
        email = fake.email()
        number = fake.phone_number()
        photo = fake.image_url()
        roles = fake.job()
        interests = ", ".join(fake.words(nb=3))
        departament = fake.company()
        add_new_member(name, email, number, photo, roles, interests, departament)


def generate_random_text():
    fake = Faker()
    return fake.text()


if __name__ == "__main__":
    try:
        sqlite_connection = sqlite3.connect('sqlite_python.db')
        # create_db(sqlite_connection)
        generate_random_users(15000)
    except sqlite3.Error as error:
        print("Ошибка при подключении к sqlite", error)
    finally:
        if sqlite_connection:
            sqlite_connection.close()
            print("Соединение с SQLite закрыто")
