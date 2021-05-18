###### Endpoints

# 1----            '/api/signup'
this endpoint store the password safely in the database. the requested body is an object which contains 
# requests {fname, lname, username(unique), password, department}  
# offers {message, userID}


# 2----           '/api/login'
this endpoint compare the password with the hashed password from the database
this returns the whole row with the help of COMPARE


######            USER OPERATIONS      ######
# 3----           '/api/:id'
this endpoint returns a user with a certain username
here, the server require the ID of the oser which makes the requests, validate it to be sure that ID is valid and department if the HR ONLY
and response with the requested user object
This object have as URL parameters the username, and as requested object have the requesting username from the body