const db = require('../connection/connection');

// Get a user and make sure that requesting user is valid and is from HR department 
exports.getUser = (req, res, next) => {
const requestedUsername = req.params.id;
const { loggedUserName } = req.body;

    //    validating the logged user
const sql = `SELECT * FROM employees WHERE
                emp_username  = '${loggedUserName}'  AND
                emp_admin = 1       
   `;

const sql2 = `SELECT * FROM employees WHERE
   emp_username  = '${requestedUsername}'       
`;

const getUserSql2 = () => {
        db.query(sql2, (error, result) => {
            if (error) throw error;

            if (result.length == 0) {
                res.json({
                    message: 'Whoops! Not found'
                })
            } else if (result.length > 0) {
                res.json({
                    user: result
                })
            }
        })
    }

const user = () => {
        db.query(sql, (error, result) => {
            if (error) throw error;

            if (result.length == 0) {
                res.json({
                    message: 'Whoops! Unauthrised'
                })
            } else if (result.length > 0) {
                getUserSql2();
            }
        })
    }
    user();
}


// Delete a user
exports.deleteUser = (req, res, next) => {
    const requestedDelete = req.params.id;
    const sql = `DELETE FROM employees WHERE emp_username = '${requestedDelete}'`;

    db.query(sql, (error, result) => {
        if (error) throw error;

        if (result.affectedRows > 0) {
            res.json({ request: 'User ' + requestedDelete + ' deleted!' })
        }

        else if (result.affectedRows == 0) {
            res.json({ error: 'Something wrong. Please check the requested username!'})
        }
    })
} 