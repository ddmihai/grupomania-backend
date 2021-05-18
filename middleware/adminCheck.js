const db = require('../connection/connection');

// check if the username exists and if is admin
module.exports = (req, res, next) => {
    const username = req.body.adminUsername;
    const sql = `SELECT * FROM employees WHERE
    emp_username = '${username}' AND emp_admin = 1`;

    db.query(sql, (error, results) => {
        if (error) {
            res.sendStatus(500);
        }

        else if( results.length == 0) {
            res.sendStatus(403);
        }       

        else if( results.length > 0) {
            next();
        }
    })

       

};