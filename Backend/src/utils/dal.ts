import mysql from "mysql";

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Execute any sql query
function execute(sql: string, ...values: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {

        // Send query to DB
        connection.query(sql, values, async (err, result) => {

            // If there is an error executing a query:
            if (err) {
                reject(err);
                return;
            }

            // If all is ok then return the result
            resolve(result);
        })
    })
}

export default {
    execute,
}