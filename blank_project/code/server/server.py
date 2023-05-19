from flask import Flask, request
from flask_cors import CORS
from db import get_all, find_same_users, add_new_member, delete_all, string_to_map
from db import find_users_by_name, find_users_by_roles, find_users_by_departament, find_users_by_number
from db import find_users_by_email, find_users_by_interests
from db import generate_random_text


app = Flask(__name__)
CORS(app)


@app.route('/get_all_users', methods=["get"])
def get_all_users():
    data = get_all()
    return {
        "data": string_to_map(data),
        "count": len(data)
    }


@app.route('/find_users', methods=["get"])
def find_users():
    data = find_same_users(request.args.get("key"))

    return {
        "data": string_to_map(data),
        "count": len(data)
    }


@app.route('/find_users_by_name', methods=["get"])
def find_users_name():
    data = find_users_by_name(request.args.get("key"))

    return {
        "data": string_to_map(data),
        "count": len(data)
    }


@app.route('/find_users_by_number', methods=["get"])
def find_users_number():
    data = find_users_by_number(request.args.get("key"))

    return {
        "data": string_to_map(data),
        "count": len(data)
    }


@app.route('/find_users_by_interests', methods=["get"])
def find_users_interests():
    data = find_users_by_interests(request.args.get("key"))

    return {
        "data": string_to_map(data),
        "count": len(data)
    }


@app.route('/find_users_by_email', methods=["get"])
def find_users_email():
    data = find_users_by_email(request.args.get("key"))

    return {
        "data": string_to_map(data),
        "count": len(data)
    }


@app.route('/find_users_by_roles', methods=["get"])
def find_users_roles():
    data = find_users_by_roles(request.args.get("key"))

    return {
        "data": string_to_map(data),
        "count": len(data)
    }


@app.route('/find_users_by_departament', methods=["get"])
def find_users_departament():
    data = find_users_by_departament(request.args.get("key"))

    return {
        "data": string_to_map(data),
        "count": len(data)
    }


@app.route('/add_user', methods=["post"])
def add_new_user():
    add_new_member(
        request.args.get("name"),
        request.args.get("email"),
        request.args.get("number"),
        request.args.get("photo"),
        request.args.get("roles"),
        request.args.get("interests"),
        request.args.get("departament")
    )

    return "OK"


@app.route('/delete_all', methods=["post"])
def delete_all_users():
    delete_all()
    return "OK"


@app.route('/generate_text', methods=["get"])
def get_text():
    return {
        "text": generate_random_text()
    }


if __name__ == '__main__':
    app.run(debug=True, port=5000)
