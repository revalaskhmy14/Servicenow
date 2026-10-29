# API

## User

### POST /v1/auth/login — Authenticate a user with username/email and password; returns an authentication token.

Auth: public · Roles: ROL-06

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| usernameOrEmail | string | yes | not empty | johndoe |
| password | string | yes | not empty | None |
| rememberMe | boolean | no | None | False |

**Response 200**

| name | type | example |
|---|---|---|
| token | string | eyJhbGciOiJSUzI1NiJ9... |
| expiresAt | string | 2026-08-15T10:00:00Z |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | MISSING_USERNAME | A user name is required. | usernameOrEmail is absent |
| 400 | MISSING_PASSWORD | A password is required. | password is absent |
| 401 | INVALID_CREDENTIALS | The specified username/password couple is invalid. | credentials do not match |
| 403 | LOCAL_LOGIN_DISABLED | Local login is disabled. | DisableLocalLogin = true in SecuritySettings |
| 403 | USER_NOT_ALLOWED | The specified user is not allowed to sign in. | user status is Disabled |
| 403 | USER_LOCKED_OUT | The user is locked out. | user account is locked |
| 403 | 2FA_REQUIRED | The specified user is not allowed to sign in using password authentication. | 2FA is required and not satisfied |

Rules: BR-41, BR-42, BR-43

Integrations: INT-01

Idempotent: no · Paginated: no

Stories: US-02a-01, US-02a-02, US-02a-03, US-02a-04, US-13a-11, US-19a-02, US-32a-02, US-37a-01, US-37a-03, US-37b-03, US-43a-03, US-44a-01, US-44b-03

### POST /v1/auth/external/callback — Handle OAuth/OIDC provider callback, exchange code for identity, and sign in the user.

Auth: public · Roles: ROL-06

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| code | string | yes | authorization code from provider | 4/0AcvDMr... |
| state | string | yes | anti-CSRF state token | random-state-string |
| provider | string | yes | one of Google|Microsoft|Facebook|Twitter|GitHub|OpenIdConnect | Google |

**Response 200**

| name | type | example |
|---|---|---|
| token | string | eyJhbGciOiJSUzI1NiJ9... |
| expiresAt | string | 2026-08-15T10:00:00Z |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | EXTERNAL_AUTH_FAILED | External authentication failed. | provider returns error or token exchange fails |
| 403 | EXTERNAL_REGISTRATION_DISABLED | New external registrations are disabled. | DisableNewExternalRegistrations = true |

Rules: BR-46

Integrations: INT-02

Idempotent: no · Paginated: no

Stories: US-02a-01, US-13a-11, US-20a-02, US-37a-02, US-44a-03, US-44b-01

### POST /v1/auth/register — Create a new user account via self-service registration.

Auth: public · Roles: ROL-06

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| username | string | yes | unique; must not contain invalid characters | johndoe |
| email | string | yes | unique; valid email format | john@example.com |
| password | string | yes | meets password policy | None |
| confirmPassword | string | yes | must match password | None |

**Response 201**

| name | type | example |
|---|---|---|
| userId | string | u_abc123 |
| message | string | Please verify your email address before logging in. |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | VALIDATION_ERROR | Please check your input • Username is already taken or invalid • Email address is already registered or invalid • Password does not meet requirements | any field fails validation |
| 409 | DUPLICATE_USERNAME | Username is already taken. | username already exists |
| 409 | DUPLICATE_EMAIL | Email address is already registered. | email already in use |
| 403 | REGISTRATION_DISABLED | Self-service registration is not enabled. | EnableSelfServiceRegistration = false |

Rules: BR-35, BR-36

Integrations: INT-01, INT-03

Idempotent: no · Paginated: no

Stories: US-02b-01, US-02b-02, US-02b-03, US-02b-04, US-13a-01, US-19a-01, US-21a-01, US-37b-03, US-44b-05

### GET /v1/users — Return a paginated list of user accounts with optional filters.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| limit | query | integer | no | Page size; default 20 |
| offset | query | integer | no | Zero-based offset |
| status | query | string | no | Filter by Enabled or Disabled |
| search | query | string | no | Filter by username or email |

**Response 200**

| name | type | example |
|---|---|---|
| total | integer | 42 |
| items | array | [{"id":"u_abc123","username":"johndoe","email":"john@example.com","status":"Enabled","roles":["Editor"]}] |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller does not have ManageUsers permission |

Integrations: INT-01

Idempotent: yes · Paginated: yes

Stories: US-02c-01, US-13a-02, US-31a-03

### GET /v1/users/{userId} — Return a single user account by ID.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| userId | path | string | yes | User identifier |

**Response 200**

| name | type | example |
|---|---|---|
| id | string | u_abc123 |
| username | string | johndoe |
| email | string | john@example.com |
| phoneNumber | string | +1-555-0100 |
| status | string | Enabled |
| timeZone | string | UTC |
| roles | array | ["Editor"] |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageUsers |
| 404 | USER_NOT_FOUND | User not found. | userId does not exist |

Integrations: INT-01

Idempotent: yes · Paginated: no

Stories: US-02c-03, US-13a-02, US-19a-03, US-31a-03

### POST /v1/users — Create a new user account from the admin panel.

Auth: required · Roles: ROL-01

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| username | string | yes | unique; must not contain invalid characters | janedoe |
| email | string | yes | unique; valid email format | jane@example.com |
| phoneNumber | string | no | None | +1-555-0101 |
| password | string | no | meets password policy if provided | None |
| status | string | no | Enabled or Disabled | Enabled |
| roles | array | no | each element must be an existing role name | ["Editor"] |

**Response 201**

| name | type | example |
|---|---|---|
| id | string | u_xyz456 |
| username | string | janedoe |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | VALIDATION_ERROR | Validation errors • Username is already taken • Username contains invalid characters • Email address is already registered • Email address is invalid | any field fails format or uniqueness check |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageUsers |
| 409 | DUPLICATE_USERNAME | Username is already taken. | username in use |
| 409 | DUPLICATE_EMAIL | Email address is already registered. | email in use |

Integrations: INT-01

Idempotent: no · Paginated: no

Stories: US-02c-02, US-13a-01, US-19a-01, US-31a-02, US-44b-05

### PUT /v1/users/{userId} — Update a user account's details, status, and role assignments from the admin panel.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| userId | path | string | yes | User identifier |

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| username | string | no | unique; must not contain invalid characters | johndoe |
| email | string | no | unique; valid email format | john@example.com |
| phoneNumber | string | no | None | +1-555-0100 |
| status | string | no | Enabled or Disabled | Enabled |
| roles | array | no | each element must be an existing role name | ["Editor","Author"] |

**Response 200**

| name | type | example |
|---|---|---|
| id | string | u_abc123 |
| username | string | johndoe |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | VALIDATION_ERROR | Validation errors • Username is already taken • Username contains invalid characters • Email address is already registered • Email address is invalid | any field fails format or uniqueness check |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks EditUsers |
| 404 | USER_NOT_FOUND | User not found. | userId does not exist |

Integrations: INT-01

Idempotent: yes · Paginated: no

Stories: US-02d-01, US-13a-03, US-31a-02, US-44b-05

### POST /v1/users/{userId}/disable — Set a user account status to Disabled; blocked if the user is the last enabled administrator.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| userId | path | string | yes | User identifier |

**Response 200**

| name | type | example |
|---|---|---|
| id | string | u_abc123 |
| status | string | Disabled |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageUsers |
| 404 | USER_NOT_FOUND | User not found. | userId does not exist |
| 422 | LAST_ADMIN_GUARD | Cannot disable this user This is the last remaining enabled administrator account. At least one enabled administrator is required. | user is the last enabled administrator |

Rules: BR-01

Integrations: INT-01

Idempotent: yes · Paginated: no

Stories: US-02d-02, US-13a-04, US-19a-04, US-31a-02

### POST /v1/users/{userId}/enable — Set a user account status back to Enabled.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| userId | path | string | yes | User identifier |

**Response 200**

| name | type | example |
|---|---|---|
| id | string | u_abc123 |
| status | string | Enabled |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageUsers |
| 404 | USER_NOT_FOUND | User not found. | userId does not exist |

Integrations: INT-01

Idempotent: yes · Paginated: no

Stories: US-02d-03, US-13a-04, US-31a-02

### DELETE /v1/users/{userId} — Permanently remove a user account from the system.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| userId | path | string | yes | User identifier |

**Response 204**


**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks DeleteUsers |
| 404 | USER_NOT_FOUND | User not found. | userId does not exist |

Integrations: INT-01

Idempotent: yes · Paginated: no

Stories: US-02d-04, US-13a-05, US-19a-04, US-31a-02

### POST /v1/users/{userId}/password-reset — Send a password reset email to the specified user.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| userId | path | string | yes | User identifier |

**Response 200**

| name | type | example |
|---|---|---|
| message | string | Password reset email sent. |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageUsers |
| 404 | USER_NOT_FOUND | User not found. | userId does not exist |

Integrations: INT-03

Idempotent: no · Paginated: no

Stories: US-02d-05, US-21a-02

### GET /v1/users/me — Return the authenticated user's own profile.

Auth: required · Roles: ROL-07

**Response 200**

| name | type | example |
|---|---|---|
| id | string | u_abc123 |
| username | string | johndoe |
| email | string | john@example.com |
| timeZone | string | UTC |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |

Integrations: INT-01

Idempotent: yes · Paginated: no

Stories: US-02c-04, US-02e-01, US-13a-02, US-19a-03, US-31a-03, US-37b-04

### PATCH /v1/users/me — Update the authenticated user's own profile fields (username, email, time zone).

Auth: required · Roles: ROL-07

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| username | string | no | valid username format | johndoe |
| email | string | no | valid email format | john@example.com |
| timeZone | string | no | valid IANA time zone | America/New_York |

**Response 200**

| name | type | example |
|---|---|---|
| id | string | u_abc123 |
| username | string | johndoe |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | VALIDATION_ERROR | Invalid username or email format. Please check your entries. | username or email fails format check |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks EditOwnProfile permission |

Integrations: INT-01

Idempotent: yes · Paginated: no

Stories: US-02e-01, US-02e-02, US-13a-03, US-31a-02, US-37b-04, US-44b-05

## Role

### GET /v1/roles — Return all roles defined in the system.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| limit | query | integer | no | Page size; default 50 |
| offset | query | integer | no | Zero-based offset |

**Response 200**

| name | type | example |
|---|---|---|
| total | integer | 5 |
| items | array | [{"id":"r_01","name":"Editor","description":"Can edit and publish content","isSystemRole":false,"isAdminRole":false}] |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ViewRoles |

Rules: BR-33

Idempotent: yes · Paginated: yes

Stories: US-03a-01, US-13a-07, US-31a-03, US-37a-04, US-37a-05, US-37a-06, US-37b-01, US-37b-02, US-37c-02, US-37c-03, US-37c-05, US-44a-06

### GET /v1/roles/{roleName} — Return details and permissions of a single role.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| roleName | path | string | yes | Role name (URL-encoded) |

**Response 200**

| name | type | example |
|---|---|---|
| id | string | r_02 |
| name | string | Editor |
| description | string | Can edit and publish content |
| isSystemRole | boolean | False |
| isAdminRole | boolean | False |
| claims | array | [{"claimType":"Permission","claimValue":"EditContent"}] |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ViewRoles |
| 404 | ROLE_NOT_FOUND | Role not found. | roleName does not exist |

Rules: BR-33

Idempotent: yes · Paginated: no

Stories: US-03a-02, US-03c-01, US-13a-07, US-31a-03, US-37a-04, US-37a-05, US-37a-06, US-37b-01, US-37b-02, US-37c-02, US-37c-03, US-37c-05, US-44a-04, US-44a-06

### POST /v1/roles — Create a new role with a name and optional description.

Auth: required · Roles: ROL-01

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| name | string | yes | must not contain /; must be unique | ContentReviewer |
| description | string | no | None | Reviews content before publish |

**Response 201**

| name | type | example |
|---|---|---|
| id | string | r_05 |
| name | string | ContentReviewer |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | VALIDATION_ERROR | Validation error Role name must not contain / or duplicate an existing role. | name contains / or is a duplicate |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageRoles |
| 409 | DUPLICATE_ROLE | Validation error Role name must not contain / or duplicate an existing role. | role name already exists |

Rules: BR-03, BR-04

Idempotent: no · Paginated: no

Stories: US-03b-01, US-13a-06, US-31a-02, US-37a-04, US-37a-05, US-37a-06, US-37b-01, US-37b-02, US-44a-06

### POST /v1/roles/{roleName}/clone — Create a copy of a non-system role under a new name, inheriting all permissions.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| roleName | path | string | yes | Source role name |

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| newName | string | yes | must not contain /; must be unique | EditorCopy |

**Response 201**

| name | type | example |
|---|---|---|
| id | string | r_06 |
| name | string | EditorCopy |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | VALIDATION_ERROR | Validation error Role name must not contain / or duplicate an existing role. | newName contains / or is a duplicate |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageRoles |
| 404 | ROLE_NOT_FOUND | Role not found. | roleName does not exist |
| 409 | DUPLICATE_ROLE | Validation error Role name must not contain / or duplicate an existing role. | newName already exists |

Rules: BR-03, BR-04

Idempotent: no · Paginated: no

Stories: US-03b-02, US-13a-09, US-31a-02, US-37a-04, US-37a-05

### DELETE /v1/roles/{roleName} — Permanently delete a non-system role.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| roleName | path | string | yes | Role name (URL-encoded) |

**Response 204**


**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageRoles |
| 404 | ROLE_NOT_FOUND | Role not found. | roleName does not exist |
| 422 | SYSTEM_ROLE | System roles cannot be deleted. ✕ | isSystemRole = true |

Rules: BR-02

Idempotent: yes · Paginated: no

Stories: US-03a-03, US-03c-02, US-13a-10, US-31a-02, US-37a-04, US-37a-05, US-44a-05

## RoleClaim

### PUT /v1/roles/{roleName}/permissions — Full-replace the permission claims of a role; blocked for the admin role.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| roleName | path | string | yes | Role name (URL-encoded) |

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| permissions | array | yes | list of permission names | ["ViewContent","EditContent","PublishContent"] |

**Response 200**

| name | type | example |
|---|---|---|
| roleName | string | Editor |
| permissionsApplied | integer | 3 |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageRoles |
| 403 | ADMIN_ROLE_IMMUTABLE | Admin role permissions are managed by the system Permission assignments for the admin role cannot be modified here. | roleName is the admin role |
| 404 | ROLE_NOT_FOUND | Role not found. | roleName does not exist |
| 422 | VALIDATION_ERROR | Validation error Unable to save role changes. | permission data is invalid |

Rules: BR-05, BR-06, BR-34

Idempotent: yes · Paginated: no

Stories: US-03c-01, US-13a-08, US-31a-02, US-37a-04, US-37a-05, US-37a-06, US-37b-01, US-37b-02, US-37c-01, US-37c-03, US-37c-04, US-44a-04, US-44a-06

## ContentItem

### GET /v1/content-items — Return a paginated list of content items with optional search, type, status, and author filters.

Auth: required · Roles: ROL-01, ROL-02, ROL-03, ROL-04, ROL-05

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| limit | query | integer | no | Page size; default 20 |
| offset | query | integer | no | Zero-based offset |
| search | query | string | no | Full-text search term |
| contentType | query | string | no | Filter by content type name e.g. BlogPost |
| status | query | string | no | Filter by Published or Draft |
| author | query | string | no | Filter by author username |

**Response 200**

| name | type | example |
|---|---|---|
| total | integer | 120 |
| items | array | [{"contentItemId":"ci_001","title":"My First Blog Post","contentType":"BlogPost","status":"Published","modifiedDate":"2026-08-01T00:00:00Z"}] |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ViewContent |

Rules: BR-45

Integrations: INT-05, INT-06

Idempotent: yes · Paginated: yes

Stories: US-04a-01, US-04a-02, US-04a-03, US-04a-04, US-04a-05, US-04a-06, US-04a-07, US-04a-08, US-15a-05, US-25a-03, US-31a-03

### GET /v1/content-items/{contentItemId} — Return a single content item by ID; version query selects Published, Draft, or Latest.

Auth: required · Roles: ROL-01, ROL-02, ROL-03, ROL-04, ROL-05

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| contentItemId | path | string | yes | Content item identifier |
| version | query | string | no | Published (default) | Draft | Latest |

**Response 200**

| name | type | example |
|---|---|---|
| contentItemId | string | ci_001 |
| contentItemVersionId | string | civ_001 |
| contentType | string | BlogPost |
| title | string | My First Blog Post |
| status | string | Published |
| modifiedDate | string | 2026-08-01T00:00:00Z |
| isLatest | boolean | True |
| isPublished | boolean | True |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Access denied You do not have permission to edit this content item. | caller lacks ViewContent |
| 404 | NOT_FOUND | Content not found The requested content item does not exist. | contentItemId does not exist |

Rules: BR-11

Idempotent: yes · Paginated: no

Stories: US-04b-01, US-04d-01, US-15a-05, US-25a-03, US-31a-03, US-38a-03

### POST /v1/content-items — Create a new content item as a draft; returns the new content item.

Auth: required · Roles: ROL-01, ROL-02, ROL-04, ROL-05

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| contentType | string | yes | must reference an existing ContentTypeDefinition | BlogPost |
| title | string | yes | not empty | My First Blog Post |
| bodyText | string | no | None | Body content here |
| priorityLevel | integer | no | min 1, max 10 | 5 |
| featured | boolean | no | None | False |
| publicationDate | string | no | ISO 8601 date | 2025-08-15 |
| relatedLink | string | no | valid URL | https://example.com |
| customHtml | string | no | None | <div>content</div> |
| tags | array | no | leaf terms only | ["Technology","Web Development"] |
| notes | string | no | None | ## Editorial Notes |
| featuredImagePath | string | no | None | article-cover.jpg |

**Response 201**

| name | type | example |
|---|---|---|
| contentItemId | string | ci_002 |
| contentItemVersionId | string | civ_002 |
| status | string | Draft |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | TITLE_REQUIRED | Validation errors A value is required for Title. | title is empty |
| 400 | PRIORITY_RANGE | Priority Level must be between 1 and 10. | priorityLevel out of range |
| 400 | LEAF_TERMS_ONLY | Select leaf terms only. Multiple selections allowed. | non-leaf taxonomy terms submitted |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Access denied You do not have permission to edit this content item. | caller lacks EditContent |

Rules: BR-07, BR-08, BR-09, BR-11, BR-27

Integrations: INT-05, INT-06

Idempotent: no · Paginated: no

Stories: US-04b-02, US-04d-03, US-04d-04, US-04d-05, US-15a-01, US-25a-02, US-31a-02, US-38a-02

### PUT /v1/content-items/{contentItemId} — Save changes to an existing content item as a new draft version.

Auth: required · Roles: ROL-01, ROL-02, ROL-03, ROL-04, ROL-05

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| contentItemId | path | string | yes | Content item identifier |

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| title | string | yes | not empty | Updated Blog Post |
| bodyText | string | no | None | Updated body |
| priorityLevel | integer | no | min 1, max 10 | 3 |
| featured | boolean | no | None | True |
| publicationDate | string | no | ISO 8601 date | 2025-08-15 |
| tags | array | no | leaf terms only | ["Technology"] |
| notes | string | no | None | Updated notes |

**Response 200**

| name | type | example |
|---|---|---|
| contentItemId | string | ci_001 |
| contentItemVersionId | string | civ_003 |
| status | string | Draft |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | TITLE_REQUIRED | Validation errors A value is required for Title. | title is empty |
| 400 | PRIORITY_RANGE | Priority Level must be between 1 and 10. | priorityLevel out of range |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Access denied You do not have permission to edit this content item. | caller lacks EditContent |
| 404 | NOT_FOUND | Content not found The requested content item does not exist. | contentItemId does not exist |

Rules: BR-07, BR-08, BR-09, BR-11, BR-27, BR-45

Idempotent: yes · Paginated: no

Stories: US-04b-03, US-04d-03, US-04d-04, US-04d-05, US-15a-02, US-23a-02, US-23a-05, US-25a-02, US-31a-02, US-38a-02

### POST /v1/content-items/{contentItemId}/publish — Publish a content item, making it live.

Auth: required · Roles: ROL-01, ROL-02

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| contentItemId | path | string | yes | Content item identifier |

**Response 200**

| name | type | example |
|---|---|---|
| contentItemId | string | ci_001 |
| status | string | Published |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Access denied You do not have permission to edit this content item. | caller lacks PublishContent |
| 404 | NOT_FOUND | Content not found The requested content item does not exist. | contentItemId does not exist |

Rules: BR-11, BR-45

Integrations: INT-05, INT-06

Idempotent: yes · Paginated: no

Stories: US-04a-02, US-04c-01, US-15a-03, US-23a-02, US-23a-05, US-24a-02, US-31a-02

### POST /v1/content-items/{contentItemId}/unpublish — Unpublish a content item, reverting it to draft status.

Auth: required · Roles: ROL-01, ROL-02

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| contentItemId | path | string | yes | Content item identifier |

**Response 200**

| name | type | example |
|---|---|---|
| contentItemId | string | ci_001 |
| status | string | Draft |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks PublishContent |
| 404 | NOT_FOUND | Content not found The requested content item does not exist. | contentItemId does not exist |

Rules: BR-45

Integrations: INT-05, INT-06

Idempotent: yes · Paginated: no

Stories: US-04a-03, US-04c-02, US-15a-03, US-23a-03, US-23a-05, US-24a-02, US-31a-02

### POST /v1/content-items/{contentItemId}/clone — Create a draft copy of a content item.

Auth: required · Roles: ROL-01, ROL-02

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| contentItemId | path | string | yes | Content item identifier |

**Response 201**

| name | type | example |
|---|---|---|
| contentItemId | string | ci_003 |
| contentItemVersionId | string | civ_004 |
| status | string | Draft |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks EditContent |
| 404 | NOT_FOUND | Content not found The requested content item does not exist. | contentItemId does not exist |

Idempotent: no · Paginated: no

Stories: US-04a-05, US-04c-03, US-15a-06, US-31a-02

### POST /v1/content-items/{contentItemId}/remove — Clear Latest and Published flags on a content item without deleting the record; item can be restored.

Auth: required · Roles: ROL-01, ROL-03

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| contentItemId | path | string | yes | Content item identifier |

**Response 200**

| name | type | example |
|---|---|---|
| contentItemId | string | ci_001 |
| status | string | Removed |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks DeleteContent |
| 404 | NOT_FOUND | Content not found The requested content item does not exist. | contentItemId does not exist |

Rules: BR-10

Idempotent: yes · Paginated: no

Stories: US-04a-04, US-04c-04, US-15a-04, US-23a-03, US-23a-05, US-24a-02, US-25a-04, US-31a-02, US-38a-02

### POST /v1/content-items/{contentItemId}/restore — Restore a removed content item by reinstating its Latest flag.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| contentItemId | path | string | yes | Content item identifier |

**Response 200**

| name | type | example |
|---|---|---|
| contentItemId | string | ci_001 |
| status | string | Draft |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks EditContent |
| 404 | NOT_FOUND | Content not found The requested content item does not exist. | contentItemId does not exist |

Rules: BR-10

Idempotent: yes · Paginated: no

Stories: US-04a-04, US-04c-05, US-15a-04, US-31a-02

### POST /v1/content-items/{contentItemId}/discard-draft — Discard the pending draft version of a content item, reverting to the last published state.

Auth: required · Roles: ROL-01, ROL-02

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| contentItemId | path | string | yes | Content item identifier |

**Response 200**

| name | type | example |
|---|---|---|
| contentItemId | string | ci_001 |
| status | string | Published |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks EditContent |
| 404 | NOT_FOUND | Content not found The requested content item does not exist. | contentItemId does not exist |

Idempotent: yes · Paginated: no

Stories: US-04c-06, US-15a-06, US-31a-02

### POST /v1/content-items/import — Bulk import content items from an uploaded package file.

Auth: required · Roles: ROL-01

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| file | binary | yes | JSON or ZIP import package | content-export.zip |

**Response 200**

| name | type | example |
|---|---|---|
| imported | integer | 15 |
| errors | array | [] |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | INVALID_FILE | Invalid import package. | file format is unrecognized |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks Import permission |

Rules: BR-37

Idempotent: no · Paginated: no

Stories: US-04a-06, US-04d-02, US-15a-07, US-31a-02

### GET /v1/api/content/{contentItemId} — External REST API: retrieve a published content item by ID for integration clients.

Auth: required · Roles: ROL-01, ROL-02, ROL-03, ROL-04, ROL-05

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| contentItemId | path | string | yes | Content item identifier |
| version | query | string | no | Published (default) | Draft | Latest |

**Response 200**

| name | type | example |
|---|---|---|
| contentItemId | string | ci_001 |
| title | string | My First Blog Post |
| contentType | string | BlogPost |
| status | string | Published |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no Bearer token or API key provided |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks AccessContentApi or ApiViewContent |
| 404 | NOT_FOUND | Content not found. | contentItemId does not exist or not visible |

Integrations: INT-09

Idempotent: yes · Paginated: no

Stories: US-12a-01, US-12a-03, US-15a-08, US-27a-01, US-27a-03, US-37b-03, US-37b-04

### POST /v1/api/content — External REST API: create a new content item via integration client.

Auth: required · Roles: ROL-01, ROL-02

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| contentType | string | yes | must reference existing ContentTypeDefinition | BlogPost |
| title | string | yes | not empty | API-Created Post |
| draft | boolean | no | None | False |

**Response 201**

| name | type | example |
|---|---|---|
| contentItemId | string | ci_010 |
| status | string | Published |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | VALIDATION_ERROR | Validation errors A value is required for Title. | title is empty |
| 401 | UNAUTHORIZED | Authentication required. | no Bearer token or API key provided |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks AccessContentApi |

Rules: BR-07, BR-11

Integrations: INT-09

Idempotent: no · Paginated: no

Stories: US-12a-02, US-12a-03, US-15a-08, US-27a-01, US-27a-02

### POST /v1/api/graphql — External GraphQL endpoint supporting queries and mutations over content items.

Auth: required · Roles: ROL-01, ROL-02, ROL-03, ROL-04, ROL-05

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| query | string | yes | valid GraphQL query or mutation string | { blogPost(contentItemId: "ci_001") { title } } |
| variables | object | no | valid JSON variables map | {"contentItemId":"ci_001"} |

**Response 200**

| name | type | example |
|---|---|---|
| data | object | {"blogPost":{"title":"My First Blog Post"}} |
| errors | array | [] |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | INVALID_QUERY | GraphQL query is invalid. | query string is malformed |
| 401 | UNAUTHORIZED | Authentication required. | no Bearer token provided |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ExecuteGraphQL or ExecuteGraphQLMutations |

Integrations: INT-10

Idempotent: no · Paginated: no

Stories: US-12b-01, US-12b-02, US-15a-08, US-28a-01, US-28a-02, US-28a-03

### POST /v1/xmlrpc — Receive MetaWeblog XML-RPC remote publishing calls from blog clients.

Auth: required · Roles: ROL-01, ROL-02

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| xmlRpcPayload | string | yes | valid XML-RPC method call | <?xml version="1.0"?><methodCall><methodName>metaWeblog.newPost</methodName>...</methodCall> |

**Response 200**

| name | type | example |
|---|---|---|
| xmlRpcResponse | string | <?xml version="1.0"?><methodResponse><params><param><value><string>ci_011</string></value></param></params></methodResponse> |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 200 | XML_RPC_FAULT | XRpcFault(0, e.Message) | core exception raised during processing |
| 500 | INTERNAL_ERROR | Internal server error. | non-core exception raised |

Rules: BR-39

Integrations: INT-12

Idempotent: no · Paginated: no

Stories: US-12b-03, US-15a-08, US-30a-01, US-30a-02, US-30a-03, US-43a-01

## ContentTypeDefinition

### GET /v1/content-types — Return all content type definitions.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| limit | query | integer | no | Page size; default 50 |
| offset | query | integer | no | Zero-based offset |

**Response 200**

| name | type | example |
|---|---|---|
| total | integer | 6 |
| items | array | [{"name":"BlogPost","displayName":"Blog Post","creatable":true,"listable":true}] |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks EditContentTypes |

Idempotent: yes · Paginated: yes

Stories: US-04a-01, US-04b-02, US-05a-01, US-14a-01, US-31a-03

### POST /v1/content-types — Create a new content type definition.

Auth: required · Roles: ROL-01

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| displayName | string | yes | not empty; max 1024 characters | Blog Post |
| name | string | yes | must start with ASCII letter; normalized via ToSafeName(); must be unique | BlogPost |
| creatable | boolean | no | None | True |
| listable | boolean | no | None | True |
| draftable | boolean | no | None | True |
| versionable | boolean | no | None | True |
| securable | boolean | no | None | False |

**Response 201**

| name | type | example |
|---|---|---|
| id | string | BlogPost |
| displayName | string | Blog Post |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | DISPLAY_NAME_REQUIRED | Display name is required and must not exceed 1024 characters. | displayName is empty or over 1024 chars |
| 400 | NAME_INVALID | Name must start with an ASCII letter. | name does not start with ASCII letter |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks EditContentTypes |
| 409 | DUPLICATE_TYPE | A content type with this name already exists. | name already in use |

Rules: BR-12, BR-13

Idempotent: no · Paginated: no

Stories: US-05a-02, US-14a-02, US-31a-02, US-44b-04

### PUT /v1/content-types/{typeName} — Update an existing content type definition's settings.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| typeName | path | string | yes | Content type technical name e.g. BlogPost |

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| displayName | string | yes | not empty; max 1024 characters | Blog Post |
| creatable | boolean | no | None | True |
| listable | boolean | no | None | True |
| draftable | boolean | no | None | True |
| versionable | boolean | no | None | True |
| securable | boolean | no | None | False |

**Response 200**

| name | type | example |
|---|---|---|
| name | string | BlogPost |
| displayName | string | Blog Post |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | DISPLAY_NAME_REQUIRED | Display name is required and must not exceed 1024 characters. | displayName is empty or over 1024 chars |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks EditContentTypes |
| 404 | NOT_FOUND | Content type not found. | typeName does not exist |

Rules: BR-12, BR-13

Idempotent: yes · Paginated: no

Stories: US-05b-03, US-14a-03, US-31a-02, US-44b-04

## ContentPartFieldDefinition

### GET /v1/content-types/{typeName}/fields — Return all field definitions for the specified content type's part.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| typeName | path | string | yes | Content type technical name |

**Response 200**

| name | type | example |
|---|---|---|
| items | array | [{"fieldName":"Title","fieldType":"TextField","position":0,"isSystemDefined":true}] |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks EditContentTypes |
| 404 | NOT_FOUND | Content type not found. | typeName does not exist |

Rules: BR-16

Idempotent: yes · Paginated: no

Stories: US-05b-01, US-05c-03, US-14a-04, US-31a-03

### POST /v1/content-types/{typeName}/fields — Add a new field definition to a content type's part.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| typeName | path | string | yes | Content type technical name |

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| fieldName | string | yes | not empty | Author Name |
| fieldType | string | yes | one of TextField|Numeric|Boolean|Date|Link|Html|Markdown|ContentPicker|Media | TextField |

**Response 201**

| name | type | example |
|---|---|---|
| fieldName | string | Author Name |
| fieldType | string | TextField |
| position | integer | 5 |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | FIELD_NAME_REQUIRED | Field name is required. | fieldName is empty |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks EditContentTypes |
| 404 | NOT_FOUND | Content type not found. | typeName does not exist |

Idempotent: no · Paginated: no

Stories: US-05b-04, US-14a-05, US-31a-02

### PUT /v1/content-types/{typeName}/fields/order — Update the display order of all fields in a content type's part.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| typeName | path | string | yes | Content type technical name |

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| orderedFieldNames | array | yes | must include all existing field names | ["Title","Author Name","Tags","PublishDate"] |

**Response 200**

| name | type | example |
|---|---|---|
| typeName | string | BlogPost |
| fieldsReordered | integer | 4 |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | INVALID_ORDER | Ordered field names must match all existing fields. | orderedFieldNames is missing or has unknown entries |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks EditContentTypes |
| 404 | NOT_FOUND | Content type not found. | typeName does not exist |

Rules: BR-16

Idempotent: yes · Paginated: no

Stories: US-05b-02, US-05c-03, US-14a-06, US-31a-02

### DELETE /v1/content-types/{typeName}/fields/{fieldName} — Remove a non-system field from a content type's part.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| typeName | path | string | yes | Content type technical name |
| fieldName | path | string | yes | Field name |

**Response 204**


**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks EditContentTypes |
| 404 | NOT_FOUND | Field not found. | fieldName does not exist on this type |
| 422 | SYSTEM_DEFINED_FIELD | system-defined fields cannot be removed | isSystemDefined = true |

Rules: BR-14, BR-15

Idempotent: yes · Paginated: no

Stories: US-05b-05, US-05c-02, US-14a-07, US-31a-02

## Tenant

### POST /v1/setup — Initialise the Default tenant with site name, recipe, database provider, admin credentials and time zone.

Auth: public · Roles: ROL-06

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| siteName | string | yes | not empty | TestSite |
| recipe | string | yes | one of Blog|Headless|Agency|Blank | Blog |
| databaseProvider | string | yes | one of Sqlite|SqlConnection|Postgres|MySql | Sqlite |
| databaseConnectionString | string | no | required when databaseProvider != Sqlite | Server=db;Database=orchard |
| adminUserName | string | yes | not empty | admin |
| adminEmail | string | yes | valid email | admin@test.com |
| adminPassword | string | yes | meets password policy | None |
| confirmPassword | string | yes | must match adminPassword | None |
| siteTimeZone | string | yes | valid IANA time zone | UTC |

**Response 201**

| name | type | example |
|---|---|---|
| tenantId | string | Default |
| message | string | Site setup completed. Proceed to login. |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | VALIDATION_ERROR | Please check your input | any required field is missing or invalid |
| 422 | SITE_TIMEZONE_REQUIRED | The SiteTimeZone field is required. | siteTimeZone is absent |
| 422 | DEFAULT_TENANT_REQUIRED | Validation error The single 'Default' tenant should be provided. | root tenant name is not Default |
| 422 | DB_CONNECTION_REQUIRED | DatabaseConnectionString is required for non-Sqlite providers. | databaseProvider != Sqlite and connectionString absent |
| 409 | ALREADY_SETUP | Site is already set up. | Default tenant is already Running |

Rules: BR-17, BR-18, BR-19, BR-20

Integrations: INT-13

Idempotent: no · Paginated: no

Stories: US-01a-01, US-01a-02, US-16a-04, US-37b-03, US-43a-03

### GET /v1/tenants — Return all tenants known to this Orchard Core host.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| limit | query | integer | no | Page size; default 50 |
| offset | query | integer | no | Zero-based offset |

**Response 200**

| name | type | example |
|---|---|---|
| total | integer | 2 |
| items | array | [{"id":"Default","name":"Default","status":"Running","recipeName":"Blog"}] |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageTenants |

Idempotent: yes · Paginated: yes

Stories: US-01b-01, US-01b-02, US-01c-01, US-16a-02, US-31a-03, US-40a-04

### GET /v1/tenants/{tenantName} — Return details of a single tenant.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| tenantName | path | string | yes | Tenant name e.g. Default |

**Response 200**

| name | type | example |
|---|---|---|
| id | string | Default |
| name | string | Default |
| description | string | Main site |
| requestUrlPrefix | string |  |
| recipeName | string | Blog |
| databaseProvider | string | Sqlite |
| status | string | Running |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageTenants |
| 404 | TENANT_NOT_FOUND | Tenant not found. | tenantName does not exist |

Idempotent: yes · Paginated: no

Stories: US-01b-01, US-01c-02, US-16a-02, US-31a-03, US-40a-04

### POST /v1/tenants — Provision a new tenant; tenant starts in Uninitialized status.

Auth: required · Roles: ROL-01

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| name | string | yes | letters only, no spaces; unique; root must be Default | MyTenant |
| description | string | no | None | Secondary site |
| requestUrlPrefix | string | no | None | mytenant |
| recipe | string | yes | one of Blog|Headless|Agency|Blank | Blog |
| databaseProvider | string | no | one of Sqlite|SqlConnection|Postgres|MySql | Sqlite |
| databaseConnectionString | string | no | required when databaseProvider != Sqlite | None |
| tablePrefix | string | no | None | None |

**Response 201**

| name | type | example |
|---|---|---|
| name | string | MyTenant |
| status | string | Uninitialized |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | VALIDATION_ERROR | Validation error The single 'Default' tenant should be provided. | root tenant name is not Default |
| 400 | INVALID_NAME | Tenant name must contain letters only and no spaces. | name contains non-letter characters or spaces |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageTenants |
| 409 | DUPLICATE_TENANT | A tenant with this name already exists. | name is already taken |

Rules: BR-17, BR-18, BR-19

Idempotent: no · Paginated: no

Stories: US-01b-02, US-01c-03, US-16a-01, US-31a-02, US-40a-04

### PUT /v1/tenants/{tenantName} — Update an existing Running tenant's description, URL prefix, recipe, database provider, and table prefix.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| tenantName | path | string | yes | Tenant name |

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| description | string | no | None | Updated description |
| requestUrlPrefix | string | no | None | newprefix |
| recipeName | string | no | one of Blog|Headless|Agency|Blank | Agency |
| databaseProvider | string | no | one of Sqlite|SqlConnection|Postgres|MySql | Postgres |
| tablePrefix | string | no | None | new_ |

**Response 200**

| name | type | example |
|---|---|---|
| name | string | MyTenant |
| status | string | Running |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageTenants |
| 404 | TENANT_NOT_FOUND | Tenant not found. | tenantName does not exist |

Idempotent: yes · Paginated: no

Stories: US-01b-01, US-01c-04, US-16a-03, US-31a-02, US-40a-04

## Feature

### GET /v1/features — Return all registered features with their enabled/disabled status and categories.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| limit | query | integer | no | Page size; default 100 |
| offset | query | integer | no | Zero-based offset |
| category | query | string | no | Filter by Infrastructure or Content Management |
| search | query | string | no | Search by feature name |

**Response 200**

| name | type | example |
|---|---|---|
| total | integer | 48 |
| items | array | [{"id":"OrchardCore.Features","featureName":"Features","category":"Infrastructure","isEnabled":true}] |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageFeatures |

Idempotent: yes · Paginated: yes

Stories: US-07a-01, US-07a-02, US-07a-03, US-16a-05, US-24a-01, US-31a-03, US-32a-01, US-37c-04, US-38a-01, US-41a-01

### POST /v1/features/{featureId}/enable — Enable a feature; with force=true also enables its dependencies.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| featureId | path | string | yes | Feature identifier e.g. OrchardCore.Features |

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| force | boolean | no | None | False |

**Response 200**

| name | type | example |
|---|---|---|
| enabled | array | ["OrchardCore.Features","OrchardCore.Resources"] |
| message | string | Features enabled successfully: Features, OrchardCore.Resources |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | DEPENDENCY_REQUIRED | Cannot enable feature: required dependencies are not enabled. Use force=true to enable dependencies. | force=false and dependencies are disabled |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageFeatures |
| 404 | FEATURE_NOT_FOUND | Feature not found. | featureId does not exist |

Rules: BR-21, BR-22

Idempotent: yes · Paginated: no

Stories: US-07a-02, US-07b-01, US-07b-03, US-16a-06, US-24a-01, US-31a-02, US-32a-01, US-37c-01, US-38a-01, US-41a-01

### POST /v1/features/{featureId}/disable — Disable a feature; with force=true also disables dependent features.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| featureId | path | string | yes | Feature identifier e.g. OrchardCore.Features |

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| force | boolean | no | None | False |

**Response 200**

| name | type | example |
|---|---|---|
| disabled | array | ["OrchardCore.Dependencies","OrchardCore.Contents"] |
| message | string | Features disabled successfully: OrchardCore.Dependencies, OrchardCore.Contents |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | DEPENDENT_FEATURES_ENABLED | Cannot disable feature: dependent features are still enabled. Use force=true to disable all. | force=false and dependent features are enabled |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageFeatures |
| 404 | FEATURE_NOT_FOUND | Feature not found. | featureId does not exist |

Rules: BR-21, BR-22

Idempotent: yes · Paginated: no

Stories: US-07a-03, US-07b-02, US-07b-03, US-16a-07, US-24a-01, US-31a-02, US-32a-01, US-37c-01, US-38a-01, US-41a-01

## DeploymentPlan

### GET /v1/deployment-plans — Return all deployment plans.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| limit | query | integer | no | Page size; default 20 |
| offset | query | integer | no | Zero-based offset |

**Response 200**

| name | type | example |
|---|---|---|
| total | integer | 3 |
| items | array | [{"id":"dp_01","planName":"Production Roles Sync","description":"Sync roles to production"}] |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageDeploymentPlan |

Idempotent: yes · Paginated: yes

Stories: US-08a-01, US-17a-02, US-31a-03, US-42a-01

### POST /v1/deployment-plans — Create a new deployment plan.

Auth: required · Roles: ROL-01

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| planName | string | yes | not empty | Production Roles Sync |
| description | string | no | None | Syncs all roles to production |

**Response 201**

| name | type | example |
|---|---|---|
| id | string | dp_01 |
| planName | string | Production Roles Sync |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | PLAN_NAME_REQUIRED | Plan name is required. | planName is empty |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageDeploymentPlan |

Idempotent: no · Paginated: no

Stories: US-08a-02, US-17a-01, US-31a-02

### DELETE /v1/deployment-plans/{planId} — Permanently remove a deployment plan and its steps.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| planId | path | string | yes | Deployment plan identifier |

**Response 204**


**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageDeploymentPlan |
| 404 | PLAN_NOT_FOUND | Deployment plan not found. | planId does not exist |

Idempotent: yes · Paginated: no

Stories: US-08a-03, US-17a-02, US-31a-02

### GET /v1/deployment-plans/{planId}/export — Download the deployment plan as a JSON/ZIP package.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| planId | path | string | yes | Deployment plan identifier |

**Response 200**

| name | type | example |
|---|---|---|
| file | binary | deployment-plan.zip |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks Export permission |
| 404 | PLAN_NOT_FOUND | Deployment plan not found. | planId does not exist |

Rules: BR-37

Idempotent: yes · Paginated: no

Stories: US-08a-05, US-08b-02, US-17a-04, US-29a-02, US-29a-04, US-42a-01

### POST /v1/deployment-plans/import — Import a deployment package (JSON or ZIP) to create or update deployment plans.

Auth: required · Roles: ROL-01

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| file | binary | yes | valid deployment package JSON or ZIP | deployment-plan.zip |
| planName | string | no | None | Imported Plan |

**Response 200**

| name | type | example |
|---|---|---|
| planId | string | dp_05 |
| planName | string | Imported Plan |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | INVALID_PACKAGE | Invalid deployment package. | file format is unrecognized |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks Import permission |

Rules: BR-37

Idempotent: no · Paginated: no

Stories: US-08a-06, US-08b-03, US-17a-05, US-31a-02, US-42a-02

## DeploymentStep

### POST /v1/deployment-plans/{planId}/steps — Add a typed step to a deployment plan.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| planId | path | string | yes | Deployment plan identifier |

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| stepType | string | yes | one of ContentDefinitionDeploymentStep|DeleteContentDefinitionDeploymentStep|ContentItemDeploymentStep|AllContentDeploymentStep|QueryBasedContentDeploymentStep|AllQueriesDeploymentStep|ExportContentToDeploymentTargetDeploymentStep|AllRolesDeploymentStep | AllRolesDeploymentStep |
| configuration | object | no | valid JSON configuration for the step type | {} |
| position | integer | no | None | 0 |

**Response 201**

| name | type | example |
|---|---|---|
| id | string | step_01 |
| stepType | string | AllRolesDeploymentStep |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | INVALID_STEP_TYPE | Step type is invalid. | stepType is unrecognized |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageDeploymentPlan |
| 404 | PLAN_NOT_FOUND | Deployment plan not found. | planId does not exist |
| 422 | PART_NOT_IN_TYPE | Content part does not belong to the selected content type. | ContentDefinitionDeploymentStep: part not in selected type |

Rules: BR-24

Idempotent: no · Paginated: no

Stories: US-04a-07, US-08a-04, US-08b-01, US-17a-03, US-31a-02

## Query

### GET /v1/queries — Return all named queries with their type and parameters.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| limit | query | integer | no | Page size; default 20 |
| offset | query | integer | no | Zero-based offset |

**Response 200**

| name | type | example |
|---|---|---|
| total | integer | 6 |
| items | array | [{"id":"q_01","queryName":"RecentBlogPosts","queryType":"Lucene"}] |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageQueries |

Idempotent: yes · Paginated: yes

Stories: US-09a-01, US-17a-07, US-24a-03, US-31a-03, US-41a-04

### GET /v1/queries/{queryName} — Return definition of a single named query.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| queryName | path | string | yes | Unique query name |

**Response 200**

| name | type | example |
|---|---|---|
| id | string | q_01 |
| queryName | string | RecentBlogPosts |
| queryType | string | Lucene |
| parameters | object | {"limit":10} |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageQueries |
| 404 | QUERY_NOT_FOUND | Query not found. | queryName does not exist |

Idempotent: yes · Paginated: no

Stories: US-09a-02, US-17a-07, US-24a-03, US-31a-03, US-41a-04

### POST /v1/queries — Create a new named query.

Auth: required · Roles: ROL-01

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| queryName | string | yes | unique; not empty | RecentBlogPosts |
| queryType | string | yes | one of Lucene|SQL|GraphQL | Lucene |
| parameters | object | no | valid JSON | {"limit":10} |

**Response 201**

| name | type | example |
|---|---|---|
| id | string | q_07 |
| queryName | string | RecentBlogPosts |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | QUERY_NAME_REQUIRED | Query name is required. | queryName is empty |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageQueries |
| 409 | DUPLICATE_QUERY | A query with this name already exists. | queryName already in use |

Rules: BR-25

Idempotent: no · Paginated: no

Stories: US-09b-01, US-17a-06, US-24a-03, US-31a-02, US-41a-04

### PUT /v1/queries/{queryName} — Update an existing named query's type and parameters.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| queryName | path | string | yes | Query name |

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| queryType | string | no | one of Lucene|SQL|GraphQL | SQL |
| parameters | object | no | valid JSON | {"limit":20} |

**Response 200**

| name | type | example |
|---|---|---|
| queryName | string | RecentBlogPosts |
| queryType | string | SQL |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageQueries |
| 404 | QUERY_NOT_FOUND | Query not found. | queryName does not exist |

Idempotent: yes · Paginated: no

Stories: US-09b-02, US-17a-08, US-24a-03, US-31a-02, US-41a-04

### POST /v1/queries/{queryName}/execute — Execute a named query with optional runtime parameters and return results.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| queryName | path | string | yes | Query name |

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| parameters | object | no | valid JSON parameters matching query definition | {"limit":10} |

**Response 200**

| name | type | example |
|---|---|---|
| queryName | string | RecentBlogPosts |
| count | integer | 10 |
| items | array | [{"contentItemId":"ci_001","title":"My First Blog Post"}] |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ExecuteQueries |
| 404 | QUERY_NOT_FOUND | Query not found. | queryName does not exist |
| 422 | QUERY_NULL | Query could not be resolved. | IQueryManager returns null for query name |

Rules: BR-25

Integrations: INT-06

Idempotent: no · Paginated: no

Stories: US-09b-03, US-17a-09, US-23a-04, US-23a-05, US-24a-03, US-31a-03, US-41a-05

### DELETE /v1/queries/{queryName} — Permanently remove a named query.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| queryName | path | string | yes | Query name |

**Response 204**


**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageQueries |
| 404 | QUERY_NOT_FOUND | Query not found. | queryName does not exist |

Idempotent: yes · Paginated: no

Stories: US-09b-04, US-17a-10, US-24a-03, US-41a-04

## SecuritySettings

### GET /v1/security-settings — Return the current security and authentication configuration.

Auth: required · Roles: ROL-01

**Response 200**

| name | type | example |
|---|---|---|
| adminRoleName | string | Administrator |
| enableSelfServiceRegistration | boolean | False |
| requireEmailVerification | boolean | False |
| requireAdministratorApproval | boolean | False |
| disableLocalLogin | boolean | False |
| requireTwoFactorAuthentication | boolean | False |
| referrerPolicy | string | no-referrer |
| backgroundServicePollingTime | string | 00:01:00 |
| backgroundServiceMinimumIdleTime | string | 00:00:10 |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageSecuritySettings |

Idempotent: yes · Paginated: no

Stories: US-03c-03, US-10a-01, US-18a-01, US-31a-03, US-37a-03, US-40a-02, US-40a-03, US-44a-02, US-44b-02

### PUT /v1/security-settings — Persist security configuration changes and initiate a configuration reload.

Auth: required · Roles: ROL-01

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| adminRoleName | string | no | None | Administrator |
| enableSelfServiceRegistration | boolean | no | None | False |
| requireEmailVerification | boolean | no | None | False |
| requireAdministratorApproval | boolean | no | None | False |
| renderRegistrationWithSiteTheme | boolean | no | None | False |
| disableNewExternalRegistrations | boolean | no | None | False |
| disableLocalLogin | boolean | no | None | False |
| requireTwoFactorAuthentication | boolean | no | None | False |
| contentSecurityPolicy | string | no | None | default-src 'self' |
| referrerPolicy | string | no | one of no-referrer|no-referrer-when-downgrade|same-origin|origin|strict-origin|origin-when-cross-origin|strict-origin-when-cross-origin|unsafe-url | no-referrer |
| permissionsPolicy | string | no | None | geolocation=() |
| backgroundServicePollingTime | string | no | timespan HH:mm:ss | 00:01:00 |
| backgroundServiceMinimumIdleTime | string | no | timespan HH:mm:ss | 00:00:10 |

**Response 200**

| name | type | example |
|---|---|---|
| message | string | Security settings saved successfully. Configuration reload initiated. |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageSecuritySettings |

Rules: BR-35, BR-36, BR-41

Idempotent: yes · Paginated: no

Stories: US-03c-03, US-10a-01, US-18a-02, US-31a-02, US-37a-03, US-40a-03, US-44a-02, US-44b-02

## DataMigrationRecord

### GET /v1/migrations — Return the data migration record for each feature, showing current schema version.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| limit | query | integer | no | Page size; default 50 |
| offset | query | integer | no | Zero-based offset |

**Response 200**

| name | type | example |
|---|---|---|
| total | integer | 20 |
| items | array | [{"featureId":"OrchardCore.Contents","version":3}] |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageFeatures |

Rules: BR-38

Integrations: INT-13

Idempotent: yes · Paginated: yes

Stories: US-18a-03, US-31a-03, US-31a-04, US-34a-04

## ContentVersionPruningSettings

### GET /v1/content-version-pruning — Return current content version retention configuration.

Auth: required · Roles: ROL-01

**Response 200**

| name | type | example |
|---|---|---|
| items | array | [{"contentType":"BlogPost","retentionDays":30,"versionsToKeep":5}] |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageContentVersionPruning |

Idempotent: yes · Paginated: no

Stories: US-05c-01, US-14a-08, US-31a-03, US-42a-03

### PUT /v1/content-version-pruning — Save content version retention settings for one or more content types.

Auth: required · Roles: ROL-01

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| settings | array | yes | each item: contentType fk to ENT-05; retentionDays >= 0; versionsToKeep >= 0 | [{"contentType":"BlogPost","retentionDays":30,"versionsToKeep":5}] |

**Response 200**

| name | type | example |
|---|---|---|
| updated | integer | 2 |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | INVALID_VALUES | when no content type is selected, nothing is pruned | retentionDays or versionsToKeep are negative |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageContentVersionPruning |

Rules: BR-23

Idempotent: yes · Paginated: no

Stories: US-05c-01, US-14a-08, US-31a-02, US-42a-04

## Other

### GET /v1/auth/external — Redirect user to the chosen external OAuth/OIDC provider consent screen.

Auth: public · Roles: ROL-06

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| provider | query | string | yes | Provider name: Google, Microsoft, Facebook, Twitter, GitHub, OpenIdConnect |
| returnUrl | query | string | no | URL to redirect back to after authentication |

**Response 302**

| name | type | example |
|---|---|---|
| location | string | https://accounts.google.com/o/oauth2/auth?... |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | UNKNOWN_PROVIDER | Unknown external authentication provider. | provider is not registered |
| 403 | EXTERNAL_REGISTRATION_DISABLED | New external registrations are disabled. | DisableNewExternalRegistrations = true and user is new |

Rules: BR-46

Integrations: INT-02

Idempotent: yes · Paginated: no

Stories: US-02a-01, US-20a-01, US-37a-02, US-44a-03, US-44b-01

### GET /v1/settings/sms — Return the current Azure Communication Services SMS configuration.

Auth: required · Roles: ROL-01

**Response 200**

| name | type | example |
|---|---|---|
| provider | string | AzureCommunicationServices |
| configured | boolean | True |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageSmsSettings |

Idempotent: yes · Paginated: no

Stories: US-22a-01, US-31a-03, US-39a-02

### PUT /v1/settings/sms — Persist Azure Communication Services SMS provider configuration.

Auth: required · Roles: ROL-01

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| connectionString | string | yes | Azure Communication Services connection string | endpoint=https://...;accesskey=... |
| fromNumber | string | no | None | +15550001234 |

**Response 200**

| name | type | example |
|---|---|---|
| message | string | SMS settings saved. |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | INVALID_CONFIG | Invalid SMS configuration. | connectionString is malformed |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageSmsSettings |

Integrations: INT-04

Idempotent: yes · Paginated: no

Stories: US-22a-01, US-31a-02, US-39a-03

### GET /v1/settings/media-s3 — Return the current Amazon S3 media storage configuration options.

Auth: required · Roles: ROL-01

**Response 200**

| name | type | example |
|---|---|---|
| bucketName | string | orchard-media |
| region | string | us-east-1 |
| configured | boolean | True |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ViewAmazonS3MediaOptions |

Idempotent: yes · Paginated: no

Stories: US-06a-01, US-06a-02, US-26a-01, US-31a-03

### PUT /v1/settings/media-s3 — Persist Amazon S3 media storage configuration.

Auth: required · Roles: ROL-01

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| bucketName | string | yes | not empty | orchard-media |
| region | string | yes | valid AWS region code | us-east-1 |
| accessKeyId | string | no | None | AKIA... |
| secretAccessKey | string | no | None | wJa... |

**Response 200**

| name | type | example |
|---|---|---|
| message | string | Amazon S3 media options saved. |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 400 | INVALID_CONFIG | Invalid S3 configuration. | bucketName or region is missing |
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageAmazonS3MediaOptions |

Integrations: INT-08

Idempotent: yes · Paginated: no

Stories: US-06a-02, US-26a-01, US-31a-02

### PUT /v1/workflow-tasks/{taskId} — Persist workflow task settings including content expression and publish-on-create flag.

Auth: required · Roles: ROL-01

**Parameters**

| name | in | type | required | description |
|---|---|---|---|---|
| taskId | path | string | yes | Workflow task identifier |

**Request body**

| name | type | required | validation | example |
|---|---|---|---|---|
| contentExpression | string | no | None | Model.ContentItem |
| publishOnCreate | boolean | no | None | True |

**Response 200**

| name | type | example |
|---|---|---|
| taskId | string | wt_01 |
| message | string | Workflow task configuration saved. |

**Errors**

| status | code | message | when |
|---|---|---|---|
| 401 | UNAUTHORIZED | Authentication required. | no valid session |
| 403 | FORBIDDEN | Insufficient permissions. | caller lacks ManageWorkflows |
| 404 | TASK_NOT_FOUND | Workflow task not found. | taskId does not exist |

Rules: BR-28, BR-29, BR-30

Idempotent: yes · Paginated: no

Stories: US-11a-01, US-11a-02, US-11b-01, US-11b-02, US-31a-02

