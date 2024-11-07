---
sidebar_position: 1
---

# Installation on Windows 

The Quick Installation method is the simplest and most straightforward way to set up formsflow. By running a single script, it automatically installs formsflow along with all necessary dependencies. This installation approach is ideal for testing the basic features and functionality of formsflow without complex configurations.

## System requirements

64-bit with at least 16GB RAM and 25GB HDD  

## Prerequisite

For installation of formsflow.ai, the [Docker Desktop](https://www.docker.com/) needs to be installed . If Docker has been installed, and if any previous formsflow.ai installations were done already, those need to be removed from the Docker Desktop.  

>  _click <a target="_blank" href="/chart-doc/static/supporting_version.md">here</a> to see tested OS configurations_  


## Step 1: Clone the GitHub Repository

In this initial step, clone the Forms Flow AI Deployment GitHub repository using the following commands:

```bash
$ git clone https://github.com/AOT-Technologies/forms-flow-ai-deployment.git
$ cd forms-flow-ai-deployment
```

## Step 2: Run the script `` install.bat`` for windows.


```
Double click "install.bat" to run the installation
```

## Step 3: Give the required values for the prompts

* If you need Redash Analytics Engine in the installation, provide ‘y’ as the answer, or else answer ‘n’. (To know more about Redash Analytics Engine, please visit [Redash](https://redash.io/help/) ).  

* Verify the IP address is valid or incorrect. If true, provide  'y' as the answer, or else answer ‘n’.
   * If the answer is 'n', provide the correct ip address of your system. 


## Step 4: Provide the ``Redash-api-key`` (optional)

As part of the installation, if the user has chosen the option to install with “Analytics” the user is asked to enter the Redash API key after the successful installation of Redash.  

* The Redash application should be available for use at port defaulted to 7000. Open [http://localhost:7001/](http://localhost:7001/) on your machine and register with any valid credentials.
* To get the Redash API key, log in to [http://localhost:7000/](http://localhost:7000/). Choose Settings->Account, and copy the API Key.
* Copy the API Key and paste it into the commandline. The installation will continue.

## Step 5: Install with Data-analysis-api (optional)

As part of the installation, the user has the option to install formsflow.ai  with “Data-Analysis-Api”.


### Fininshing setup

Once the installation is complete, the command prompt displays the installation is complete. The Docker Desktop displays all the installed containers.

## Mail-Configuration-quick-installation

For the email-configuration for “Quick-installation”, follow the steps below:-

- Create a directory inside the configuration folder(Inside docker-compose directory) named bpm-mail-config. 
- Create a file name mail.config.properties inside the bpm-mail-config
directory and copy the below contents and update the values as needed. 

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

##  Health Check

- Analytics should be up and available for use at port defaulted to 7001 i.e.<a target="_blank" href="http://localhost:7001/">http://localhost:7001/</a>.
 - Business Process Engine should be up and available for use at port defaulted to 8000 i.e. <a target="_blank" href="http://localhost:8000/camunda/">http://localhost:8000/camunda/</a>.
 - FormIO should be up and available for use at port defaulted to 3001 i.e. <a target="_blank" href="http://localhost:3001/checkpoint">http://localhost:3001/checkpoint</a> .
 - formsflow.ai REST API should be up and available for use at port defaulted to 5000 i.e. <a target="_blank" href="http://localhost:5000/checkpoint">http://localhost:5000/checkpoint</a> .
 - formsflow.ai web application should be up and available for use at port defaulted to 3000 i.e. <a target="_blank" href="http://localhost:3000/">http://localhost:3000/</a>.
 - Default user credentials are provided <a target="_blank" href="/chart-doc/static/user_credentials.md">here</a> .

## Conclusion



