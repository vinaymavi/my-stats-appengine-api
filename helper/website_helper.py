from entities.entities import Website
from user_helper import UserHelper


class WebsiteHelper():
    def __init__(self):
        pass

    def get(self, fb_id):
        user_helper = UserHelper()
        user_list = user_helper.get_user_by_fb_id(fb_id)
        if len(user_list) > 0:
            user = user_list[0]
            query = Website.query()
            return query.filter(Website.device.IN(user.devices)).order(Website.startTime).fetch()
        else:
            return []
