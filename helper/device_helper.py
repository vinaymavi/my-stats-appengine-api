from google.appengine.ext import ndb
from entities.entities import MasterDevice, Device
from my_stats_messages.my_stats_messages import MasterDeviceMessage, DeviceMessage
import base64
import logging


class DeviceHelper():
    ID_BASE = "my_stats"
    device_id = ""

    def __init__(self):
        logging.info("constructor calling");

    def new_device_id(self):
        """
        Generate new device id
        :return: a MasterDeviceResp 
        """
        master_device_list = MasterDevice.query().fetch()
        if len(master_device_list) > 0:
            for master_device in master_device_list:
                self.device_id = self.ID_BASE + ':' + str(master_device.device_count + 1)
                master_device.device_count += 1
                master_device.put()
        else:
            master_device = MasterDevice(device_count=0)
            self.device_id = self.ID_BASE + ':' + str(master_device.device_count + 1)
            master_device.device_count += 1
            master_device.put()
        master_device_resp = MasterDeviceMessage(device_id=base64.b16encode(self.device_id))
        return master_device_resp

    def create_device(self, device_id):
        """
         Create a new device   
        :param device_id:  
        :return: Key
        """
        device = Device(device_id=device_id)
        device.put()
        return device

    def create_device_resp(self, device):
        device_resp = DeviceMessage(device_id=device.device_id, device_name=device.device_name)
        return device_resp

    def get_device_by_device_id(self, device_id):
        logging.info("device-id=" + device_id)
        device_list = Device.query(Device.device_id == device_id).fetch()
        logging.info("Device size = " + str(len(device_list)))
        return device_list
