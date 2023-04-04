import requests 
import json
import sys


url = [ 'https://bapzendexpress.vercel.app/api/bapz/id' , "http://localhost:8000/api/bapz/apparel" ]
data_user = { 'email':'mm7@hotmail.fr',
       'pwd':'pwd',
              'mm': 'mli7',
              'lstname': 'boko',
              'usrname':'fara',
              'jwt':'DSFDGSDFHR78568756756' 
        
        }

data = {
    'cat':'hats'
}
data_bytes = json.dumps(data).encode('utf-8')

res = requests.post(url[1],data)



print(res.text)