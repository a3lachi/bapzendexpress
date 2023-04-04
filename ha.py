import requests 
import json
import sys


url = [ "http://localhost:8000/api/customer/token", "http://localhost:4000/api/customer/token" ]
data_user = { 'email':'mm7@hotmail.fr',
       'pwd':'pwd',
              'mm': 'mli7',
              'lstname': 'boko',
              'usrname':'fara',
              'jwt':'DSFDGSDFHR78568756756' 
        
        }

data = {
    'jwt':'45465TUYJTHRGFS76756'
}
data_bytes = json.dumps(data).encode('utf-8')

res = requests.post(url[int(sys.argv[1])],data)



print(res.text)