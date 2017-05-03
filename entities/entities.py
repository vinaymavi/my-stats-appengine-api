from google.appengine.ext import ndb


class Device(ndb.Model):
    device_id = ndb.StringProperty()
    device_name = ndb.StringProperty()
    is_link = ndb.BooleanProperty()
    is_active = ndb.BooleanProperty()
    add_date = ndb.DateTimeProperty(auto_now_add=True)


class User(ndb.Model):
    fb_id = ndb.StringProperty()
    name = ndb.StringProperty()
    email = ndb.StringProperty()
    add_date = ndb.DateTimeProperty(auto_now_add=True)
    devices = ndb.StringProperty(repeated=True)


class MasterDevice(ndb.Model):
    """
    Master device entity only to store last device count.
    """
    device_count = ndb.IntegerProperty(default=0)
