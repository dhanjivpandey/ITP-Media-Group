
var searchcodesModel = require('../model/searchCodes');

exports.getZipCodes = function (req, res) { 

    var searchStr = req.body.search.value;

    
    if(req.body.search.value)
    {
            var regex = new RegExp(req.body.search.value, "i")
            searchStr = { $or: [{'tconst':regex },{'titleType':regex },{'primaryTitle': regex},{'originalTitle': regex },{'genres': regex }] };
    }
    else
    {
         searchStr={};
    }

    var recordsTotal = 0;
    var recordsFiltered=0;
    
     

    searchcodesModel.estimatedDocumentCount({}, function(err, c) {
        recordsTotal=c; 
        console.log(c);
        searchcodesModel.estimatedDocumentCount(searchStr, function(err, c) {
            recordsFiltered=c;
            console.log(c);
            console.log(req.body.start);
            console.log(req.body.length);
            searchcodesModel.find(searchStr, 'tconst titleType primaryTitle originalTitle genres',{'skip': Number( req.body.start), 'limit': Number(req.body.length) }, function (err, results) { 
                    
                    if (err) {
                        console.log('error while getting results'+err);
                        return;
                    }
            
                    var data = JSON.stringify({
                        "draw": req.body.draw,
                        "recordsFiltered": recordsFiltered,
                        "recordsTotal": recordsTotal,
                        "data": results
                    });
                    res.send(data);
                });
        
          });
   });
   
     


    


};

