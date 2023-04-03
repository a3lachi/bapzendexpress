import requests 



url = [ 'https://bapzendexpress.vercel.app/api/bapz/id' , "http://localhost:3000/api/bapz/apparel" ]



res = requests.post(url[1])



print(res.text)