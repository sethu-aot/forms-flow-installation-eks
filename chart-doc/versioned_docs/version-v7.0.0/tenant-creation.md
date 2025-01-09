---
title: Hidden Page
sidebar_position: -1
---

# Tenant Creation
This guide provides step-by-step instructions on how to generate a bearer token and create a tenant in a multi-tenant environment using Postman.


Prerequisites
Before proceeding, ensure you have:

- Postman installed on your machine. If not, download it here.
- Valid API credentials (client ID and client secret) to generate the bearer token.
- The API endpoint for creating tenants and authenticating the API requests.

## Create a Tenant
### Step 1: Generate Bearer Token
First, we need to authenticate and obtain a bearer token, which will be used in the header of the request to create a tenant.

####  POST Request to Get Bearer Token
- URL: forms-flow-idm-url/auth/realms/multitenant/protocol/openid-connect/token
- Method: `POST`

#### Request Body
In Postman, go to the Body tab and select x-www-form-urlencoded. Then, add the following key-value pairs:

| Key           | Value              |
| ------------- | -------------------|
| grant_type    | client_credentials |
| client_id     | forms-flow-bpm     |
| client_secret | your-client-secret |

#### Send the Request
Click Send to make the request. If successful, you should receive a JSON response with the access token. The response will look like this:

```bash
{
  "access_token": "<bearer-token>",
  "token_type": "bearer",
  "expires_in": 3600,
  "scope": "openid"
}
```

Copy the value of `access_token`  this is your bearer token, which will be used in the next step.

### Step 2: Create the Tenant
Now that we have the bearer token, we can use it to create a new tenant in the multi-tenant system.

#### POST Request to Create Tenant
- URL: forms-flow-admin-url/api/v1/tenants
- Method: `POST`
#### Set Authorization Header
In Postman, go to the Authorization tab and select Bearer Token. Paste the access_token you obtained from the previous step.

| Key           | Value                    |
| ------------- | -------------------------|
| Authorization | Bearer your-access-token |

#### Request Body
Next, in the Body tab of Postman, choose raw and select JSON. Then, add the following JSON request body:

```bash
{
    "key": "sampletenant",
    "name": "sampletenant",
    "details": {
        "applicationTitle": "sampletenant",
        "createDefaultUsers": true,
        "skipAnalytics": true,
        "userEmail": "",
        "roles": []
    }
}
```
This JSON object includes the key, name, and details for the new tenant. You can modify these values to match the tenant information you wish to create.

#### Send the Request
Click Send to create the tenant. If the request is successful, you should receive a response with the tenant details, such as:

```bash
{}
```
This indicates that the tenant was successfully created in the system.

## Conclusion
This guide walks you through the process of generating a bearer token and creating a tenant in a multi-tenant environment using Postman. By following these steps, you can easily manage tenants within your system using the `forms-flow-admin`.