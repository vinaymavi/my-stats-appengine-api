# [START imports]
import endpoints
from protorpc import message_types
from protorpc import messages
from protorpc import remote
from google.appengine.ext import ndb
import json
import logging
from datetime import datetime


# [END imports]


# [START messages]
class Greeting(messages.Message):
    """Greeting that stores a message."""
    message = messages.StringField(1)


class GreetingCollection(messages.Message):
    """Collection of Greetings."""
    items = messages.MessageField(Greeting, 1, repeated=True)


STORED_GREETINGS = GreetingCollection(items=[
    Greeting(message='hello world!'),
    Greeting(message='goodbye world!'),
])


class Website(ndb.Model):
    startTime = ndb.DateTimeProperty()
    endTime = ndb.DateTimeProperty()
    duration = ndb.FloatProperty()
    port = ndb.StringProperty()
    domain = ndb.StringProperty()
    protocol = ndb.StringProperty()


class WebsiteData(messages.Message):
    value = messages.StringField(1)


# [END messages]


# [START greeting_api]
@endpoints.api(name='greeting', version='v1')
class GreetingApi(remote.Service):
    @endpoints.method(
        # This method does not take a request message.
        message_types.VoidMessage,
        # This method returns a GreetingCollection message.
        GreetingCollection,
        path='greetings',
        http_method='GET',
        name='greetings.list')
    def list_greetings(self, unused_request):
        return STORED_GREETINGS

    # ResourceContainers are used to encapsuate a request body and url
    # parameters. This one is used to represent the Greeting ID for the
    # greeting_get method.
    GET_RESOURCE = endpoints.ResourceContainer(
        # The request body should be empty.
        message_types.VoidMessage,
        # Accept one url parameter: an integer named 'id'
        id=messages.IntegerField(1, variant=messages.Variant.INT32))

    @endpoints.method(
        # Use the ResourceContainer defined above to accept an empty body
        # but an ID in the query string.
        GET_RESOURCE,
        # This method returns a Greeting message.
        Greeting,
        # The path defines the source of the URL parameter 'id'. If not
        # specified here, it would need to be in the query string.
        path='greetings/{id}',
        http_method='GET',
        name='greetings.get')
    def get_greeting(self, request):
        try:
            # request.id is used to access the URL parameter.
            return STORED_GREETINGS.items[request.id]
        except (IndexError, TypeError):
            raise endpoints.NotFoundException(
                'Greeting {} not found'.format(request.id))

    # [END greeting_api]

    # [START multiply]
    # This ResourceContainer is similar to the one used for get_greeting, but
    # this one also contains a request body in the form of a Greeting message.
    MULTIPLY_RESOURCE = endpoints.ResourceContainer(
        Greeting,
        times=messages.IntegerField(2, variant=messages.Variant.INT32,
                                    required=True))

    @endpoints.method(
        # This method accepts a request body containing a Greeting message
        # and a URL parameter specifying how many times to multiply the
        # message.
        WebsiteData,
        # This method returns a Greeting message.
        WebsiteData,
        path='website/data/push',
        http_method='POST',
        name='website_data.push')
    def multiply_greeting(self, request):
        logging.info(request.value)
        websiteDic = json.loads(request.value);
        website = Website()
        logging.warning(websiteDic['duration'])
        website.duration = websiteDic['duration']
        website.port = websiteDic['domain']['port']
        website.domain = websiteDic['domain']['domain']
        website.protocol = websiteDic['domain']['protocol']
        website.startTime = datetime.strptime(websiteDic['startTime'],'%Y-%m-%dT%H:%M:%S.%fZ')
        website.endTime = datetime.strptime(websiteDic['endTime'],'%Y-%m-%dT%H:%M:%S.%fZ')
        website.put()
        return WebsiteData(value=request.value)
        # [END multiply]


# [START api_server]
api = endpoints.api_server([GreetingApi])
# [END api_server]