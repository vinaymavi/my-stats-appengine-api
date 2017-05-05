from protorpc import message_types
from protorpc import messages
from protorpc import remote


class MasterDeviceMessage(messages.Message):
    device_id = messages.StringField(1)


class DeviceMessage(messages.Message):
    device_id = messages.StringField(1)
    device_name = messages.StringField(2)


class UserMessage(messages.Message):
    fb_id = messages.StringField(1, required=True)
    name = messages.StringField(2, required=True)
    email = messages.StringField(3)
    devices = messages.MessageField(DeviceMessage, 4, repeated=True)
