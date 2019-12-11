module.exports = (db) => {

    let createContract = (request, response) => {
        console.log("in create contract controller")
        console.log(request.body);
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
                    response.send("Contract Created" + result);
                }
            }
        })
    };

    let getContract = (request, response) => {
        // console.log( db )
        db.contracts.getContract(request.params.id, (error, result) => {
            if (error) {
              console.error('error getting contract', error);
              response.status(500);
              response.send('server error');
            } else {
                if( result === null ){
                    // response.status(404);
                    response.send(false);
                }else{
                    response.send(result);
                }
            }
        });
    };

    return {
        createContract : createContract,
        getContract : getContract,
    }

};