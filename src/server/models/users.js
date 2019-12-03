var format = require('pg-format');

module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope

    let signUp = (userInfo,callback)=>{
        let query = 'INSERT INTO users (username, name, email, password, nationality, ethnic, birthdate, admin) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *'
        let arr = [userInfo.username, userInfo.name, userInfo.email,userInfo.password, userInfo.nationality, userInfo.ethnic,userInfo.birthdate, userInfo.admin]

        dbPoolInstance.query(query,arr,(error,queryResult)=>{
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows[0]);
                } else {
                    callback(null, null);
                }
            }
        })
    }

    let isUserExist = (userInfo, callback) => {
        let query = "SELECT EXISTS (SELECT * FROM users WHERE email=$1)"
        let arr = [userInfo.email];

        dbPoolInstance.query(query, arr, (error, queryResult) => {
            if (error) {
                callback(error, null);

            } else {
                if (queryResult.rows.length > 0) {

                    callback(null, queryResult.rows[0]);
                } else {
                    callback(null, null);
                }
            }
        });
    }

    let getUserByUsername = (userInfo,callback) =>{
        let query = "SELECT * FROM users WHERE username = $1"
        let arr = [userInfo.username]

        dbPoolInstance.query(query, arr, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {

                    callback(null, queryResult.rows[0]);
                } else {
                    callback(null, null);
                }
            }
        });
    }

    let getAllUsers = (userInfo, callback) => {
        console.log(userInfo)
        let query = "SELECT * FROM users WHERE company_id = $1"
        let arr = [userInfo]

        dbPoolInstance.query(query, arr, (error, queryResult) => {
            if (queryResult.rows.length > 0) {
                callback(null, queryResult.rows);
            } else {
                callback(null, null);
            }
        });
    }


    let getUserDetailsById = async function (user_id){
        try{
            let query = 'SELECT * FROM users WHERE id = $1'
            let arr = [user_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("GET USER DETAILS BY ID SUCCESS");
                console.log(queryResult.rows[0])
                return queryResult.rows[0];
            }else{
                return Promise.reject(new Error("get user details by id return null"));
            }
        } catch (error){
            console.log("get user details by id " +error)
        }
    }

    let deleteGroup = async function(group_id){
        try{
            let query = 'DELETE FROM groups WHERE id = $1 RETURNING *';
            let arr = [group_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("DELETE GROUP SUCCESS");
                return queryResult.rows[0];
            }else{
                return Promise.reject(new Error("delete group return null"));
            }

        }catch (error){
            console.log("delete group model" +error)
        }
    }

    let editProfileGeneral = async function (user_info,user_id){
        try{
            let query = 'UPDATE users SET firstname=$1,lastname=$2 WHERE id=$3 RETURNING *' ;
            let arr = [user_info.firstName,user_info.lastName,user_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("EDIT PROGILE GENERAL SUCCESS");
                return queryResult.rows[0];
            }else{
                return Promise.reject(new Error("edit profile general returns null"));
            }

        } catch (error){
            console.log("edit profile general model "+error)
        }
    }

    let changePassword = async function (new_password,user_id){
        try{
            let query = 'UPDATE users SET password = $1 WHERE id =  $2 RETURNING *';
            let arr = [new_password,user_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("CHANGE PASSWORD SUCCESS");
                return queryResult.rows[0];
            }else{
                return Promise.reject(new Error("change password return null"));
            }
        }catch (error){
            console.log("change password model "+error)
        }
    }



    return {
        getAllUsers,
        signUp,
        isUserExist,
        getUserByUsername,
        getUserDetailsById,
        editProfileGeneral,
        deleteGroup,
        changePassword
    };
};