from flask import request, make_response, Blueprint
from functools import wraps
import json

with open('./data/users.json') as file:
    users_data = json.load(file)

users = users_data['users']
tokens = users_data['tokens']


def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if token and token in tokens:
            return f(*args, *kwargs)

        return make_response('Unauthorized Access', 401)

    return decorated


def logged_in_user():
    return users[tokens[request.headers.get('Authorization')]]


auth_api = Blueprint('auth_api', __name__)


@auth_api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    if body['userId'] in users and users[body['userId']]['password'] == body['password']:
        user = {
            "name": users[body['userId']]['name'],
            "token": users[body['userId']]['token'],
            "id": users[body['userId']]['userId']
        }
        return make_response(user, 200)

    return make_response('Login Failed', 401)
