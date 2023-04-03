import requests 
import json
import sys


url = [ 'https://bapzendexpress.vercel.app/api/bapz/id' , "http://localhost:3000/api/bapz/product" ]
data = {'id':740}
data_bytes = json.dumps(data).encode('utf-8')

res = requests.post(url[1],data)



print(res.text)