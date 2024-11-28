---
sidebar_position: 1
---

# Installation of Formsflow.ai on Windows

### Prerequisites

- [Docker](https://docs.docker.com/desktop/install/windows-install/) needs to be installed andd running


## Step 1: Download the GitHub Repository

In this initial step, download the **Forms Flow AI Deployment** GitHub repository by simply clicking [**` here `**](https://github.com/AOT-Technologies/forms-flow-ai-deployment/archive/refs/heads/main.zip)

A zip file will be downloaded.


## Step 2: Extract the downloaded .zip file

![extracted folder preview](../../static/img/extracted-file.png)


**Now double click and open the exctracted folder and go to the `scripts` folder:**

![scripts folder preview](../../static/img/scripts-folder.png)

There you can see an `install.bat` file:

![.bat file preview](../../static/img/install-file.png)

## Step 3: Double click the install.bat file to proceed with installation

a) If you encountered this warning from **Microsoft Defender** click `run anyway` and proceed with the installation:

![warning preview](../../static/img/microsoft-defender-warning.png)

b) The installation starts with the following question:

![Redash analytics prompt](../../static/img/analytics.png)
- If you need Redash Analytics Engine in the installation, provide **‘y’** as the answer, or else answer **‘n’**. (To know more about Redash Analytics Engine, please visit [Redash](https://redash.io/help/) ).


c) Verify the IP address is valid or incorrect after that. If true, provide **‘y’** as the answer, or else answer **‘n’**:

![IP Address prompt](../../static/img/ip-address-prompt.png)

d) As part of the installation, if the user has chosen the option to install with “Analytics” the user is asked to enter the Redash API key after the successful installation of Redash.

![redash api key prompt](../../static/img/redash-api-key-prompt.png)
- The Redash application should be available for use at port defaulted to 7000. Open http://localhost:7001/ on your machine and register with any valid credentials:
 ![redash landing page](../../static/img/redash-landing.png)

 - To get the Redash API key, log in to http://localhost:7001/, Choose Settings > Account, and copy the API Key and paste it into the cmd. The installation will continue.
  ![redash setings page](../../static/img/redash-settings-page.png)


e) Now it will ask to include **formsflow data analysis api** in the installation. Chose **'y'** or **'n'** according to your preference:

![formsflow data analysis api prompt](../../static/img/data-analysis-api-prompt.png)

f) Once the installation is complete, the command prompt displays the **[formsflow.ai](https://formsflow.ai/) is successfully installed** and press any key to finish the installation. The Docker Desktop displays all the installed containers:

![Successfull installation](../../static/img/succsess.png)


## Step 4: Mail-Configuration

For the **email-configuration**, follow the steps below:

![configuration folder](../../static/img/configuration-folder.png)

Create a folder inside the configuration folder(Inside docker-compose directory) named **bpm-mail-config**.

![mail configuration file](../../static/img/mail-config-file.png)

Create a file name **mail.config.properties** inside the **bpm-mail-config** folder that just created and copy the below contents and update the values as needed:

```bash
# Send mails via SMTP. The given settings are for Gmail 
mail.transport.protocol=smtp

mail.smtp.host=smtp.gmail.com
mail.smtp.port=465
mail.smtp.auth=true
mail.smtp.ssl.enable=true
mail.smtp.socketFactory.port=465
mail.smtp.socketFactory.class=javax.net.ssl.SSLSocketFactory

# Poll mails via IMAPS.
mail.store.protocol=imaps
mail.imaps.host=imap.gmail.com
mail.imaps.port=993
mail.imaps.timeout=10000

mail.sender=donotreply
mail.sender.alias=DoNotReply

mail.attachment.download=true
mail.attachment.path=attachments

# Credentials
mail.user=CHANGEME@gmail.com
mail.password=CHANGEME

```

- Now run the container to verify the changes.


## Verifying the Installation status

> The following applications will be started and can be accessed in your browser.

 Srl No | Service Name | Usage | Access | Default credentials (userName / Password)|
--- | --- | --- | --- | --- 
1|`Keycloak`|Authentication|`http://localhost:8080`| `admin/changeme`
2|`forms-flow-forms`|form.io form building. This must be started earlier for resource role id's creation|`http://localhost:3001`|`admin@example.com/changeme`
3|`forms-flow-analytics`|Redash analytics server, This must be started earlier for redash key creation|`http://localhost:7001`|Use the credentials used for registration / [Default user credentials](https://github.com/AOT-Technologies/forms-flow-ai-deployment/blob/main/docs/forms-flow-ai-properties.md)
4|`forms-flow-web`|formsflow Landing web app|`http://localhost:3000`|[Default user credentials](https://github.com/AOT-Technologies/forms-flow-ai-deployment/blob/main/docs/forms-flow-ai-properties.md)
5|`forms-flow-api`|API services|`http://localhost:5001`|`Authorization tocken from keycloak role based user credentials`
6|`forms-flow-bpm`|Camunda integration|`http://localhost:8000/camunda`| [Default user credentials](https://github.com/AOT-Technologies/forms-flow-ai-deployment/blob/main/docs/forms-flow-ai-properties.md)


## Uninstall Formsflow

To uninstall [formsflow.ai](https://formsflow.ai/) installed through quick installation, click the uninstall file in the `\forms-flow-ai-deployment\scripts` directory:

![uninstall formsflow](../../static/img/uninstall.png)


If you face any issues while installing ,please connect with [us](https://github.com/AOT-Technologies/forms-flow-ai/issues).

