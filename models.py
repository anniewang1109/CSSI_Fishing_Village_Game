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

def addNewUser(self, username):
    if(User.query(username == username).count == 0):
        new_User = User(username = username, level = 1)
        new_User.put()
