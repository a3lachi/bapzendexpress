import requests 







res = requests.post('http://localhost:3000/api/bapz/id',data={'id':736})



print(res.text)