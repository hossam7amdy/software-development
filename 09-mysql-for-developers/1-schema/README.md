# Schema

## Writing a schema

- Pick the smallest data type that will hold all of your data
- Pick the simplest column type that accurately reflects your data (e.g. use a numeric type for numbers, not a string)
- Ensure your schema accurately reflects the reality of your data (e.g. don't make a non-nullable column nullable)

## Why schema design matters?

- Fast data access
- Efficient indexing

## Integers

| Type          | Storage (bytes) | Min Signed           | Max Signed          | Min Unsigned | Max Unsigned         |
| ------------- | --------------- | -------------------- | ------------------- | ------------ | -------------------- |
| TINYINT       | 1               | -128                 | 127                 | 0            | 255                  |
| SMALLINT      | 2               | -32768               | 32767               | 0            | 65535                |
| MEDIUMINT     | 3               | -8388608             | 8388607             | 0            | 16777215             |
| INT (INTEGER) | 4               | -2147483648          | 2147483647          | 0            | 4294967295           |
| BIGINT        | 8               | -9223372036854775808 | 9223372036854775807 | 0            | 18446744073709551615 |

## Decimals

- _DECIMAL_: a fixed-precision data type that stores exact values.
- _NUMERIC_: an alias for DECIMAL, the two are the same thing in MySQL.
- _FLOAT_: a floating-point data type that stores approximate values.
- _DOUBLE_: a floating-point data type that stores larger and more precise values than FLOA

### Use cases

- Use DECIMAL for storing exact numeric values (e.g, currency, financial data)
- Use FLOAT or DOUBLE for scientific calculations

## Strings

| Type      | Description                                    |
| --------- | ---------------------------------------------- |
| CHAR      | fixed length character                         |
| VARCHAR   | variable length character                      |
| BINART    | fixed length binary                            |
| VARBINARY | variable length binary                         |
| BLOB      | binary large object                            |
| TEXT      | variable length character                      |
| ENUM      | enumeration                                    |
| SET       | a string object that can have 0 or more values |

- `Charset`: a set of symbols and encodings (e.g, ASCII, UTF-8)
- `Collation`: a set of rules for comparing characters in a charset (e.g, case-sensitive, accent-sensitive)
- use `utf8mb4` as the default charset and `utf8mb4_0900_ai_ci` as the default collation

### Best practices

When using text or blob columns, it's important to consider two things:

1. how much data you need to store and
2. how you will access that data.

Here are some best practices to keep in mind:

- Only select the columns that you need: Because of how large TEXT and BLOB columns are stored on the disk, it's best to only select them when you need them. Refactor your data so that BLOB columns can be joined in when necessary.
- Don't index or sort entire columns: Because of the size of TEXT and BLOB columns, it's not feasible to index or sort on the entire column. You should only index or sort on a prefix of the column.
- Use VARCHAR columns for smaller amounts of data: If you only need to store a few hundred characters, consider using VARCHAR instead of text columns. This can help with indexing and sorting.

## Enum

ENUM is a string object with a value chosen from a list of permitted values that are enumerated explicitly in the column specification at table creation time.

### Pros

- Data integrity: only values from the list can be inserted into the column
- Readability: the values are meaningful
- Compactness: ENUM values are stored as integers

### Cons

- Adding new values requires an ALTER TABLE statement
- Ordering is based on the order of the values in the list

**Note**: Finally, it's important to note that integer enums can be confusing and should be avoided if possible. If you must use integer enums, it's best to use a `TINYINT` column instead.

## Dates

| Type      | Bytes | Min                 | Max                 | Description         |
| --------- | ----- | ------------------- | ------------------- | ------------------- |
| DATE      | 3     | 1000-01-01          | 9999-12-31          | YYYY-MM-DD          |
| DATETIME  | 8     | 1000-01-01 00:00:00 | 9999-12-31 23:59:59 | YYYY-MM-DD HH:MM:SS |
| TIMESTAMP | 4     | 1970-01-01 00:00:01 | 2038-01-19 03:14:07 | YYYY-MM-DD HH:MM:SS |
| YEAR      | 1     | 1901                | 2155                | YYYY                |
| TIME      | 3     | -838:59:59          | 838:59:59           | HH:MM:SS            |

## JSON

JSON is a data interchange format that is lightweight, language independent, and easy for humans to read and write. JSON is built on two structures:

- A collection of name/value pairs. In various languages, this is realized as an object.
- An ordered list of values. In most languages, this is realized as an array, vector, list, or sequence.

### Accessing JSON keys & values

```sql
SELECT info->"$.name" AS name FROM users;
```

### JSON functions

- `JSON_EXTRACT`: extracts a value from a JSON string
- `JSON_UNQUOTE`: removes quotes from a JSON string
- `JSON_SEARCH`: searches a JSON string for a specified value and returns the path of the first occurrence
- `JSON_CONTAINS`: checks whether a specified value exists in a JSON string or not
- `JSON_VALID`: checks whether a string is valid JSON or not

### JSON operators

- `->`: extracts a value from a JSON string
- `->>`: extracts a string from a JSON string
- `#>`: extracts a value from a JSON array
- `#>>`: extracts a string from a JSON array

### Indexing JSON columns

MySQL supports indexing JSON columns using functional indexes. This means that you can create an index on a generated value from the JSON column. For example, you can create an index on the `name` field in the `info` column of the `users` table:

```sql
CREATE INDEX idx_name ON users((info->"$.name"));
```

### When and Why to use JSON

- where there is no well-defined schema or the schema changes frequently.
- payloads from third-party services or APIs that have different response formats.
- nested or hierarchical data that doesn't fit into a relational database design

## Unexpected types

- `BOOLEAN`: alias for `TINYINT(1)`
- `ZIPCODE`: alias for `VARCHAR(5)`
- `IP ADDRESS`: alias for `VARCHAR(15)`, use `INET_` instead

## Generate Columns

- `VIRTUAL`: a generated column whose value is computed when it's read
- `STORED`: a generated column whose value is computed when it's written

### Use cases

- Extracting data from JSON columns
- Performing calculations on columns
- Normalizing data

```sql
CREATE TABLE emails (
  email varchar(255),
  domain varchar(255) AS (substring_index(email, '@', -1))
);
```

## Schema Migration

### Best practices for migrations

When it comes to writing migrations, it's best to agree with your team on the best practices for your team. Here are a few you might consider:

- Always include explicit SQL statements to show how the database will move from one state to another.
- Avoid using down migrations, which can lead to issues if the down method doesn't completely undo what the up method did.
- Utilize version control to keep track of changes to your schema over time.
