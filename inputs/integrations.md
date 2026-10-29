# Integrations

## INT-01 ASP.NET Core Identity / UserService

System: ASP.NET Core Identity · Direction: both · Trigger: user registration, login, password management, role assignment
Auth: ASP.NET Core cookie authentication · Protocol: in-process library

| operation | method | endpoint | request | response |
|---|---|---|---|---|
| CreateUserAsync | library | UserService.CreateUserAsync (lines 125-165) | username, email, password (optional), roles | created user or validation errors |
| AuthenticateAsync | library | UserService.AuthenticateAsync (lines 58-123) | username/email, password | authenticated user or specific error message |
| GetUserAsync | library | UserService.GetUserAsync (lines 284-294) | username or email | User record or null |

Retry: None · Idempotency: None · Failure: UserService.reportError: null check, last-enabled-admin guard; CancelAsync on failure
Monitoring: None

Stories: US-02b-02, US-02d-01, US-02d-02, US-02d-03, US-02d-04, US-02e-01, US-19a-01, US-19a-02, US-19a-03, US-19a-04

## INT-02 External Authentication Providers (OAuth/OIDC)

System: Microsoft Azure AD / Entra ID, Google, Facebook, Twitter/X, GitHub, OpenID Connect · Direction: both · Trigger: user clicks external SSO button on Login screen
Auth: OAuth 2.0 / OIDC; confidential clients require a secret · Protocol: REST/OAuth2

| operation | method | endpoint | request | response |
|---|---|---|---|---|
| ExternalLogin | GET/POST | ExternalAuthentications controller (relocated from Account controller) | provider name, return URL | redirect to external provider consent screen or user profile |

Retry: None · Idempotency: None · Failure: rate limiting via ExternalAuthenticationRateLimitsStartup.ConfigureServices; DisableNewRegistrations blocks new external users
Monitoring: authentication tickets stored in distributed cache when Redis enabled (multi-instance support)

Stories: US-20a-01, US-20a-02

## INT-03 Email Service (Azure Communication Services)

System: Azure Communication Services Email · Direction: out · Trigger: user registration requiring email verification; password reset request
Auth: Azure Communication Services credentials; config key: OrchardCore_Email_AzureCommunicationServices (old key OrchardCore_Email_Azure retained) · Protocol: REST

| operation | method | endpoint | request | response |
|---|---|---|---|---|
| SendVerificationEmail | POST | Azure Communication Services Email API | to, subject, body with verification link | delivery confirmation or error |
| SendPasswordResetEmail | POST | Azure Communication Services Email API | to, subject, body with password reset link | delivery confirmation or error |

Retry: None · Idempotency: None · Failure: email provider must be configured; required for email verification feature
Monitoring: None

Stories: US-02b-02, US-02d-05, US-21a-01, US-21a-02, US-21a-03

## INT-04 SMS Service (Azure Communication Services)

System: Azure Communication Services SMS · Direction: out · Trigger: SMS notification events
Auth: Azure Communication Services credentials · Protocol: REST

| operation | method | endpoint | request | response |
|---|---|---|---|---|
| SendSms | POST | Azure Communication Services SMS API | to, message | delivery confirmation or error |

Retry: None · Idempotency: None · Failure: gated by ManageSmsSettings permission
Monitoring: None

Stories: US-22a-02, US-22a-03, US-39a-03

## INT-05 Elasticsearch Search Indexing

System: Elasticsearch · Direction: both · Trigger: content item published, updated, or removed; search query submitted
Auth: Elasticsearch cluster credentials via OrchardCore_Elasticsearch config key · Protocol: REST

| operation | method | endpoint | request | response |
|---|---|---|---|---|
| IndexDocument | PUT/POST | Elasticsearch Index API | content item JSON document | index confirmation |
| Search | GET/POST | Elasticsearch Search API | query DSL with custom token filters and analyzers | search results |

Retry: None · Idempotency: None · Failure: index errors caught and logged; non-fatal
Monitoring: None

Stories: US-04c-01, US-04c-02, US-23a-01, US-23a-02, US-23a-03, US-23a-04, US-23a-05, US-41a-01, US-41a-02, US-41a-03, US-41a-05, US-41a-06

## INT-06 Lucene Search Indexing

System: Lucene (via OrchardCore.Lucene) · Direction: both · Trigger: content item published, updated, or removed; Lucene query executed
Auth: none (in-process) · Protocol: in-process library

| operation | method | endpoint | request | response |
|---|---|---|---|---|
| Index | library | Lucene index | document fields | index confirmation or error |
| Query | library | Lucene query engine | query JSON parameters | matching documents |

Retry: None · Idempotency: None · Failure: non-fatal; errors logged
Monitoring: None

Stories: US-04c-01, US-04c-02, US-09b-03, US-24a-01, US-24a-02, US-24a-03, US-41a-01, US-41a-02, US-41a-03, US-41a-05, US-41a-06

## INT-07 Azure Blob / Data Lake Media Storage

System: Azure Blob Storage / Azure Data Lake · Direction: both · Trigger: media file uploaded, retrieved, or deleted
Auth: Azure Storage credentials; DataLakeServiceClient / BlobContainerClient · Protocol: REST / Azure SDK

| operation | method | endpoint | request | response |
|---|---|---|---|---|
| UploadMedia | PUT | Azure Blob/DataLake container | file binary, content type, path | blob URL or error |
| GetMedia | GET | Azure Blob/DataLake container | blob path | file binary or error |
| DeleteMedia | DELETE | Azure Blob/DataLake container | blob path | deletion confirmation or error |

Retry: None · Idempotency: None · Failure: non-fatal errors logged; ViewAzureMediaOptions permission gates configuration view
Monitoring: None

Stories: US-25a-01, US-25a-02, US-25a-03, US-25a-04, US-25a-05, US-36a-03

## INT-08 Amazon S3 Media Storage

System: Amazon S3 (via LocalStack compatible) · Direction: both · Trigger: media file uploaded, retrieved, or deleted
Auth: AWS credentials via S3 configuration · Protocol: REST / AWS SDK

| operation | method | endpoint | request | response |
|---|---|---|---|---|
| UploadMedia | PUT | S3 bucket | file binary, key, content type | ETag or error |
| GetMedia | GET | S3 bucket | object key | file binary or error |

Retry: None · Idempotency: None · Failure: ViewAmazonS3MediaOptions permission gates configuration; errors logged
Monitoring: None

Stories: US-06a-02, US-26a-01, US-26a-02, US-26a-03, US-26a-04, US-36a-03

## INT-09 Content REST API

System: Internal REST API (Minimal API / ApiController) · Direction: in · Trigger: external client API request (Integration Developer)
Auth: API key or Bearer token; AccessContentApi permission required · Protocol: REST

| operation | method | endpoint | request | response |
|---|---|---|---|---|
| CreateContent | POST | /api/content | content item JSON | created item or validation errors |
| GetContent | GET | /api/content/{id} | content item id, version options | content item JSON or 404 |

| from | to |
|---|---|
| ENT-04.contentItemId | id |
| ENT-04.title | title |
| ENT-04.contentType | contentType |
| ENT-04.status | status |

Retry: None · Idempotency: CreateAsync with Published/Draft/DraftRequired VersionOptions · Failure: returns NotFound or Forbid on missing permission; AccessContentApi, ApiViewContent permissions gate access
Monitoring: None

Stories: US-12a-01, US-12a-02, US-27a-01, US-27a-02, US-27a-03

## INT-10 GraphQL API

System: Internal GraphQL endpoint · Direction: in · Trigger: GraphQL query or mutation from external client
Auth: Bearer token; ExecuteGraphQL permission required · Protocol: GraphQL over HTTP

| operation | method | endpoint | request | response |
|---|---|---|---|---|
| Query | POST | /api/graphql | GraphQL query string, variables | JSON data or errors |
| Mutation | POST | /api/graphql | GraphQL mutation string, variables | JSON data or errors |

Retry: None · Idempotency: None · Failure: ExecuteGraphQL, ExecuteGraphQLMutations permissions gate access
Monitoring: None

Stories: US-12b-01, US-12b-02, US-28a-01, US-28a-02, US-28a-03

## INT-11 Remote Deployment (HTTP)

System: Remote Orchard Core instance · Direction: out · Trigger: deployment plan exported to remote target
Auth: RemoteClientService; Microsoft.AspNetCore.DataProtection for client credentials · Protocol: REST / HTTP

| operation | method | endpoint | request | response |
|---|---|---|---|---|
| ExportToRemote | POST | remote instance deployment endpoint | deployment package JSON/ZIP | import confirmation or error |

Retry: None · Idempotency: None · Failure: ExportRemoteInstances, ManageRemoteClients, ManageRemoteInstances permissions gate; Import permission flagged security-critical
Monitoring: None

Stories: US-29a-01, US-29a-02, US-29a-03, US-29a-04

## INT-12 MetaWeblog / XML-RPC Remote Publishing

System: MetaWeblog / XML-RPC protocol clients (OrchardCore.Lists) · Direction: in · Trigger: remote publishing tool posts content via MetaWeblog
Auth: authorization gated via CheckAccessAsync · Protocol: XML-RPC

| operation | method | endpoint | request | response |
|---|---|---|---|---|
| PublishPost | POST | MetaWeblogHandler XML-RPC endpoint | XML-RPC method call with post content | post id or XML-RPC fault |

Retry: None · Idempotency: None · Failure: XRpcFault(0, e.Message) on exception; 500 on non-core exceptions; CheckAccessAsync gates all operations
Monitoring: None

Stories: US-12b-03, US-30a-01, US-30a-02, US-30a-03

## INT-13 YesSql Data Persistence

System: YesSql (document/relational ORM) · Direction: both · Trigger: any data read or write operation in the application
Auth: database credentials · Protocol: SQL (via YesSql)

Retry: None · Idempotency: idempotent per DataMigrationManager (skips processed features) · Failure: ISession.CancelAsync() on exception; ISession.SaveAsync() in finally always called
Monitoring: None

Stories: US-31a-01, US-31a-02, US-31a-03, US-31a-04

## INT-14 Distributed Cache / Redis

System: Redis (when Redis feature enabled) · Direction: both · Trigger: authentication ticket creation/retrieval; background task locking
Auth: Redis connection string configuration · Protocol: Redis protocol

Retry: None · Idempotency: None · Failure: TryAcquireBackgroundTaskLockAsync: log 'Timeout to acquire a lock', terminate shell scope, break
Monitoring: None

Stories: US-32a-01, US-32a-02, US-32a-03

