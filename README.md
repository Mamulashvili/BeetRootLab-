# Installation
AdonisJS is a Node.js framework, and hence it requires Node.js to be installed on your computer. 
To be precise, we need at least the latest release of `Node.js v14`.
<br/>
You can check the Node.js and npm versions by running the following commands.
```console
# check node.js version
node -v
```

# Running seeders
Project contains `Items` seeder and factory <br />
You can execute all or selected database seeders by running the following Ace command.
```console
# runs all
node ace db:seed
```

# Starting the development server
After creating the application, you can start the development server by running the following command.
```console
# check node.js version
node ace serve --watch
```


# Test
Test are created with Japa, to run tests: `node ace test`
```
tests/functional/api.spec.ts
  ✔ test get items call (156ms)

tests/functional/api.spec.ts
  ✔ test store, search and delete (36ms)

tests/functional/api.spec.ts
  ✔ store not supported type (8ms)

tests/functional/hello_world.spec.ts
  ✔ Check base route response (3ms)

 PASSED 

total        : 4
passed       : 4
duration     : 217ms
```

# DB
`mysql`
DB_CONNECTION=mysql
