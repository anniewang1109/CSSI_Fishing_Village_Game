import webapp2
import jinja2
import os
from models import *
from google.appengine.api import users

jinja_current_directory = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class MainHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        nickname = None
        login_url = None
        logout_url = None

        if user:
            nickname = user.nickname()
            logout_url = users.create_logout_url('/')
        else:
            login_url = users.create_login_url('/')

        tempate_vars = {
            "user": user,
            "nickname": nickname,
            "logout_url": logout_url,
            "login_url": login_url,
        }
        template = jinja_current_directory.get_template('/templates/welcomePage.html')
        self.response.write(template.render())

    #def post(self):
        #Log in or make account
class StartGameHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_current_directory.get_template('/templates/gamePage.html')
        self.response.write(template.render())
    #def post(self):
        #template = jinja_current_directory.get_template('/templates/gamePage.html')
        #self.response.write(template.render())

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/game', StartGameHandler)
], debug=True)
