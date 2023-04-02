import requests 





res = requests.get('http://localhost:4000/about')



print(res.text)