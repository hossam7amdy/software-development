# Practical examples

## MD5 Columns

One way to create an equality index for a TEXT column is to add an MD5 hash virtual generated column. An MD5 hash is a 128-bit value that can be calculated for any file, text string, or other data input.

```sql
ALTER TABLE urls ADD COLUMN url_md5 CHAR(32) GENERATED ALWAYS AS (MD5(url));
```

**Binary strings:** When creating an MD5 hash virtual generated column, it is important to specify the data type. Since we're only ever going to be comparing sets of bytes rather than characters, we can use BINARY(16) for a more efficient search.

```sql
ALTER TABLE urls ADD COLUMN url_md5 binary(16) GENERATED ALWAYS AS (UNHEX(MD5(url)));
```

### MD5 Indexes Over Multiple Columns

```sql
ALTER TABLE addresses ADD COLUMN md5 BINARY(16) GENERATED ALWAYS AS (
  UNHEX(MD5(
    CONCAT_WS('|', primary_line, secondary_line, urbanization, last line)
  ))
);
```

_Note_ that we are using MD5 hash concatenated with separator (`|`). The first value passed in is the separator. We use the `CONCAT_WS` function to combine all four columns and then generate the MD5 hash.

### Binary vs. character columns

_Note_ that because the MD5 column is a binary column (a string of bytes, not characters), we must use the UNHEX function to convert the characters to a binary string.

## Bitwise Operations

Storing flags in a TINYINT column - a tradeoff between space and readability

### Using a tiny integer column

Suppose we have a users table and we want to add a column to store true/false flags. Instead of using a JSON column, we can use a tiny integer column to store multiple bits of information in a single field. Let's see how this works.

```sql
ALTER TABLE users ADD COLUMN flags TINYINT UNSIGNED DEFAULT 0;
```

### Bits and bytes

suppose we have the following eight flags:

1. dark_mode
2. super_admin
3. notification_opt_in
4. metered_billing
5. rollout_chat
6. experiment_blue
7. log_verbose
8. new_legal_disclaimer

```
00000000
│││││││└─ Bit 1: dark_mode
││││││└── Bit 2: super_admin
│││││└─── Bit 3: notification_opt_in
││││└──── Bit 4: metered_billing
│││└───── Bit 5: rollout_chat
││└────── Bit 6: experiment_blue
│└─────── Bit 7: log_verbose
└──────── Bit 8: new_legal_disclaimer
```

Setting flags

```
   ┌───── Bit 5: rollout_chat            ┐
   │                                     ├─ These are set to 1, therefore true
   │   ┌─ Bit 1: dark_mode               ┘
00010001
│││ ││└── Bit 2: super_admin             ┐
│││ │└─── Bit 3: notification_opt_in     │
│││ └──── Bit 4: metered_billing         ├─ These are set to 0, therefore false
││└────── Bit 6: experiment_blue         │
│└─────── Bit 7: log_verbose             │
└──────── Bit 8: new_legal_disclaimer    ┘
```

To convert this to an integer value, we can add up the decimal value of each bit that is turned on.

```
00010001
   │   └─ dark_mode    = 1
   └───── rollout_chat = 16
                        ────
                         17
```

### Querying the flags

Get all users who have dark mode enabled

```sql
SELECT * FROM users WHERE flags & 1 = 1;
```

Find all users who have both the dark_mode and rollout_chat flags turned on

```sql
SELECT * FROM users WHERE flags & 17 = 17;
```

### Tradeoffs

- **Readability:** The bitwise operations are not very readable. It's not obvious what the number 17 means.
- **Limited Number of Flags:** We are limited to 8 flags per column.
- **Application Logic Overhead:** we need to write additional application logic that maps the flags to their corresponding bit values. This can add complexity to the codebase.

## Claiming Rows

Claiming rows is a common pattern in applications where multiple workers are processing a queue of jobs. The idea is that each worker will claim a set of rows to process, and then update the rows to indicate that they are being processed. This prevents other workers from processing the same rows.

### Updating claimed rows

```sql
UPDATE imports
SET
  owner = 32, -- unique worker id
  available = 0
WHERE
  owner = 0
  AND
  available = 1
LIMIT 1;
```

### Checking claimed rows

```sql
SELECT
  *
FROM
  imports
WHERE
  owner = 32;
```

_Note_: If you need a more robust queue driver, consider using Redis instead. Redis is specifically designed for queueing and can handle much larger workloads than MySQL. However, for smaller queues or lightweight processes, MySQL can be a viable option.

## Summary Tables

Summary tables are a common pattern in data warehousing. The idea is that you can pre-aggregate data in a summary table to speed up queries. For example, if you have a table of orders, you can create a summary table that contains the total number of orders per day. This will allow you to quickly query the total number of orders for a given day without having to scan the entire orders table.

### Creating a summary table

```sql
CREATE TABLE payment_summary (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  amount DECIMAL(9,2),
  `year` YEAR,
  `month` TINYINT UNSIGNED
);
```

### Populating the summary table

```sql
SELECT
  sum(amount) as amount,
  YEAR(payment_date) as `year`,
  MONTH(payment_date) as `month`
FROM
  payments
WHERE
  payment_date < DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')
GROUP BY
  `year`, `month`
```

### Combining summary tables with views

```sql
SELECT
  amount,
  year,
  month
FROM
  payment_summary

UNION ALL

SELECT
  sum(amount) as amount,
  YEAR(payment_date) as `year`,
  MONTH(payment_date) as `month`
FROM
  payments
WHERE
  payment_date >= DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')
```

### Using a common table expression

```sql
WITH payment_data AS (
  SELECT
    amount,
    year,
    month
  FROM
    payment_summary

  UNION ALL

  SELECT
    sum(amount) as amount,
    YEAR(payment_date) as `year`,
    MONTH(payment_date) as `month`
  FROM
    payments
  WHERE
    payment_date >= DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')
)

SELECT * FROM payment_data
```

## Meta Tables

Meta tables are a common pattern in applications that need to store arbitrary key/value pairs of not often used columns. For example, if you have a users table and you want to store additional information about each user, you can create a meta table to store this information.

_Conclusion_: By shuffling less frequently used columns off into a separate table, you can keep your rows short and improve disk access times. While there are potential trade-offs, such as added complexity and the need for inner joins to reconstitute full rows, supplement tables can be a valuable tool for optimizing your database design.

## Pagination

Pagination is a common pattern in web applications. The idea is that we have a million rows in a table, but we only want to show 10/100 rows per page.

For pagination to be effective, you must order your records in a stable and deterministic manner.

### Offset Limit Pagination

**Pros:**

- Easy to implement
- Provides directly addressable pages
- Works well for small datasets

**Cons:**

- Page numbers can drift as you navigate through the records (e.g. if a record is deleted)
- Requires a full table scan for each page to get the total number of records
- Becomes significantly more expensive as you navigate deeper into the dataset

### Cursor Pagination

_Note_: It's important to encode cursor state when you send it to the client (e.g. in a URL). This will allow you to resume pagination from the same point if the user refreshes the page.

**Pros:**

- Stable and deterministic
- No need to scan the entire table to get the total number of records
- Works well for large datasets

**Cons:**

- Requires a unique index on the cursor column
- Cannot directly address pages
- More complex to implement than offset limit pagination

### Deferred Joins

The deferred join technique may seem counterintuitive at first, but it's actually quite simple. By generating a subset of data that contains only the ID column, we're able to apply the pagination on a much smaller dataset. This means we're throwing away less work.

When we join this subset with the main table, we're able to retrieve only the rows that match our pagination criteria. The join operation is more efficient than filtering the whole table with a large offset.

[Efficient MySQL pagination using deferred joins](https://aaronfrancis.com/2022/efficient-pagination-using-deferred-joins)

## Geographic searches

Suppose we have a table with one million addresses, each of which has a latitude and longitude column. To search for these addresses based on distance, we can use the stDistanceSphere function which calculates the distance between two points on a sphere.

```sql
SELECT stDistanceSphere(
  point(lat1, long1),
  point(lat2, long2)
)

-- Find all addresses within 1 mile of a given point
SELECT
  *
FROM
  addresses
WHERE
  ST_Distance_Sphere(
    POINT(-97.745363, 30.324014),
    POINT(longitude, latitude)
  ) < 1609
```

Running this query with a million rows can become slow because the query calculates the distance for every row, even if they are farther away than one mile. Therefore, we need to make an _approximate condition_ that acts as an initial filter and eliminate the false positives later.

```sql
 -- Filtering rows with bounding box
select
  *
from
  addresses
where
  latitude between 30.30954084441 and 30.33848715559    -- Bounding box latitude
  and
  longitude between -97.76213017291 and -97.72859582708 -- Bounding box longitude
  and
    ST_Distance_Sphere(
      point(-97.745363, 30.324014),
      point(longitude, latitude)
    ) <= 1609;
```
