from google.appengine.ext import ndb

class Fish(ndb.Model):
    strength = ndb.IntegerProperty()
    spriteLink = ndb.StringProperty()

class Fisherman(ndb.Model):
    type = ndb.StringProperty()
    spriteLink = ndb.StringProperty()
    fishCaught = ndb.IntegerProperty()
    #xPos = ndb.IntegerProperty()
    #yPos = ndb.IntegerProperty()

class User(ndb.Model):
    username = ndb.StringProperty()
    level = ndb.IntegerProperty()
    #fishermanPlacement = ndb.KeyProperty(kind = Fisherman, repeated = true)

addNewUser(self, username):
    if(User.query(username == username).count == 0):
        new_User = User(username = username, level = 1)
        new User.put()



class mainHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_current_directory.get_template('/templates/startPage.html')
        self.response.write(template.render())
    #def post(self):
        #Log in or make account

app = webapp2.WSGIApplication([
    ('/', mainHandler),
], debug=True)
