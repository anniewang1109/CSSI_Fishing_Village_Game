from google.appengine.ext import ndb

class Fish(ndb.Model):
    level = ndb.IntegerProperty()
    spriteLink = ndb.StringProperty()
<<<<<<< Updated upstream

class Fisherman(ndb.Model):
    type = ndb.StringProperty()
    spriteLink = ndb.StringProperty()
    fishCaught = ndb.IntegerProperty()
=======
>>>>>>> Stashed changes
