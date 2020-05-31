from flask import Flask, render_template
from api.message import message_api
from flask_cors import CORS
from auth import auth_api

app = Flask(__name__)
CORS(app)

app.register_blueprint(message_api)
app.register_blueprint(auth_api)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
