# connect-mongo : doc gathered by me

## install

```js
npm install connect-mongo
```

## Usage

```js

import session from 'express-session'
import MongoStore from 'connect-mongo'

app.use(session({
  secret: 'foo',
  store: MongoStore.create(options)
}));

```

## Create a new connection from a MongoDB connection string

```js

// Basic usage
app.use(session({
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/test-app' })
}));


// Advanced usage
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb://user12345:foobar@localhost/test-app?authSource=admin&w=1',
    mongoOptions: advancedOptions // See below for details
  })
}));

```

## Re-use an existing native MongoDB driver client promise

```js

/*
** There are many ways to create MongoClient.
** You should refer to the driver documentation.
*/

// Database name present in the connection string will be used
app.use(session({
  store: MongoStore.create({ clientPromise })
}));

// Explicitly specifying database name
app.use(session({
  store: MongoStore.create({
    clientPromise,
    dbName: 'test-app'
  })
}));

```

## Events
