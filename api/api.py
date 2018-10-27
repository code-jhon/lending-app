from datetime import date
import tornado.escape
import tornado.ioloop
import tornado.web
import json

class JsonHandler():
    def read(self):
        with open('data.json', encoding='utf-8') as data_file:
            data = json.loads(data_file.read())
        return data

class UserHandler(tornado.web.RequestHandler):
    def get(self, id):
        data = JsonHandler.read(self)
        dt = json.dumps(data)
        response = []
        for i in dt[0]:
            temp = { 'email': i[0][2],
                     'id': i[0][0],
                     'role': i[0][4] }
            response.append(temp)
        self.write(response)

 
class GetGameByIdHandler(tornado.web.RequestHandler):
    def get(self, id):
        response = { 'id': int(id),
                     'name': 'Crazy Game',
                     'release_date': date.today().isoformat() }
        self.write(response)

class MainHandler(tornado.web.RequestHandler):
    def get(self):
       self.write("LendingApp restful API v1")
 
def make_app():
    return tornado.web.Application([
        (r"/v1", MainHandler),
        (r"/v1/getuser/([0-9]+)", UserHandler)
    ])
 
if __name__ == "__main__":
    application = make_app()
    application.listen(8888)
    tornado.ioloop.IOLoop.current().start()