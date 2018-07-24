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
            login_url = users.create_login_url('/game')

        template_vars = {
            "user": user,
            "nickname": nickname,
            "logout_url": logout_url,
            "login_url": login_url,
        }

        template = jinja_current_directory.get_template('/templates/welcomePage.html')
        self.response.write(template.render(template_vars))

class StartGameHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()

        if user:
            nickname = user.nickname()
            template_vars = {
                "nickname": nickname,
            }
            template = jinja_current_directory.get_template('/templates/gamePage.html')
            self.response.write(template.render(template_vars))
        else:
            self.redirect('/')

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/game', StartGameHandler),

], debug=True)
