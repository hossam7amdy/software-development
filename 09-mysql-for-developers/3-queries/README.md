# Queries

## EXPLAIN overview

- **ID**: A unique identifier for the query being executed.
- **Select Type**: Tells us the type of select statement is being executed. This can be [simple, primary, union], or a few others.
- **Table**: The name of the table being accessed.
- **Partitions**: Displays the partitions being accessed for the query (beyond the scope of this course).
- **Type**: The kind of access MySQL used to retrieve the data. This is one of the most important column values.
- **Possible Keys**: The possible indexes that MySQL could use.
- **Key**: The actual index that MySQL uses.
- **Key Length**: Displays the length of the index used by MySQL.
- **Ref**: The value being compared to the index.
- **Rows**: An estimated number of rows that MySQL needs to examine to return the result.
- **Filtered**: The estimated percentage of rows that match the query criteria.

## EXPLAIN access types

There are a few different access types that MySQL can use to retrieve data. These are some of them sorted by efficiency:

- **const**: This is the most efficient access type. It is used when you are accessing a single row by its primary key.
- **eq_ref**: This is used for joins where the index being accessed is a primary key or unique key.
- **ref**: This is used for joins where the index being accessed is not a primary key or unique key
- **fulltext**: This is used for full-text searches (e.g. WHERE MATCH(col) AGAINST('val')).
- **range**: This is used for ranges on indexed columns (e.g. WHERE col BETWEEN 1 AND 10).
- **index**: This is used for index scans (e.g. WHERE col LIKE 'val%').
- **ALL**: This is the least efficient access type. It is used when you are scanning the entire table.

## EXPLAIN ANALYZE

There are different formats of explain:

- Explain tree: `EXPLAIN FORMAT=tree SELECT ...`
- Explain JSON: `EXPLAIN FORMAT=JSON SELECT ...`
- Explain ANALYZE: `EXPLAIN ANALYZE SELECT ...`

## Index obfuscation

Wrapping a column in a function will prevent MySQL from using an index on that column. For example, if you have an index on the `name` column, the following query will not use the index:

```sql
SELECT * FROM users WHERE UPPER(name) = 'JOHN';
```

## Redundant and approximate conditions

We can _unlocking indexes_ with redundant and approximate conditions in MySQL.
For example, if you have an index on the `price` column, and you want to find price  
with tax that is less than 100, you can use the following query:

```sql
SELECT * FROM products
WHERE
  price * tax < 100
AND
  price < 100; -- Redundant condition that unlocks the index
```

## Select only what you need

One of the oldest pieces of advice for improving query performance is to only select the columns you need.  
This is especially true when you have large columns (e.g. TEXT or BLOB columns).

## Limiting rows

Only asks the database for the data that you actually need, this makes your queries remains as performant as possible.

## An overview of joins

- **Inner join**: Returns rows when there is a match in both tables.
- **Left (outer) join**: Returns all rows from the left table, and the matched rows from the right table.
- **Right (outer) join**: Returns all rows from the right table, and the matched rows from the left table.
- **Full (outer) join**: Returns all rows when there is a match in one of the tables.

## Indexes joins

Joins can be indexed in MySQL. This is done by creating an index on the foreign key  
column in the child table. If you miss this index, MySQL will have to do a full table  
scan on the child table to find the matching rows.

## Subqueries

Subqueries are queries that are nested inside another query. They can be used in the SELECT, FROM, WHERE, and HAVING clauses.

Subqueries in MySQL are a powerful tool for filtering data efficiently. MySQL can optimize your subqueries using the semi-join  
and anti-join optimization techniques. It's important to optimize your queries and test them with your dataset to ensure they  
perform well under various conditions!

If you want to learn more about subqueries in MySQL, check out Chapter 8 on optimizations in the MySQL documentation.  
This resource is a treasure trove of information that can help you become an expert in MySQL.

## Common table expressions (CTEs)

Common table expressions (CTEs) are temporary named result sets that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement. They are similar to views, but they are only available for the duration of the query.

CTEs are useful for recursive queries, and queries that use window functions. They can also be used to improve the readability of complex queries.

```sql
WITH cte_name AS (
  SELECT ...
)
SELECT * FROM cte_name;
```

## Recursive CTEs

Recursive CTEs are a special type of CTE that reference themselves. They are useful for querying hierarchical data, such as organizational charts or bill of materials.

Recursive CTEs are supported in MySQL 8.0.1 and above. If you are using an older version of MySQL.

```sql
-- Syntax
WITH RECURSIVE cte_name AS (
  SELECT ...
  UNION ALL
  SELECT ...
)
SELECT * FROM cte_name;

-- Example
WITH RECURSIVE all_dates AS (
SELECT CURRENT_DATE AS dt
UNION ALL
SELECT dt - INTERVAL 1 MONTH FROM all_dates WHERE dt > CURRENT_DATE - INTERVAL 29 YEAR
)

SELECT * FROM all_dates
```

## Window functions

Window functions are a special type of function that operate on a set of rows, and return a single value for each row. They are similar to aggregate functions, but they do not group the rows into a single output row.

_Note_: While window functions can be powerful, they can also be resource-intensive, especially when working with large result sets. Consider the performance implications of using window functions before including them in your queries.

```sql
-- Syntax
SELECT
  col1,
  col2,
  ...
  window_function(col3) OVER (window_name1) AS col6
FROM table_name
WINDOW
  window_name1 AS (
    PARTITION BY col4
    ORDER BY col5
    ROWS/RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  )
  window_name2 AS (
    PARTITION BY col7
    ORDER BY col8
    ROWS/RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  )
ORDER BY col1, col2, ...;
```

### Window function types

- **Aggregate**: These functions return a single value for each group of rows.
- **Ranking**: These functions assign a rank to each row based on the values in a set of rows.
- **Row numbering**: These functions assign a sequential integer to each row based on the values in a set of rows.
- **Offset**: These functions return a value from a row at a specific offset.
- **Lag and lead**: These functions return a value from a row at a specific physical offset.

## Sorting

Using indexes and optimized sorting methods is critical for efficiently ordering query results in MySQL. By adding indexes to our tables, we can reduce the need for secondary sorting operations and improve query performance.

In order to ensure that our rows are returned in the same order every time, our sorting must be _deterministic._ In many cases, this involves sorting by a unique identifier or primary key.

**Sorting with multi-column indexes** can be a powerful tool for improving database performance. It's important to follow the established rules on index creation and access patterns. By unlocking key parts and forming left prefixes, we can avoid file sorting and make use of all key parts in our index. Additionally, we must ensure that the sorting direction in our query matches the ordering of our key parts. With these techniques, we can take full advantage of multi-column indexes in MySQL.

## Counting results

- _COUNT()_ function ignores NULL values.
- The COUNT() function returns the number of rows in a result set.
- With the DISTINCT keyword to count the number of distinct values in a result set.
- It can be used with conditionals to count the number of rows that match a condition.

```sql
SELECT
  SUM(DAYOFWEEK(rental_date) IN (1, 7)) AS weekend_rentals,
  SUM(DAYOFWEEK(rental_date) NOT IN (1, 7)) AS weekday_rentals,
  COUNT(return_date) AS completed_rentals,
  COUNT(*) AS total_rentals
FROM
  rental;
```

## Dealing with NULLs

Null values are a reality of working with databases, but they can often cause headaches if not handled properly. By using the null-safe equal operator `<=>`, the is `null` and is `not null` operators, and the `ifnull` statement or `coalesce()` function, we can effectively deal with null values in our SQL queries. With these tools in our toolkit, we can ensure that our queries are working as expected and that we’re getting accurate and complete results.
