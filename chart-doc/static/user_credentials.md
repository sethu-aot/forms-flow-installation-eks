---
layout: default
title: user credentials
nav_order: 4
nav_exclude: true
---


## Formsflow-ai user credentials  

---

Default User credentials are generated when keycloak started for the first time, you can modify the values on your keycloak service.   

| User Role    | User Name            | Password | User Group         |
|:-------------|:------------------   |:------   |:---------------    |
| Designer     | formsflow-designer   | changeme | formsflow-designer |
| client       | formsflow-client     | changeme | formsflow-client   |
| Reviewer     | formsflow-reviewer   | changeme | formsflow-reviewer |
| Clerk        | formsflow-clerk      | changeme | formsflow-reviewer |
| Approver     | formsflow-approver   | changeme | formsflow-reviewer |  



> NOTE: All the default configurations are imported to keycloak during the startup, so no manual changes are required at this stage. Redirect uri's are configured as localhost in the default setup, you can configure the ip address (if required) as the redirect uri for the clients by logging into Keycloak.
