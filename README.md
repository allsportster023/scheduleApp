# Scheduling App
Schedule Smartly


Download SOLR from the Apache Mirrors:
http://lucene.apache.org/solr/

Extract the downloaded file in whichever directory you want to run SOLR from:
```
$ cp <location of SOLR tgz file> <location that you want it>
$ cd <location that you want>
$ tar zxf solr-x.y.z.tgz
```

Start SOLR
```
$ bin/solr start
```
OR
```
$ bin/solr start -e cloud -noprompt
```

Check the SOLR instance by checking the Admin Console
> http://localhost:8983/solr/


TO DELETE EVERYTHING FROM A COLLECTION
```
curl http://localhost:8983/solr/<<COLLECTION_NAME>>/update?commit=true -d '<delete><query>*:*</query></delete>'
```

TO ADD DATA TO COLLECTION FROM A JSON FILE
```
curl 'http://localhost:8983/solr/<<COLLECTION_NAME>>/update?commit=true' --data-binary @/Users/<<USERNAME>>/workspace/basicApp/src/data/fileWithData.json -H 'Content-type:application/json'
```
