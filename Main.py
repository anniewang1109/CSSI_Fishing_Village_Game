import webapp2
import jinja2
import os
from models import *
for google.appengine.api import users

jinja_current_directory = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class mainHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_users()
        
        template = jinja_current_directory.get_template('/templates/startPage.html')
        self.response.write(template.render())
    #def post(self):
        #Log in or make account

app = webapp2.WSGIApplication([
    ('/', mainHandler),
], debug=True)
