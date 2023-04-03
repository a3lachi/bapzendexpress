import requests 



url = [ 'https://bapzendexpress.vercel.app/api/bapz/id' , "http://localhost:4000/api/bapz/id" ]



res = requests.post(url[1],data={'id':736})



print(res.text)