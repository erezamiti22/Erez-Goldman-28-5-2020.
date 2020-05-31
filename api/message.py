from flask import Blueprint, jsonify, request, make_response
from auth import auth_required, logged_in_user
import json

message_api = Blueprint('message_api', __name__)


@message_api.route('/message', methods=['GET'])
@auth_required
def get_all_messages():
    user = logged_in_user()
    messages = load_messages()['messages']
    messages = {key: value for key, value in messages.items()
                if value['sender'] == user['userId'] or value['receiver'] == user['userId']}
    return make_response(jsonify(messages), 200)


@message_api.route('/message', methods=['POST'])
@auth_required
def create_message():
    user = logged_in_user()
    messages = load_messages()
    body = request.get_json()
    for value in body:
        if len(value) == 0:
            return make_response('The message could not be posted due to invalid data inputs', 400)

    message = {
        'sender': int(user['userId']),
        'receiver': int(body['receiver']),
        'message': body['message'],
        'subject': body['subject'],
        'created': body['created'],
        'id': messages['message_id_counter']
    }
    messages['messages'][message['id']] = message
    messages['message_id_counter'] += 1
    save_messages(messages)

    return make_response(jsonify(message), 200)


@message_api.route('/message/<id>', methods=['DELETE'])
def delete_message(id):
    messages = load_messages()
    if id in messages['messages']:
        del messages['messages'][id]
        save_messages(messages)
        return make_response('Message with the id of {id} was removed'.format(id=id), 200)

    return make_response('Message does not exists'.format(id=id), 400)


def load_messages():
    with open('./data/messages.json') as file:
        return json.load(file)


def save_messages(messages):
    with open('./data/messages.json', 'w') as file:
        json.dump(messages, file)
