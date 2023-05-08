import { db } from "../db/connection";

const DB_NAME = process.env.DB_NAME;
const TABLE_NAME = process.env.TABLE_NAME;

/**
 * @name searchPost
 * @description To search, sort and paginate post
 * @param {any} req incoming request body
 * @param {any} res response object
 */
async function searchPost(req: any, res: any) {
  try {
    const page = req.query.page;
    const size = req.query.size;
    const keyword = req.body.keyword;
    let sql: string = "";
    let match: string = "";

    if (keyword[0] == '"' && keyword[keyword.length - 1] == '"') {
      match = keyword.slice(1, keyword.length - 1);
    } else {
      match = keyword.replace(" ", "%");
    }
    match = "%" + match + "%";

    sql = `SELECT * FROM ${DB_NAME}.${TABLE_NAME} 
                WHERE LOWER(name) LIKE LOWER('${match}') 
                OR LOWER(description) LIKE LOWER('${match}') 
                ORDER BY name, dateLastEdited 
                LIMIT ${size} OFFSET ${size * (page - 1)}`;

    let response: any = {};

    let data = await executeQuery(sql);
    response.data = data;

    sql = `SELECT COUNT(*) as count FROM ${DB_NAME}.${TABLE_NAME} 
                WHERE LOWER(name) LIKE LOWER('${match}') 
                OR LOWER(description) LIKE LOWER('${match}')`;

    let totalCount: any = await executeQuery(sql);
    response.totalCount = totalCount[0].count;
    response.page = page;

    res.send(response);
  } catch (error: any) {
    res.status(500).send({ message: error.message || "Internal server error" });
  }
}


/**
 * @name executeQuery
 * @description to execute the sql query
 * @param {string} sql query to be executed
 * @returns Promise
 */
function executeQuery(sql: string) {
  return new Promise((resolve, reject) => {
    db.query(sql, (error: any, results: any) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
}

export default searchPost;