import requests
import base64
import json

import os 


images = os.listdir('bapzendexpress/public/images')


imagepath = "/Users/farawa/bapzendexpress/public/images/"

def payload(image) :
  with open(imagepath+image, 'rb') as file:
      encoded_image = base64.b64encode(file.read())

  payload = {
      "expiration": "864000",
      "key": api,
      "image":encoded_image,
      "name":image,
  }



api = '5482d4a2505ccf7870bf7c20b7421b16'
url = "https://api.imgbb.com/1/upload"

    



response = requests.post(url, data=payload())

data = data_dict = json.loads(response.text)


print(data['data'])



# test="$(cat /Users/farawa/bapzendexpress/public/images/1stCamoCap0.jpg | base64)"
# curl --location --request POST "https://api.imgbb.com/1/upload?expiration=600&key=5482d4a2505ccf7870bf7c20b7421b16" --form "image=${test}"