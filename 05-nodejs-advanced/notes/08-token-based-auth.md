# Token Based Authentication

## What is Token Based Authentication?

Token based authentication is a way to authenticate users based on the token provided by the client. The token is usually a long string of characters that is sent along with every request to the server. The server then verifies the token and sends the response.

## Session Based Authentication vs Token Based Authentication

In session based authentication, the server stores the user's information in the session and sends the session id to the client. The client then sends the session id with every request to the server. The server then verifies the session id and sends the response.

In token based authentication, the server stores the user's information in the token and sends the token to the client. The client then sends the token with every request to the server. The server then verifies the token and sends the response.

## Why Token Based Authentication?

Token based authentication is stateless. This means that the server does not need to store the user's information in the session. This makes token based authentication more scalable than session based authentication.

## How to Implement Token Based Authentication?

1. Create a token
2. Send the token to the client
3. Verify the token
4. Send the response

## How to Create/Validate a Token?

There are many ways to create a token. One way is to use a library like [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken). Another way is to use a library like [uuid](https://www.npmjs.com/package/uuid).

## Token types in JWT?

There are three types of tokens in JWT:

1. Access token
2. Refresh token
3. ID token

## What is access token in JWT?

An access token is a token that is used to access a resource. The access token is usually stored in the database and is used to access a resource when the user is logged in.

## What is refresh token in JWT?

A refresh token is a token that is used to get a new access token. The refresh token is usually stored in the database and is used to get a new access token when the access token expires.

## What is ID token in JWT?

An ID token is a token that is used to identify a user. The ID token is usually stored in the database and is used to identify a user when the user is logged in.
