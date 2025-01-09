

# formsflow.ai Premium (Kubernetes)
![Helm Chart Version](https://img.shields.io/badge/Helm%20Chart%20Version-8.0.0-blue)

Let's discover Installation of [formsflow.ai](https://formsflow.ai/) using formsflow-ai-charts in AWS Elastic Kubernetes Service. Formsflow.ai is a Free, Open-Source, Low Code Development Platform for rapidly building powerful business applications. [formsflow.ai](https://formsflow.ai/) combines leading Open-Source applications including form.io forms, Camunda’s workflow engine, Keycloak’s security, and Redash’s data analytics into a seamless, integrated platform.


## Clone the GitHub Repository

In this initial step, clone the Forms Flow AI Charts GitHub repository using the following commands:

```bash
$ git clone https://github.com/AOT-Technologies/forms-flow-ai-charts
$ cd charts
```

## Custom Domain Setup

### 1. Retrieve Load Balancer Information / Custer-IP information

Look for the External IP address or DNS name associated with the Load Balancer. The exact label may vary based on the cloud provider (for example, it might be `EXTERNAL-IP`, `LoadBalancer Ingress`, or `DNS name` depending on the platform you're using).

### 2. Configure DNS Records with Your Domain Provider
- Log in to your domain provider's console (e.g., AWS Route 53, Azure DNS, Google Cloud DNS, etc.)
- Navigate to the DNS management or Hosted Zones section corresponding to your domain.
- Add a new DNS record:
    - Record type: Choose CNAME or A depending on the provider and the type of Load Balancer (e.g., if you have a static IP, choose A, if you have a DNS name, choose CNAME).
    - Name: Set this to the desired subdomain (e.g., app, www).
    - Value: Set the value to the External IP address or DNS name obtained from the Load Balancer.
        - For cloud providers with static IPs (e.g., AWS, GCP, Azure), use the IP address.
        - For cloud providers that assign a DNS name to the Load Balancer (e.g., AWS ELB or GCP HTTP(S) Load Balancer), use the DNS name.
- Save the DNS record.


## 1. forms-flow-ai

The [formsflow.ai](https://formsflow.ai/) Helm chart is designed to deploy the core components of the [formsflow.ai](https://formsflow.ai/) application in your Kubernetes environment. This chart is highly configurable, providing flexibility to adapt to different database configurations and other key settings   . Here's a breakdown of its features:

- Common ConfigMap and Secrets:

    - This chart allows you to create essential ConfigMaps and Secrets required by the application, ensuring that sensitive information like API keys, database credentials, and other environment-specific configurations are securely managed.

- High Availability (HA) Database Configuration:
    - Local Database: If you're using a local database (like PostgreSQL and MongoDB), this chart will automatically set up the databases with high availability (HA) configurations. It ensures that your databases are fault-tolerant and can handle traffic without downtime.
    - External Database: If you prefer to use an external database (e.g., an external managed PostgreSQL or MongoDB instance), you can configure the chart to connect to your external database by setting the appropriate database connection parameters such as host, port, username, and password
- Customizable Domain
    - Replace `domain` with your custom domain (e.g., app.yourdomain.com) to point to the application after deployment.
- This chart ensures that Forms Flow AI is easily deployed with flexible database options (HA local or external) and secure configuration management, making it suitable for both development and production environments.

To deploy the enterprise version, provide your Docker image credentials by configuring the appropriate username and password for the image registry. This will allow the deployment to securely pull the necessary Docker images from the private registry.

:::info

The Docker credentials should be provided by the formsflow.ai [sales](https://formsflow.ai/about-us/#contact-us/) team. Ensure you receive these credentials before proceeding with the setup.

:::

```bash
helm upgrade --install forms-flow-ai forms-flow-ai \
  --set Domain=<domain> \
  --set postgresql-ha.postgresql.podSecurityContext.enabled=true \
  --set mongodb.podSecurityContext.enabled=true \
  -n <namespace>
```
The list of customizable parameters for the `forms-flow-ai` chart can be found [here](https://github.com/AOT-Technologies/forms-flow-ai-charts/blob/staging/QA/charts/forms-flow-ai/README.md).

## 2. forms-flow-idm

The [formsflow.ai](https://formsflow.ai/) framework could be hooked up with any OpenID Connect compliant Identity Management Server. To date, we have only tested [Keycloak](https://github.com/keycloak/keycloak).

```bash
helm upgrade --install forms-flow-idm forms-flow-idm \
 --set keycloak.ingress.hostname=<forms-flow-idm-hostname> \
 --set postgresql-ha.postgresql.podSecurityContext.enabled=true \ 
 -n <namespace>
```
The list of customizable parameters for the `forms-flow-idm` chart can be found [here](https://github.com/AOT-Technologies/forms-flow-ai-charts/blob/staging/QA/charts/forms-flow-idm/README.md).

## 3. forms-flow-bpm
[formsflow.ai](https://formsflow.ai/) leverages [Camunda](https://camunda.com/) for workflow and decision automation.

To know more about Camunda, visit [Camunda](https://camunda.com/).

```bash
helm upgrade --install forms-flow-bpm forms-flow-bpm \ 
 --set ingress.hostname=<forms-flow-bpm-hostname> \
 --set camunda.websocket.securityOrigin=<forms-flow-web-hostname> \
 --set image.repository=formsflow/forms-flow-bpm-ee \
 -n <namespace>
```
The list of customizable parameters for the `forms-flow-bpm` chart can be found [here](https://github.com/AOT-Technologies/forms-flow-ai-charts/blob/staging/QA/charts/forms-flow-bpm/README.md).

## 4. forms-flow-forms

[formsflow.ai](https://formsflow.ai/) leverages form.io to build "serverless" data management applications using a simple drag-and-drop form builder interface.

To know more about form.io, go to https://form.io.

```bash
helm upgrade --install forms-flow-forms forms-flow-forms \
 --set ingress.hostname=<forms-flow-forms-hostname> \
 -n <namespace>
```
The list of customizable parameters for the `forms-flow-forms` chart can be found [here](https://github.com/AOT-Technologies/forms-flow-ai-charts/blob/staging/QA/charts/forms-flow-forms/README.md).

## 5. forms-flow-api

[formsflow.ai](https://formsflow.ai/) has built this adaptive tier for correlating form management, BPM and analytics together.

The goal of the REST API is to provide access to all relevant interfaces of the system.

```bash
helm upgrade --install forms-flow-api forms-flow-api \
 --set ingress.hostname=<forms-flow-api-hostname> \
 --set image.repository=formsflow/forms-flow-webapi-ee \
 -n <namespace>
```
The list of customizable parameters for the `forms-flow-api` chart can be found [here](https://github.com/AOT-Technologies/forms-flow-ai-charts/blob/staging/QA/charts/forms-flow-api/README.md).

## 6. forms-flow-documents-api

The goal of the document API is to generate pdf with form submission data.

```bash
helm upgrade --install forms-flow-documents-api forms-flow-documents-api \
 --set ingress.hostname=<forms-flow-documents-api-hostname> \
 --set image.repository=formsflow/forms-flow-documents-api-ee \
 -n <namespace>
```
The list of customizable parameters for the `forms-flow-documents-api` chart can be found [here](https://github.com/AOT-Technologies/forms-flow-ai-charts/blob/staging/QA/charts/forms-flow-documents-api/README.md).

## 7. forms-flow-data-analysis

This module is intended to update forms based on specific topics mentioned by the designer during form creation.

```bash
helm upgrade --install forms-flow-data-analysis forms-flow-data-analysis \
 --set ingress.hostname=<forms-flow-data-analysis-hostname> \
 --set image.repository=formsflow/forms-flow-data-analysis-api-ee \
 -n <namespace>
```
The list of customizable parameters for the `forms-flow-data-analysis` chart can be found [here](https://github.com/AOT-Technologies/forms-flow-ai-charts/blob/staging/QA/charts/forms-flow-data-analysis/README.md).

## 8. forms-flow-web

[formsflow.ai](https://formsflow.ai/) delivers progressive web application with React version 17.0.2 along with formio

```bash
helm upgrade --install forms-flow-web forms-flow-web \
 --set ingress.hostname=<forms-flow-web-hostname> \
 --set image.repository=formsflow/forms-flow-web-ee \
 -n <namespace>
```
The list of customizable parameters for the `forms-flow-web` chart can be found [here](https://github.com/AOT-Technologies/forms-flow-ai-charts/blob/staging/QA/charts/forms-flow-web/README.md).

## 9. forms-flow-analytics (Optional)

[formsflow.ai](https://formsflow.ai/) leverages [Redash](https://github.com/getredash/redash) to build interactive dashboards and gain insights. To create meaningful visualization for your use case with [Redash Knowledge base.](https://redash.io/help/) 

The **forms-flow-analytics** chart is optional and can be deployed if analytics functionality is required for your Forms Flow AI application. If you do not need analytics features, you can skip installing this chart.

```bash
helm upgrade --install forms-flow-analytics forms-flow-analytics \
 --set ingress.hosts[0].host=<forms-flow-analytics-hostname> \
 --set ingress.tls[0].secretName=<forms-flow-analytics-hostname-tls> \
 --set ingress.tls[0].hosts[0]=<forms-flow-analytics-hostname> \
 --set ingress.hosts[0].paths[0]="/" \
 --set ingress.subFilterHost=<forms-flow-analytics-hostname> \
 -n <namespace>
```
The list of customizable parameters for the `forms-flow-analytics` chart can be found [here](https://github.com/AOT-Technologies/forms-flow-ai-charts/blob/staging/QA/charts/forms-flow-analytics/README.md).

Once Analytics is deployed, obtain the correct Insight API key and redeploy the [forms-flow-ai](#1-forms-flow-ai) component to ensure proper integration

## 10. forms-flow-admin

[formsflow.ai](https://formsflow.ai/) Admin API is a Python REST API to provision tenants in a multi tenanted environment.

```bash
helm upgrade --install forms-flow-admin forms-flow-admin \
 --set ingress.hostname=<forms-flow-admin-hostname>  \
  -n <namespace>
```
How to Create a Tenant To create a new tenant, follow the instructions detailed in the [Create Tenant](/docs/next/tenant-creation) page.

## Conclusion

In this guide, we walked through the process of installing [formsflow.ai](https://formsflow.ai/) on Kubernetes using `formsflow-ai-charts`. We covered essential steps, including setting up the necessary tools (AWS CLI, Kubectl, and Helm), connecting to your EKS cluster, and deploying components of [formsflow.ai](https://formsflow.ai/) while ensuring secure communication and efficient traffic management through SSL certificates and an Nginx Ingress Controller.

By following these instructions, you can leverage the power of [formsflow.ai](https://formsflow.ai/) to build powerful business applications with ease, benefiting from its integration of leading open-source technologies like form.io, Camunda, Keycloak, and Redash.

