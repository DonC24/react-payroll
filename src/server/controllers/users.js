var sha256 = require('js-sha256');
const SALT = "This is a payroll";


module.exports = (db) => {


    let signUp = (request, response) => {
        // console.log("in signup req")
        // console.log(request.body);
        request.body.password = sha256(request.body.password);
        request.body.email = request.body.email.toLowerCase();
        request.body.username = request.body.username.toUpperCase();
        db.users.isUserExist(request.body,(error,result)=>{
            if (!result.exists) {

                db.users.signUp(request.body,(error,result)=>{

                    if(result){
                        console.log("SIGN UP SUCCESS")
                        response.cookie("user_id", result.id);
                        response.cookie("user_name", result.firstname);
                        response.cookie("session", sha256(result.id + "logged_in" + SALT));
                        response.send(true)
                    }else{
                        console.log("SIGN UP FAIL")
                        response.send(false)
                    }
                })
            } else {
                console.log("EMAIL/USERNAME ALREADY EXISTS")
                response.send(false)
            }
        })
    };

    let login = (request, response) => {
        request.body.password = sha256(request.body.password);
        request.body.username = request.body.username.toUpperCase();
        db.users.getUserByUsername(request.body,(error,result)=>{
            if (result) {
                if (result.password === request.body.password){
                    console.log("USER & PASSWORD MATCHED");
                    response.cookie("user_id", result.id);
                    response.cookie("user_name", result.name);
                    response.cookie("session", sha256(result.id + "logged_in" + SALT));
                    response.send(result);
                }else{
                    console.log("PASSWORD DOES NOT MATCH");
                    response.send(false);
                }

            } else {
                console.log("USER OR PASSWORD DOES NOT EXIST")
                response.send(false)
            }

        })
    }

    let signOut = (request, response) =>{

        response.cookie("user_id", null)
        response.cookie("session", sha256(SALT))
        console.log("successful signout")
        response.send(true)
    }

    let getAllUsers = (request, response) => {
        console.log(request.params.id);
        db.users.getAllUsers(request.params.id,(error,result)=>{
            // console.log(result)
            if (result) {
                // if (result.company.id === request.body.company_id){
                    console.log("THERE ARE EMPLOYEES");
                    console.log(response);
                    response.send(result);
                // }else{
                    // console.log("DON'T HAVE SUCH A COMPANY");
                    // response.send(false);
                // }
            } else {
                console.log("DON'T HAVE SUCH A COMPANY")
                response.send(false)
            }
        })
    }

    let editProfileGeneral = async function (request,response){
        try{
            let user_id = request.cookies["user_id"];
            let editProfileGeneral = await db.users.editProfileGeneral(request.body,user_id);
            response.cookie("user_name", editProfileGeneral.firstname);
            response.send(true);
        }catch (error){
            console.log("edit profile general controller "+error)
        }
    }

    let editProfilePassword = async function (request,response){
        try{

            let user_id = request.cookies["user_id"];
            //check old password, if tally only change password
            let user_info = await db.users.getUserDetailsById(user_id);
            if(user_info.password === sha256(request.body.old_password)){
                let changePassword = await db.users.changePassword(sha256(request.body.new_password),user_id);
                response.send(true)
            }else{
                console.log("old password is wrong");
                response.send(false);
            }
        }catch (error){
            console.log("edit profile password controller"+error)
        }
    }


    let getUserInfo = async function(request,response){
        try{
            let user_id = request.cookies["user_id"];
            let result = await db.users.getUserDetailsById(user_id);
            response.send(result)
        }catch (error){
            console.log("get user info controller "+ error)
        }
    }

    return {
        getAllUsers : getAllUsers,
        signUp : signUp,
        login : login,
        signOut : signOut,
        editProfileGeneral : editProfileGeneral,
        editProfilePassword : editProfilePassword,
        getUserInfo : getUserInfo
    }

};