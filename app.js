var multer      = require('multer');

var MongoClient = require('mongodb').MongoClient;
const csvtojson = require("csvtojson");


	var storage = multer.diskStorage({  
      
    filename:(req,file,cb)=>{  
        cb(null,file.originalname);  
    }  
});  
  
var uploads = multer({storage:storage});  


function creation(req,url,name){
csvtojson()
  .fromFile(req.file.path)
  .then(csvData => {
    //console.log(csvData);
MongoClient.connect(url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
	if (name==''){
		name=req.file.filename.substring(0,filename.lastIndexOf('.'));
	}
        if (err) throw err;
		  
   
        client
          .collection(name)
          .insertMany(csvData, (err, rest) => {
            if (err) throw err;

            console.log(`Inserted: ${rest.insertedCount} rows`);
			console.log("table in database"+name);
				//
            //client.close();
			
		
          });
      
	  }
)
	
})
	return;

}

module.exports.uploads=uploads;

module.exports.creation=creation;