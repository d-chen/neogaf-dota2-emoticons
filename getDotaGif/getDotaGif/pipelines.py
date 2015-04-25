# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

from scrapy.exceptions import DropItem
import json

class GetdotagifPipeline(object):

    def is_32_gif(self, url):
        include = '.gif'
        exclude = ['-16.gif', '-24.gif']

        if not url.endswith(include):
            return False

        for exc in exclude:
            if exc in url:
                return False
        return True

    def process_item(self, item, spider):
        if self.is_32_gif(item['src']):
            return item
        else:
            raise DropItem("Not a 32x32 gif: %s" % item['id'])

class JsonWriterPipeline(object):
    gifs = []

    def process_item(self, item, spider):
        my_item = {'id': item['id'], 'src': item['src']}
        self.gifs.append(my_item)

    def close_spider(self, spider):
        with open('./d2gifs.json', 'wb') as myFile:
            json.dump(self.gifs, myFile)
