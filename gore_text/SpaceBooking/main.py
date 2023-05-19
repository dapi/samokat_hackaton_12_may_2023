import os, os.path
import random
import string

import cherrypy


class StringGenerator(object):
    @cherrypy.expose
    def index(self):
        return open('index.html')


@cherrypy.expose
class StringGeneratorWebService(object):

    @cherrypy.tools.accept(media='text/plain')
    def GET(self):
        return cherrypy.session['mystring']

    def POST(self, length=8):
        some_string = ''.join(random.sample(string.hexdigits, int(length)))
        cherrypy.session['mystring'] = some_string
        return some_string

    def PUT(self, another_string):
        cherrypy.session['mystring'] = another_string

    def DELETE(self):
        cherrypy.session.pop('mystring', None)


if __name__ == '__main__':
    conf = {
    '/': {
        'tools.sessions.on': True,
        'tools.staticdir.root': os.path.abspath(os.getcwd())
    },

    '/generator': {
        'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
        'tools.response_headers.on': True,
        'tools.response_headers.headers': [('Content-Type', 'text/plain')],
    },

    '/js': {
        'tools.staticdir.on': True,
        'tools.staticdir.dir': os.path.abspath('./js')
    },

    '/css': {
        'tools.staticdir.on': True,
        'tools.staticdir.dir': os.path.abspath('./css')
    },

    '/assets': {
        'tools.staticdir.on': True,
        'tools.staticdir.dir': os.path.abspath('./assets')
    },
    }
    webapp = StringGenerator()
    webapp.generator = StringGeneratorWebService()
    cherrypy.config.update({'server.socket_port': 8099})
    cherrypy.server.socket_host = '192.168.4.36'
    cherrypy.quickstart(webapp, '/', conf)