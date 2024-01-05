# Amazon Cognito

## What is AWS Cognito?

- AWS Server that offers **Authentication** and **Authorization** features
- Allow you to add user registration, sign in, add access control
- Scalable and Highly available supporting millions of users
- Supports standards based Identity Providers (OAuth 2.0, OIDC, SAML)

## Use Cases

- Keeping an active directory of Users (forgot password, MFA, etc.)
- Securing Your APIs
- Providing temporary access to AWS resources

## Core Concepts

### User Pools

- User Pools are _user directories_ that provide sign-up and sign-in options for your app users.
- Users can sign in directly to the user pool or indirectly via a third party identity provider (Facebook, Google, etc.)
- Cognito leverages common OAuth 2.0 flows to issue tokens to users

### Identity Pools

- Provides short term AWS access for users
- Identity Pools provide AWS credentials to grant your users access to other AWS services.
- Identity pools enable you to grant your users access to other AWS services, such as Amazon S3 or DynamoDB.

<img src="./images/core-concepts.png" width="500px" />

## Create a User Pool

## Application Integration with User Pools

You can integrate your app with user pools in the following ways:

1. AWS Amplify
2. AWS SDK

<img src="./images/app-integration.png" width="500px" />

## Triggers

**Triggers**: allow you to run custom code in response to cognito events

- Pre Sign-up: allows you to validate user attributes before sign-up
- Post Confirmation: allows you to send custom messages
- Pre Token Generation: allows you to customize tokens
- etc.
