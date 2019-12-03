module.exports = (db) => {

    let createPayroll = (request, response) => {
        console.log("in create Payroll controller")
        console.log(request.body);

        // db.contracts.isContractExist(request.body,(error,result)=>{
        //     if (result.exists) {

                db.payroll.createPayroll(request.body,(error,result)=>{
                    if (error) {
                      console.error('error getting Payroll', error);
                      response.status(500);
                      response.send('server error');
                    } else {
                        if( result === null ){
                            response.status(404);
                            response.send('not found');
                        }else{
                            console.log("PAYROLL CREATED")
                            response.send("Payroll Created" + result);
                        }
                    }
                })

        //     } else {
        //         console.log("NO CONTRACT")
        //         response.send("There is no contract")
        //     }
        // })
    };

    let getPayroll = (request, response) => {
        // console.log( db )
        db.payroll.get(request.params.id, (error, result) => {
            if (error) {
              console.error('error getting Payroll', error);
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
        createPayroll : createPayroll,
        getPayroll : getPayroll,
    }

};