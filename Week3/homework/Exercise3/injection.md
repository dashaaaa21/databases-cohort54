### 3.3. Exercise 3 : SQL injection

You are given the below function which returns the population of a specific country from the [world](../Week1/world.sql)
database.

```js
function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}
```
1. Give an example of a value that can be passed as `name` and `code` that would take advantage of SQL-injection and (
   fetch all the records in the database)
- Hackers use: 101 OR 1=1
- 1=1 is always true → so the database shows ALL rows.
- This is bad because it shows secret data.
- SELECT * FROM products
- WHERE name = '' OR 1=1 --';

2. Rewrite the function so that it is no longer vulnerable to SQL injection
- If write - 101; DROP database mydb;- This can delete the whole database. Very dangerous.

3.
```js
function getPopulation(Country, name, code, cb) {
    const query = `SELECT Population FROM ${Country} WHERE Name = $1 AND code = $2`;
    conn.query(query, [name, code], function (err, result) {
        if (err) return cb(err);
        if (result.length === 0) return cb(new Error("Not found"));
        cb(null, result[0].population);
    });
}

```

- We need use 
``` $1 and $2 ```
instead of 'name' and 'code'
- User input goes into an array, not directly into the SQL text.
- The database treats input as data, not as SQL code.
- General need: Never put raw text from the user into SQL, validate input, clean all user input