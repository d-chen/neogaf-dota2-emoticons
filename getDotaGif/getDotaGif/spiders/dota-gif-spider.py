from scrapy import Spider
import csv

raw_url = "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/"

def is_32_gif(url):
    exclude = ['-16.gif', '-24.gif']
    for e in exclude:
        if e in url:
            return False
    return True

def create_csv(myList):
    with open('./scrape_dota2_gif_list.csv', 'wb') as myFile:
        wr = csv.writer(myFile, quoting=csv.QUOTE_ALL)
        wr.writerow(myList)

class DotaGifSpider(Spider):
    name = 'dota2gif'
    allowed_domains = ['https://github.com']
    start_urls = ["https://github.com/bontscho/dota2-chat-emoticons/tree/master/assets/images"]

    def parse(self, response):
        myList = []
        for sel in response.xpath("//td[@class='content']//span"):
            link = sel.xpath('a/@href').extract()[0]
            file_name = link.split('/')[-1]
            complete_url = raw_url + file_name
            if is_32_gif(file_name):
                myList.append(complete_url)
        create_csv(myList)
