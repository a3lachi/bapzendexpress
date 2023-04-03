import requests 
import json
import sys


url = [ 'https://bapzendexpress.vercel.app/api/bapz/id' , "http://localhost:3000/api/customer" ]
data = { 'email':'mm7@hotmail.fr',
       'pwd':'pwd',
              'mm': 'mli7',
              'lstname': 'boko',
              'usrname':'fara',
              'jwt':'DSFDGSDFHR78568756756' 
        
        }
data_bytes = json.dumps(data).encode('utf-8')

res = requests.post(url[1],data)



print(res.text)