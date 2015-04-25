from scrapy import Spider
import json
from getDotaGif.items import GetdotagifItem

raw_url = "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/"

class DotaGifSpider(Spider):
    name = 'dota2gif'
    allowed_domains = ['https://github.com']
    start_urls = ["https://github.com/bontscho/dota2-chat-emoticons/tree/master/assets/images"]

    def parse(self, response):
        for sel in response.xpath("//td[@class='content']//span"):
            link = sel.xpath('a/@href').extract()[0]
            file_name = link.split('/')[-1]
            my_id = file_name.split('.')[0]
            my_src = raw_url + file_name
            item = GetdotagifItem()
            item['id'] = my_id
            item['src'] = my_src
            yield item
