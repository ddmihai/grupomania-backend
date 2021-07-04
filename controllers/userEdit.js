const db = require('../connection/connection');

// change user status
exports.editUser = (req, res, next) => {
    const employeeUsername = req.params.id;

    const {isAdmin, fname, lname, username} = req.body;

    const sql = `
    UPDATE employees
    SET       emp_admin    =  '${isAdmin}'
    WHERE     emp_username =  '${employeeUsername}'
    `;

    if (isAdmin < 0 || isAdmin > 1) {
    res.json({ error: 'Required boolean input!'})
}
    else {
        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: 'Something went wrong!'})
            }
    
            else {
                res.json({ message: 'User ' + employeeUsername + ' updated!'})
            }
        })
    }
    
}