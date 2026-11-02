import json,os,urllib.request,sys
K=os.environ['HEDRA_API_KEY']
for model,inp in [("gpt-image-2",{"prompt":"x","aspect_ratio":"4:3","resolution":"2K","quality":"medium","output_format":"jpeg","num_outputs":1}),("gpt-image-2",{"prompt":"x","aspect_ratio":"4:3","resolution":"2K","quality":"high","output_format":"jpeg","num_outputs":1}),("gpt-image-2",{"prompt":"x","aspect_ratio":"4:3","resolution":"1K","quality":"high","output_format":"jpeg","num_outputs":1})]:
  r=urllib.request.Request("https://api.hedra.com/v3/models/%s/estimate"%model,method="POST",data=json.dumps({"input":inp}).encode(),headers={'X-API-Key':K,'Content-Type':'application/json'})
  print(inp['resolution'],inp['quality'],json.load(urllib.request.urlopen(r)))
