---
sidebar_position: 1
---

# Installation on AWS Elastic Kubernetes Service (Enterprise Edition)

Let's discover Installation of [formsflow.ai](https://formsflow.ai/) using formsflow-ai-charts in AWS Elastic Kubernetes Service. Formsflow.ai is a Free, Open-Source, Low Code Development Platform for rapidly building powerful business applications. [formsflow.ai](https://formsflow.ai/) combines leading Open-Source applications including form.io forms, Camunda’s workflow engine, Keycloak’s security, and Redash’s data analytics into a seamless, integrated platform.

## Prerequisite

- AWS CLI: A command line tool for working with AWS services, including Amazon EKS. For more information, see [Installing AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- Kubectl: A command line tool for working with Kubernetes clusters. For more information, see [Installing or Updating Kubectl](https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html)
- Helm: Helps to manage Kubernetes applications , for more information see [Installing and Updating the helm](https://helm.sh/docs/intro/install)


## Step 1: Clone the GitHub Repository

In this initial step, clone the Forms Flow AI Charts GitHub repository using the following commands:

```bash
$ git clone https://github.com/AOT-Technologies/forms-flow-ai-charts
$ cd charts
```

## Step 2: Connect to the EKS Cluster

After cloning the GitHub repository, use the command below to connect to your Kubernetes cluster. Replace cluster-name with your actual cluster name:

```
$ aws eks update-kubeconfig --region ca-central-1 --name <cluster-name>
```

This command updates your “**kubeconfig**” file, enabling seamless communication with your Amazon EKS (Elastic Kubernetes Service) cluster located in the specified AWS region. Establishing this connection is essential for managing and deploying applications within the Kubernetes environment.

## Step 3: Create a Namespace in the Cluster

After connecting to the Kubernetes cluster, the next step is to create a dedicated namespace. Execute the following command, replacing **namespace** with the desired name for your namespace:

```bash
$ kubectl craete ns namesapce
```

This command establishes an isolated namespace within the cluster, allowing you to organize and manage resources effectively

## Step 4: Install Nginx Ingress Controller in EKS using Helm

Following the namespace creation, proceed to install the Nginx Ingress Controller in your EKS cluster using Helm. Perform the following steps:

### Add the Nginx Ingress Helm Repository:

```bash
$ helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
```

### Update the Helm Repository:

```bash
$ helm repo update
```

### Install Nginx Ingress Controller using Helm:

```bash
helm install ingress-nginx-<namespace> ingress-nginx/ingress-nginx --set controller.ingressClass=<ingress-classname> --set controller.ingressClassResource.name=<ingress-classname> -n <namespace> 
```

Customize the ingress class and associated resources by replacing **ingress-classname** (default is "nginx"). This step sets up efficient external traffic management within Kubernetes.

## Step 5: Pointing Ingress Loadbalancer in Domain Name Provider to access the App using Domain Name

1. **Get the loadbalancer**

    Use the following command to retrieve information about the Load Balancer associated with your Ingress Controller in the specified namespace:

    ```bash
    $ kubectl get svc -n <namespace>
    ```
    Identify the External IP address or DNS name associated with the Load Balancer.

2. **Configure AWS Route 53**

    - Log in to the AWS Management Console and navigate to Route53
    - Select the hosted Zone corresponding to your domain
    - Add a new record
    - Set the "Name" field to the desired subdomain (eg:- app)
    - Choose "CNAME" as the record type
    - set the value to the External IP address or DNS name obtained from the Load Balancer.
    - Save the changes.


Once the DNS settings propagate, users can access your application using the custom domain (e.g., app.yourdomain.com). This setup establishes a CNAME record pointing to the Ingress Load Balancer, ensuring a direct connection between your custom domain and the application.



## Step 6: Installing ACM (AWS Certificate Manager)

Execute the following command to deploy AWS Certificate Manager (ACM) components in your Kubernetes cluster:

```bash
$ kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.11.0/cert-manager.yaml 
```

This step installs Cert-Manager, a Kubernetes add-on for managing SSL/TLS certificates.

## Step 7: Installing EBS-CSI driver

Generate a Kubernetes secret named aws-secret in the kube-system namespace by providing your AWS access key ID and secret access key. Make sure to replace `access-key-id` and `secret-access-key` with your actual AWS credentials. 
```
$ kubectl create secret generic aws-secret  --namespace kube-system --from-literal "key_id=<access-key-id>"  --from-literal "access_key=<secret-access-key>"
```
This secret is crucial for secure communication between the Kubernetes cluster and AWS services, ensuring proper authentication.

Add the aws-ebs-csi-driver Helm repository.

```bash
$ helm repo add aws-ebs-csi-driver https://kubernetes-sigs.github.io/aws-ebs-csi-driver

$ helm repo update
```

Then install a release of the driver using the chart.

```bash
$ helm upgrade --install aws-ebs-csi-driver  --namespace kube-system  aws-ebs-csi-driver/aws-ebs-csi-driver
```
This step is essential for accessing and deploying the AWS EBS CSI driver, enabling seamless integration of AWS Elastic Block Store volumes within your Kubernetes cluster

## Step 8: Create SSL Certificates for Each Domain
Execute the following Helm command to generate SSL certificates for each domain in your specified namespace:

```bash
$ helm install ssl-<component> forms-flow-ssl/forms-flow-<component> --set Domain=<domain> --set issuer.acmeEmail=<valid-email>  --set issuer.ingressClass=<ingress-classname> -n <namespace>
```
### These are the components 
- analytics
- idm
- bpm
- forms
- api
- documents-api
- data-analysis-api
- web
- admin

Generate SSL certificates for a specific component in the designated namespace using Helm. Customize the command by replacing `component`, `domain`, `valid-email`, and `ingress-classname` with the actual component name, domain, a valid email for ACME registration, and the ingress class name, respectively. This step enhances the security of your applications by enabling HTTPS access.

### Example Command
For instance, to create SSL certificates for the forms component in the production namespace with a specific domain and email, the command would look like this:

```bash
$ helm install ssl-forms forms-flow-ssl/forms-flow-forms --set Domain=example.com --set issuer.acmeEmail=your-email@example.com --set issuer.ingressClass=nginx -n production
```

Check the status of SSL certificates in the specified namespace using the command:
```bash
kubectl get certificates -n <namespace>
```

This command provides an overview of the current status and details of SSL certificates, ensuring a quick verification of successful certificate issuance and proper configuration within the Kubernetes environment

## Step 8: Deploy each Components

### 1. forms-flow-ai
```bash
helm upgrade --install forms-flow-ai forms-flow-ai --set Domain=<domain> --set postgresql-ha.postgresql.podSecurityContext.enabled=true --set mongodb.podSecurityContext.enabled=true --set insight_api_key=<insight_api_key> -n <namespace>
```
To deploy the enterprise version, provide Docker image credentials using the `imageCredentials.username` and `imageCredentials.password` settings.

> Note: You need to substitute the placeholders `DOMAIN_NAME`, and `INSIGHT_API_KEY` with your specific values. For example, in the case of Formsflow, you might use `DOMAIN_NAME=example.com` and `INSIGHT_API_KEY=your_insight_api_key` for Enterprise edition use, `--set imageCredentials.username=DOCKER_USERNAME` and` --set imageCredentials.password=DOCKER_PASSWORD`

**Important:** Both the Docker username `(DOCKER_USERNAME)` and password `(DOCKER_PASSWORD)` should be provided by the [formsflow.ai](https://formsflow.ai/) team. Ensure you receive these credentials before proceeding with the setup.

Initially, set the `insight-api-key` to 'test.' Once Analytics is deployed, obtain the correct Insight API key and redeploy the Forms Flow AI component to ensure proper integration

### 2. forms-flow-analytics

```yaml
helm upgrade --install forms-flow-analytics forms-flow-analytics --set ingress.ingressClassName=<ingress_classname> --set ingress.hosts[0].host=<forms-flow-analytics-hostname> --set ingress.tls[0].secretName=<forms-flow-analytics-hostname-tls> --set ingress.tls[0].hosts[0]=<forms-flow-analytics-hostname> --set ingress.hosts[0].paths[0]="/" --set ingress.subFilterHost=<forms-flow-analytics-hostname> -n <namespace>
```
### 3. forms-flow-idm

```bash
helm upgrade --install forms-flow-idm forms-flow-idm  --set keycloak.ingress.hostname=<forms-flow-idm-hostname> --set postgresql-ha.postgresql.podSecurityContext.enabled=true --set keycloak.ingress.ingressClassName=<ingress_classname> --set keycloak.ingress.annotations."cert-manager\.io/cluster-issuer"=ssl-idm -n <namespace>
```
### 4. forms-flow-bpm

```bash
helm upgrade --install forms-flow-bpm forms-flow-bpm --set ingress.ingressClassName=<ingress_classname> --set ingress.hostname=<forms-flow-bpm-hostname> --set ingress.annotations."cert-manager\.io/cluster-issuer"=ssl-bpm --set camunda.websocket.securityOrigin=<forms-flow-web-hostname> --set image.repository=formsflow/forms-flow-bpm-ee -n <namespace>
```
### 5. forms-flow-forms

```bash
helm upgrade --install forms-flow-forms forms-flow-forms --set ingress.ingressClassName=<ingress_classname> --set ingress.hostname=<forms-flow-forms-hostname> --set ingress.annotations."cert-manager\.io/cluster-issuer"=ssl-forms -n <namespace>
```
### 6. forms-flow-api

```bash
helm upgrade --install forms-flow-api forms-flow-api --set ingress.ingressClassName=<ingress_classname> --set ingress.hostname=<forms-flow-api-hostname> --set ingress.annotations."cert-manager\.io/cluster-issuer"=ssl-api --set image.repository=formsflow/forms-flow-webapi-ee -n <namespace>
```
Make sure to replace `ipaas.embedded_api_key` and `ipaas.jwt_private_key` with the actual keys provided to you.

Example:
```yaml
ipaas:
  embedded_api_key: IPAAS_EMBEDDED_API_KEY
  jwt_private_key: IPAAS_JWT_PRIVATE_KEY
```

### 7. forms-flow-documents-api

```bash
helm upgrade --install forms-flow-documents-api forms-flow-documents-api --set ingress.ingressClassName=<ingress_classname> --set ingress.hostname=<forms-flow-documents-api-hostname> --set ingress.annotations."cert-manager\.io/cluster-issuer"=ssl-documents-api --set image.repository=formsflow/forms-flow-documents-api-ee -n <namespace>
```
### 8. forms-flow-data-analysis

```bash
helm upgrade --install forms-flow-data-analysis forms-flow-data-analysis --set ingress.ingressClassName=<ingress_classname> --set ingress.hostname=<forms-flow-data-analysis-hostname> --set ingress.annotations."cert-manager\.io/cluster-issuer"=ssl-data-analysis --set image.repository=formsflow/forms-flow-data-analysis-api-ee -n <namespace>
```
Make sure to replace `openApiKey` with the actual key in the `values.yaml` file provided to you.

Example:
```yaml
openApiKey: OPENAI_API_KEY
```

### 9. forms-flow-web

```bash
helm upgrade --install forms-flow-web forms-flow-web --set ingress.ingressClassName=<ingress_classname> --set ingress.hostname=<forms-flow-web-hostname>  --set ingress.annotations."cert-manager\.io/cluster-issuer"=ssl-web --set image.repository=formsflow/forms-flow-web-ee -n <namespace>
```
Make sure to replace `clarity_key` and `show_premium_icon` with the appropriate values provided to you.

Example: 
```yaml
ShowPremiumIcon: SHOW_PREMIUM_ICON
ClarityKey: true
```

### 10. forms-flow-admin

```bash
helm upgrade --install forms-flow-admin forms-flow-admin --set ingress.ingressClassName=<ingress_classname> --set ingress.hostname=<forms-flow-admin-hostname>  --set ingress.annotations."cert-manager\.io/cluster-issuer"=ssl-admin -n <namespace>
```
## Conclusion

In this guide, we walked through the process of installing [formsflow.ai](https://formsflow.ai/) on AWS Elastic Kubernetes Service (EKS) using formsflow-ai-charts. We covered essential steps, including setting up the necessary tools (AWS CLI, Kubectl, and Helm), connecting to your EKS cluster, and deploying components of [formsflow.ai](https://formsflow.ai/) while ensuring secure communication and efficient traffic management through SSL certificates and an Nginx Ingress Controller.

By following these instructions, you can leverage the power of formsflow.ai to build powerful business applications with ease, benefiting from its integration of leading open-source technologies like form.io, Camunda, Keycloak, and Redash.

