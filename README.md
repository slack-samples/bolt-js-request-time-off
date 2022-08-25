# Take Your Time for Bolt JS

This is a [Slack CLI](https://api.slack.com/future/overview) compatible app that uses Bolt Javascript to create an interactive time off request flow.

The application can be used to submit time off requests through a workflow, which will then be sent to a specified manager. The manager will be able to approve or deny the request, notifying the submitter.

## Installation

#### Prerequisites
To use this template, you will need to have installed and configured the Slack CLI. 
Do this by following our [Quickstart Guide](https://api.slack.com/future/quickstart).

#### Get Started
Make a Run On Slack app with this with repo by creating an app from this template, configuring your app, then writing functions.

Once you're done, you can Run your app with the CLI's local development server or Deploy your app to production.

### Setup Your Project

```zsh
# Clone this project onto your machine
slack create my-app -t slack-samples/bolt-js-take-your-time

# Change into this project directory
cd my-app

# Run app locally
slack run

# Deployment 
# Slack currently doesn't support deployment of Bolt apps

```
#### Running your app locally

While building your app, you can see your changes propagated to your 
workspace in real-time with `slack run`.

Executing `slack run` starts a local development server, syncing changes to 
your workspace's development version of your app. (You'll know it's the 
development version because the name has the string `(dev)` appended).

Your local development server is ready to go when you see the following:

```zsh
Connected, awaiting events

```

When you want to turn off the local development server, use `Ctrl+c` in the command prompt.

### Initialize your Workflow Trigger
To allow for a workflow to be called in a workspace, you'll need to create a trigger through a JSON config file which can be found in `triggers/link-shortcut.json`. 

The contents of the file looks something like this:

```
{
  "type": "shortcut",
  "name": "Take Your Time",
  "description": "Submit a request to take time off",
  "workflow": "#/workflows/time_off_request_wf",
  "shortcut": {},
  "inputs": {
    "interactivity": {
      "value": "{{data.interactivity}}"
    }
  }
}
```

This file acts as a config for your trigger that specifies what shortcuts and/or workflows are linked to your trigger (in this case, it maps the workflow to the `approval_wf` callback ID from the Approval Workflow initialized in `workflows/approval.js`).

This file will also define how the trigger shows up in your application - for example, the `name` field will be the name of the trigger when it is surfaced in the Shortcut menu for your app in your workspace.

To create a trigger for your workflow, run the following command:
```
slack triggers create --trigger-def="triggers/link-shortcut.json"
```

This trigger will produce an output that looks like this:
```
⚡ Trigger created
     Trigger ID:   [ID for trigger]
     Trigger Type: [type of rigger]
     Trigger Name: [name of trigger]
     Shortcut URL:  [some URL]
```
To add the trigger to a channel for easy usage, you can add the link trigger URL as a channel bookmark.

#### Adding new triggers

To add new triggers to your app, you’ll need to do the following:

1. Update the `manifest.js` with the desired workflow and/or functionality you’d like linked to your trigger
2. Run `slack run` so that any new additions to the `manifest.js` file will be detected within the `slack trigger` command.
3. Create a JSON file in the triggers directory to generate your trigger
4. Run `slack triggers create --trigger-def="triggers/[json-name].json"`

#### Deploying your app to Slack

When you're done developing your app, you can deploy it directly to Slack 
with `slack deploy`.

## Project Structure

### `app.js`

`app.js` is the entry point for the application and is the file you'll run to start the server. This project aims to keep this file as thin as possible, primarily using it as a way to route inbound requests.

### `/listeners`

Every incoming request is routed to a "listener". Inside this directory, we group each listener based on the Slack Platform feature used. For this project, our `/listeners` directory contains a `/functions` directory which then holds related actions in an `/actions` directory that are triggered as handlers when a function is called triggered.

### `/listeners/request-approval.js`

This file contains the configuration for notifying a manager once an approval request has been submitted, which then triggers a function. This file sets up a listener to listen for the function being called and then executes a particular response that sends a message to the approver to then approve or deny the request.

### `/manifest`

This directory contains all related initialization of the app as well as any workflows or functions used in the project. 

### `/manifest/manifest.js`

`manifest.js` is a configuration for Slack CLI apps using Bolt JS. This file will establish all basic configurations for your application, including app name and description. 

### `/manifest/workflow`

The workflow initialization for the Time Off workflow can be found in `/manifest/workflow/approval.js`. This includes adding different steps to your workflows to create a series of events (such as opening a modal or messaging someone)

### `/triggers`

All trigger configuration files live in here - for this example, `link-shortcut.json` is the trigger config for a trigger that starts the workflow initialized in `/workflows/approval.js`.

### `slack.json`

`slack.json` is a required file for running Slack CLI apps. This file is a way for the CLI to interact with your project's SDK. It defines script hooks which are *executed by the CLI* and *implemented by the SDK.*
