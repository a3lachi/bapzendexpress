import requests 
import json
import sys


url = [ "http://localhost:8000/api/customer", "http://localhost:4000/api/customer" ]
data_user = { 'email':'kjjhgfjhghjnk7@hotmail.fr',
       'pwd':'pkjwd',
              'firstname': 'mlkli7',
              'lastname': 'boko',
              'username':'fara',
              'jwt':'DSFDGSDFHR78568756756' 
        
        }

data = {
    'jwt':'45465TUYJTHRGFS76756',
    'cmds':'Light Blue,S,1,752@Caise,S,1,756@',
    'date':'04/04/2023',
    'adrs':'45 Zoumourouda, Hda zouhal',
}
data_bytes = json.dumps(data_user).encode('utf-8')

res = requests.post(url[int(sys.argv[1])],data_user)



print(res.text)