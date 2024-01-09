# Auditing (audit trail / audit log)

## What is auditing?

- Auditing is the process of recording _events_ that occur in a system and then analyzing them to determine if they are correct.
- Track activities of users and administrators [Who did what, when, where, and how?]
- Provide basic information to backtrack through the entire process of a transaction or event

## Types of audit trail and contents of an audit trail

- [User, system, application, database, network, security]

  - User ID
  - Date and time of the event
  - Type of event
  - Success or failure of the event
  - IP address of the user
  - Location of the user
  - Device used by the user

## Types of industries that require auditing

- Banking: Financial transactions
- Healthcare: Patient records
- Government: Tax records
- Version control systems: Git
- IT helpdesk: Ticketing system
- E-commerce: Online shopping
- Social media: Facebook, Twitter, Instagram: User activities
- etc.

## What is the importance of auditing?

- To ensure that the system is working as expected
- Help on
  - Reconciliation
  - Historical analysis
  - Forensic analysis
  - Troubleshooting
  - Risk management

## What is the difference between auditing and logging?

- Logging is the process of recording events that occur in a system.
- Auditing is the process of recording events that occur in a system and then analyzing them to determine if they are correct.

# How to implement auditing in Node.js?

1. Define audit action (e.g. login, logout, create, update, delete, etc.)
2. Prepare audit log emitter (event emitter)
3. audit log listener (subscriber)
4. create table in database to store audit log

```sql
app_audit_log (
  id int primary key auto_increment,
  audit_action varchar(50) not null,
  audit_status varchar(10) not null,
  audit_by int not null,
  audit_at datetime not null,
  audit_data JSON
  audit_error JSON
);
```
