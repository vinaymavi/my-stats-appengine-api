from entities.entities import Device, User
from helper.device_helper import DeviceHelper
from my_stats_messages.my_stats_messages import *
import logging


class UserHelper():
    def __init__(self):
        logging.info("constructor calling.")

    def link_device(self, user, device):
        user.devices.append(device)
        user.put()
        return self.get_user_by_fb_id(user.fb_id)

    def create_user(self, fb_id, name, email):
        users = self.get_user_by_fb_id(fb_id)
        if len(users) > 0:
            pass
        else:
            user = User(fb_id=fb_id, name=name, email=email)
            user.put()

        return self.get_user_by_fb_id(fb_id)

    def get_user_by_fb_id(self, fb_id):
        query = User.query(User.fb_id == fb_id)
        return query.fetch()

    def create_user_resp(self, fb_id):
        users = self.get_user_by_fb_id(fb_id)
        device_helper = DeviceHelper()
        if len(users) > 0:
            user = users[0]
            user_resp = UserMessage(fb_id=user.fb_id, name=user.name, email=user.email)
            if len(user.devices) > 0:
                for device in user.devices:
                    user_resp.devices.append(device_helper.create_device_resp(device))
        return user_resp

    def is_device_already_registered(self, device, device_list):
        is_registered = False
        logging.info("****Before loop*****")
        logging.info(device)
        logging.info(device.device_id)
        for d in device_list:
            logging.info(sorted(device.device_id.split()))
            logging.info(sorted(d.device_id.split()))

            if sorted(device.device_id.split()) == sorted(d.device_id.split()):
                logging.info("is_registered=True")
                is_registered = True
        return is_registered
