# Luggage Care Technical Challenge

A fun technical challenge to find out how familiar you are with several engineering tasks and orchestrating them all together.

## Summary

At our office we often order sandwiches at a local sandwich­shop. Right now everybody that wants to have a sandwich needs to write down their preferred choice.

We need an application backed by a database to manage this (very complex) process.

A administrator should be able to add users (people that are going to eat the sandwich). The administrator should open up “registration” for a new meal. That stops people from ordering subway meals all the time. A meal has a status that can be controlled by the admin (open and closed).

Only one meal can be “open” at a single time. And only on a open meal users can register their choice. A meal also has a date (the date that we had the meal).

A meal should also have a unique link. This link can be opened on a mobile device (without a password) to check what the current order is.

Every user should have a unique code he can login with on a certain page. On that page the user can pick:
• What bread (dropdown list, choices from database)
• Size of the bread (dropdown, 15 or 30 cm)
• If it should be oven baked or not
• Taste of the sandwich (dropdown from database, for instance chicken fajita)
• Extra’s (extra bacon, double meat or extra cheese)
• What vegetables you want on the sandwich (dropdown, multiple possible values from the database)
• What sauce (dropdown from the database)

Then the user can place his order (on the current open order). The user must be able to edit his order (but only when the order is still open).

The user should also be able to view his previous orders when he is “logged in” by his unique link.
Make sure to include instructions on how to get the application up and running as you will get judged by that process as well.

### Bonuspoints

• Whenever the user needs to place a new order, his previous order will automatically be prefilled in the form
• On the unique link of the admin, the GPS location of the mobile phone of the “subway retrieving user” should be tracked and available on the unique links of all the users (on a Google map)
• Users should be able to rate their experience with a meal, so they can see if they should order the same meal again
• A button on the “admin mobile page” can be pressed to call ahead using MessageBird to the subway restaurant, that a big order is coming their way ;)
• You unit­test and acceptance­test the “complex” application

## Setting up the Application

Run the following commands to setup the application locally:

- Install npm packages

```bash
npm install
```

- Install HomeBrew, then install Mongodb with Homebrew and create its data folder

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

brew update
brew install mongodb
mkdir -p /data/db
sudo chown -R `id -un` /data/db
# Enter your password
```

- Run Mongo daemon

```bash
mongod
```


### Running the Application

- To run both the frontend web app and and the API service in dev run:

```bash
npm start
```

- To run just the API service in dev run:

```bash
npm run dev-server
```

- To build the frontend web app and and the API service in dev run:

```bash
npm run build-all
```

- To run or stop both the frontend web app and and the API service in prod run:

```bash
npm run prod-start
npm run prod-stop
```

- To view all prod logs:

```bash
npm run prod-logs
```
