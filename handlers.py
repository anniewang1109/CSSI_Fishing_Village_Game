class mainHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_current_directory.get_template('/templates/startPage.html')
        self.response.write(template.render())
    #def post(self):
        #Log in or make account
