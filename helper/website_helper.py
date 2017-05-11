from entities.entities import Website
from user_helper import UserHelper
from google.appengine.ext import ndb
import logging


class WebsiteHelper():
    def __init__(self):
        pass

    def get(self, fb_id, start_date, end_date):
        logging.info('start_date - ' + str(start_date))
        logging.info('end_date - ' + str(end_date))
        user_helper = UserHelper()
        user_list = user_helper.get_user_by_fb_id(fb_id)
        if len(user_list) > 0:
            user = user_list[0]
            query = Website.query()
            return query.filter(ndb.AND(Website.device.IN(user.devices), )).filter(
                ndb.AND(Website.startTime >= start_date), (Website.startTime <= end_date)).order(
                Website.startTime).fetch()
        else:
            return []
