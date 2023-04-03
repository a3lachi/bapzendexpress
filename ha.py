import requests 



url = [ 'https://bapzendexpress.vercel.app/api/bapz/id' , "http://localhost:3000/api/bapz/id" ]



res = requests.post(url[0],{'id':736})



print(res.text)