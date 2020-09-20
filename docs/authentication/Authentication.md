# Application Architecture:

## Request Flow:

### Hits the Router: `<tenant_name>.brewcraft.com`

- Unpack the request

- Redirects to the IDP URL

- User enters login information on IDP

- IDP redirects user back to Router UI with JWT code (Never persisted)

- The /redirect address sends JWT token to the Router backend

- Router stores the JWT and returns a SESSION ID to the UI

- User sends the SessionID with request subsequent request.

- Session ID must be secured

- Session ID maps to a stored JWT token and must be forwarded to the application service with each request.

### Hits the IDP Service `<tenant_name>.our-company-idp.com`

- Has a UI form for login, signup, personal details management, etc.

- How do we ensure that login user belonging to a certain org can signup on an IDP for that org - Use a code maybe or an invite from admin?

### Hits the application service `our-service-url.com`

- The request comes from the Router (already authenticated).

- The app has a valid JWT token with Tenant ID and User ID

- Perform JWT validation using the secret key (Same used by IDP)

- Sends the request down to intialize and populate session context.

- Forwards the request to view file.

- From this point onwards, each API call is handled per [Rest Api.md](../rest-api/Rest API.md)

_Note: Each application - Except the Router, all apps and IDP share the JWT signing key._