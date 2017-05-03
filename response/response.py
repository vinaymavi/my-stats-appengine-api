from protorpc import message_types
from protorpc import messages
from protorpc import remote


class MasterDeviceMessage(messages.Message):
    device_id = messages.StringField(1)


class DeviceMessage(messages.Message):
    device_id = messages.StringField(1)
    device_name = messages.StringField(2)
