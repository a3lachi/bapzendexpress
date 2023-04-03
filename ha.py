import requests 



url = [ 'https://bapzendexpress.vercel.app/api/bapz/id' , "http://localhost:4000/" ]



res = requests.get(url[1])



print(res.text)