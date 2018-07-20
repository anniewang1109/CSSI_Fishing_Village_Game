from google.appengine.ext import ndb

annie

class Fish(ndb.Model):
    level = ndb.IntegerProperty()
    spriteLink = ndb.StringProperty()
