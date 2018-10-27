from datetime import date
import tornado.escape
import tornado.ioloop
import tornado.web
import json

class BaseHandler(tornado.web.RequestHandler):
    def get(self, *args, **kwargs):
        self.write("say something")

    def set_default_headers(self, *args, **kwargs):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Access-Control-Max-Age', 1000)
        self.set_header('Content-type', 'application/json')
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header('Access-Control-Allow-Headers',
                    'Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Headers, X-Requested-By, Access-Control-Allow-Methods')

class JsonHandler():
    def read(self):
        with open('data.json', encoding='utf-8') as data_file:
            data = json.loads(data_file.read())
        return data

class UserHandler(BaseHandler):
    def get(self, id):
        self.write({"resp" : "true", "role": "1", "id":"1", "name":"Small Business Owner", "email":"sbo@mail.com"})

class ApplicationHandler(BaseHandler):
    def get(self):
        self.write({"resp" : "true"})

    def OPTIONS(self):
        pass
    
    def post(self):
        req_amount = self.get_argument('requested')
        id_user = self.get_argument('id_user')
        self.write({"user": id_user, "amount":req_amount})
    


class MainHandler(tornado.web.RequestHandler):
    def get(self):
       self.write("LendingApp restful API v1")
 
def make_app():
    return tornado.web.Application([
        (r"/v1", MainHandler),
        (r"/v1/getuser/([0-9]+)", UserHandler),
        (r"/v1/postApplication", ApplicationHandler)
    ])
 
if __name__ == "__main__":
    application = make_app()
    application.listen(8888)
    tornado.ioloop.IOLoop.current().start()