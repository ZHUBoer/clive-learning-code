import requests
from bs4 import BeautifulSoup
import html2text
from datetime import datetime

def fetch_web_data(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        return None

def html_to_markdown(html_content):
    text_maker = html2text.HTML2Text()
    text_maker.ignore_links = False
    text_maker.bypass_tables = False
    markdown = text_maker.handle(html_content)
    return markdown

def save_content_to_file(content, filename):
    with open(filename, 'w', encoding='utf-8') as file:
        file.write(content)

# 主函数
if __name__ == "__main__":
    url = 'https://wiki.biligame.com/wukong/%E5%9C%B0%E5%9B%BE'
    html_content = fetch_web_data(url)
    
    if html_content:
        markdown_content = html_to_markdown(html_content)
        
        # 获取当前日期并格式化为YYYYMMDD格式
        today = datetime.now().strftime('%Y%m%d')
        filename = f"{today}.txt"
        
        # 保存内容到文件
        save_content_to_file(markdown_content, filename)
        print(f"内容已保存到文件: {filename}")
    else:
        print("无法获取网页内容")