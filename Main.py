import webapp2
import jinja2
import os
from models import *
from google.appengine.api import users

jinja_current_directory = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


class GameUser(ndb.Model):
    username = ndb.StringProperty()
    fishersX = ndb.IntegerProperty()
    fishersY = ndb.IntegerProperty()
    levels = ndb.StringProperty(repeated = True);


currentUser = None;

class MainHandler(webapp2.RequestHandler):
    def get(self):
        nickname = None
        login_url = None
        logout_url = None
        user = users.get_current_user();
        if user:
            nickname = user.nickname()
            logout_url = users.create_logout_url('/')
        else:
            login_url = users.create_login_url('/backstory')



        template_vars = {
            "user": user,
            "nickname": nickname,
            "logout_url": logout_url,
            "login_url": login_url,
        }

        template = jinja_current_directory.get_template('/templates/welcomePage.html')
        self.response.write(template.render(template_vars))

class BackstoryHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_current_directory.get_template('/templates/backstory.html')
        self.response.write(template.render())

class GameHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user();
        print(user.nickname());
        if(GameUser.query(GameUser.username == user.nickname()).count() == 0):
            newUser = User(username = user.nickname())
            currentUser = newUser.put()
        else:
            currentUser = GameUser.query(GameUser.username == user.nickname()).fetch()

        if currentUser:
            nickname = user.nickname()
            template_vars = {
                "nickname": nickname,
            #"levelData": ,
            }
            template = jinja_current_directory.get_template('/templates/gamePage.html')
            self.response.write(template.render(template_vars))
        else:
            self.redirect('/')
    def post(self):
        currentUser.fisherX = self.request.get('fisherX')
        currentUser.fisherY = self.request.get('fisherY')
        currentUser.levels = self.request.get('levels')
        currentUser = currentUser.push()

class ResultsHandler(webapp2.RequestHandler):
    def get(self):
        # message = self.request.get(some variable that contains info if player won or not as true or false)

        # template_vars{
        #     'result' = message,
        # }

        template=jinja_current_directory.get_template('/templates/results.html')
        self.response.write(template.render())

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/backstory', BackstoryHandler),
    ('/game', GameHandler),
    ('/results', ResultsHandler),

], debug=True)
