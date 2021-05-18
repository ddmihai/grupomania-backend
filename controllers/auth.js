const db =              require('../connection/connection');
const bcrypt =          require('bcrypt');
const saltRounds = 10;
const jwt =             require('jsonwebtoken');
require('dotenv').config();


// signup controller
exports.signup = async (req, res, next) => {
    const {fname, lname, username, password } = req.body;
    bcrypt.genSalt(saltRounds, function(error, salt) {
    if (error) throw error;

    bcrypt.hash(password, salt, (err, hash) => {
        const sql = `INSERT INTO employees (emp_fname, emp_lname, emp_username, emp_password)
         VALUES ('${fname}', '${lname}', '${username}', '${hash}')`;
    
        db.query(sql, function (error, results) {
                if (error) return res.send('Username must be unique!');
                
                // ressource created throw the user to frontend
                res.status(201).json({
                    message: 'User Created',
                    userID: results.insertId
                });
              })   
        });
    })
}


// login middleware
exports.login = async (req, res, next) => {
    const {username, password} = req.body;
    const sql = `SELECT * FROM employees WHERE '${username}' = emp_username`;

    await db.query(sql, (error, result) => {
        if (error) throw error;

        if (result.length) {
            result.forEach((row) => {
                bcrypt.compare(password, row.emp_password, (error, result) => {
                    if (error) throw error;
                    
// JWT
const token = jwt.sign(
    { userId: row.emp_ID },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '4h' });

                    if (result) {
                        res.status(200).json({
                             user: row,
                             token: token
                        })
                    }

                    if (!result) {
                        res.json({ message: 'Credential Error!'})
                    }
                    
                })
            })
        }

        else if (result.length == 0) {
            res.json({ message: 'Credential Error!'})
            res.end();
        }   
    })
}

