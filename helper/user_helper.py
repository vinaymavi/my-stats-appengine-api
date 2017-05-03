from entities.entities import Device, User
import logging


class UserHelper():
    def __init__(self):
        logging.info("constructor calling.");

    def link_device(self, user, device_id):
        device = Device(device_id=device_id)
        logging.info("Register devices size = " + len(user.devices))
        device.device_name = "Device-" + (len(user.devices) + 1);
        user.devices.append(device)
        user.put()
        return self.get_user_by_fb_id(user.fb_id)

    def create_user(self, fb_id, name, email):
        user = User(fb_id=fb_id, name=name, email=email)
        user.put()
        return self.get_user_by_fb_id(fb_id);

    def get_user_by_fb_id(self, fb_id):
        query = User.query(User.fb_id == fb_id)
        return query.fetch();
