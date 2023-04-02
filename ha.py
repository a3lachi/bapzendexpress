import requests 







res = requests.post('https://bapzendexpress.vercel.app/api/bapz/id',data={'id':736})



print(res.text)