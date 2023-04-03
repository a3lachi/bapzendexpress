import requests
import base64
import json




imagepath = "/Users/farawa/bapzendexpress/public/images/1stCamoCap0.jpg"

name = "1stCamoCap0.jpg"

with open(imagepath, 'rb') as file:
    encoded_image = base64.b64encode(file.read())



api = '5482d4a2505ccf7870bf7c20b7421b16'
url = "https://api.imgbb.com/1/upload"

    
payload = {
    "expiration": "864000",
    "key": api,
    "image":encoded_image,
    "name":name,
}


response = requests.post(url, data=payload)

data = data_dict = json.loads(response.text)


print(data['data'])



# test="$(cat /Users/farawa/bapzendexpress/public/images/1stCamoCap0.jpg | base64)"
# curl --location --request POST "https://api.imgbb.com/1/upload?expiration=600&key=5482d4a2505ccf7870bf7c20b7421b16" --form "image=${test}"