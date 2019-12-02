module.exports = (db) => {

    let createContract = (request, response) => {
        // console.log("in create contract controller")
        // console.log(request.body);
        db.contracts.createContract(request.body,(error,result)=>{
            if (error) {
              console.error('error getting contract', error);
              response.status(500);
              response.send('server error');
            } else {
                if( result === null ){
                    response.status(404);
                    response.send('not found');
                }else{
                    console.log("CONTRACT CREATED")
                    response.send(result);
                }
            }
        })
    };

    let getAContract = (request, response) => {
        // console.log( db )
        db.contracts.get(request.params.id, (error, result) => {
            if (error) {
              console.error('error getting contract', error);
              response.status(500);
              response.send('server error');
            } else {
                if( result === null ){
                    response.status(404);
                    response.send('not found');
                }else{
                    response.send(result);
                }
            }
        });
    };

    return {
        createContract : createContract,
        getAContract : getAContract,
    }

};