module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

    let createPayroll = (userInfo, callback) => {

        const queryString = `INSERT INTO payroll (month, allowance, grosssalary, ethnicamt, companyrate, companycpf, employeerate, employeecpf, totalcpf, totalded, netsalary, user_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;
        const values = [
          userInfo.month,
          userInfo.allowance,
          userInfo.grosssalary,
          userInfo.ethnicamt,
          userInfo.companyrate,
          userInfo.companycpf,
          userInfo.employeerate,
          userInfo.employeecpf,
          userInfo.totalcpf,
          userInfo.totalded,
          userInfo.netsalary,
          userInfo.employee
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



    let getPayroll = (id, callback) => {
        console.log(id)
        let query = "SELECT * FROM Payrolls WHERE user_id = $1"
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
    createPayroll,
    getPayroll,

  };
};