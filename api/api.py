from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS, cross_origin
import json
from pprint import pprint


app = Flask(__name__)
CORS(app)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('task')

class JsonHandler:
    def __init__(self):
        pass

    def jread(self):
        with open('./api/data.json', encoding='utf-8') as json_data:
            data = json.load(json_data)
        return data

class UserHandler(Resource):
    def get(self, u_name):
        data = JsonHandler()
        loaded_json = data.jread()
        for x in loaded_json["users"]:
            if x["name"] == u_name:
	            return {'resp': "true", 'role':x["role"], 'id':x["id"], 'name':x["name"], 'email':x["email"]}
    
    def post(self):
        args = parser.parse_args()
        return {'args': args}, 201

api.add_resource(UserHandler, '/v1/getUser/<string:u_name>')

if __name__ == '__main__':
    app.run(debug=True)