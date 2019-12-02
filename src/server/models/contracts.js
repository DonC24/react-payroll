module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

    let createContract = (contract, callback) => {
        const queryString = `INSERT INTO contracts (basicsalary, basichours, hourlyrate, daysperwk, user_id)
          VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [
          contract.basicsalary,
          contract.basichours,
          contract.hourlyrate,
          contract.daysperwk,
          contract.employee
        ];

        // execute query
        dbPoolInstance.query(queryString, values, (error, queryResult) => {
            if( error ){
            console.log("query error", error)
            callback(error, null);
            }else{
                if( queryResult.rows.length > 0 ){
                  callback(null, queryResult.rows[0]);
                }else{
                  callback(null, null);
                }
            }
        });
    };

    let getAContract = (id, callback) => {
        console.log(id)
        let query = "SELECT * FROM contracts WHERE user_id = $1"
        let arr = [id];

        dbPoolInstance.query(query, arr, (error, queryResult) => {
            if( error ){
                console.log("query error", error)
                callback(error, null);
            }else{
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows[0]);
                } else {
                    callback(null, null);
                }
            }
        });
    }


  return {
    createContract,
    getAContract
  };
};