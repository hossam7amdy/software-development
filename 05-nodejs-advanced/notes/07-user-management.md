# User Management

## User Management Module

- Allows you to manage users, groups, and roles.
- User management is a core part of any identity and access management system (IAM).
- Enables admins to control user access and application permissions (authorization, authorization, audit).
- User management and authentication services have been grounded with windows-based, on-premises, database, identity providers, or cloud-based identity (IAM).

## User Management Module Features

### User Management

- Create, update, and delete (enable/disable) users.
- Manage user profile information.
- Manage user authentication information.

### Group Management

- Create, update, and delete groups.
- Manage group membership.

### Role Management

- Create, update, and delete roles.
- Manage role membership.

## User Management Module Database Schema

1. **User Table** [user_id, username, password, email, full_name, user_type_id, is_enabled, created_at, updated_at]
2. **Group Table** [group_id, group_name, description, created_at, updated_at]
3. **Role Table** [role_id, role_name, description, created_at, updated_at]
4. **Groupe-Role Table** [group_id, role_id]
5. **User-Group Table** [user_id, group_id]
6. **User Type Table** [user_type_id, user_type_name, description, created_at, updated_at]

### Tips:

- Skip _Foreign Key Constraints_ on early database implementation (a lot of modification).
- You can split user's information into two tables (user and user_profile) to avoid redundancy.
