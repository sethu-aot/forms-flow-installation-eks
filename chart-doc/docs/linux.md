---
sidebar_position: 1
---

# Linux / MAC

### Prerequisites

- [Docker](https://docs.docker.com/desktop/install/linux/) needs to be installed andd running

## Step 1: Download the GitHub Repository

In this initial step, download the **Forms Flow AI Deployment** GitHub repository by simply clicking [**` Here `**](https://github.com/AOT-Technologies/forms-flow-ai-deployment/archive/refs/heads/main.zip)

A zip file will be downloaded.


## Step 2: Extract the downloaded .zip file

![extracted folder preview](../static/img/linux/extracted.png)


**Now double click and open the exctracted folder and go to the `scripts` directory:**

![scripts dir preview](../static/img/linux/scripts-dir.png)


There you can see  **install.bash** file:

![install file preview](../static/img/linux/install-file.png)


Now right click anywhere in the file manager  and click **open in terminal**:

![.bat file preview](../static/img/linux/open-in-terminal.png)


Now type `sudo su` in the terminal to gain elevated privilages whcih is required for the installation procedure:

![sudo permissions](../static/img/linux/sudo-su.png)
- You can type `ls` to see the **install.sh** file there


## Step 3: Install using install.bash file

Type `./install.sh` to start the installation:

- It may ask for **Do you want to continue** because it may not tested in the Docker version you have. Just enter **'y'** and proceed with the installation.

![installation start](../static/img/linux/installation-start.png)


a) The installation starts with the following question:

![Redash analytics prompt](../static/img/linux/analytics-prompt.png)
- If you need Redash Analytics Engine in the installation, provide **‘y’** as the answer, or else answer **‘n’**. (To know more about Redash Analytics Engine, please visit [Redash](https://redash.io/help/) ).


b) Verify the IP address is valid or incorrect after that. If true, provide **‘y’** as the answer, or else answer **‘n’**:

![IP Address prompt](../static/img/linux/ip-address-prompt.png)


c) Now it will ask to install **formsflow data analysis** api in the installation. Chose **'y'** or **'n'** according to your preference:

![formsflow data analysis api prompt](../static/img/linux/formsflow-analytics-api-prompt.png)


d) Once the installation is complete, the command prompt displays the **formsflow.ai is successfully installed**.


## Step 4: Mail-Configuration

For the **email-configuration**, follow the steps below:

![configuration folder](../static/img/linux/config-dir.png)

Create a folder inside the configuration folder(Inside docker-compose directory) named **bpm-mail-config**.

![mail configuration file](../static/img/linux/config.png)

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

To uninstall formsflow installed through quick installation, follow the steps:
- Go to the folder you exctracted earlier and go to the `scripts` directory
  - There you can see **uninstall.bash** file
- Now right click anywhere in the file manager  and click **open in terminal**:
- Type `chmod +x uninstall.bash` to give executable permission to the file
  - If you type `ls` you can see the uninstall.bash in green color means it has now executable permission
- Now just type `./uninstall.bash`
  - It will prompt you **to uninstall formsflow.ai installation** click **'y'** and proceed with the installation.

![uninstall formsflow](../static/img/linux/uninstall.png)


If you face any issues while installing ,please connect with [us](https://github.com/AOT-Technologies/forms-flow-ai/issues).
