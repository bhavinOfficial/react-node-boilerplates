node version :- v20.11.0

sequelize :-
    package :- npm i pg sequelize sequelize-cli
    make .sequelizerc file:-
        // content start below:- 
            const path = require('path');

            module.exports = {
                config: path.resolve('config', 'config.js'),
                'models-path': path.resolve('db', 'models'),
                'seeders-path': path.resolve('db', 'seeders'),
                'migrations-path': path.resolve('db', 'migrations'),
            };
        // content end above
    then run command :- npx sequelize-cli init

typescript :-
        first your system should have npm i -g typescript(run in system terminal and check "tsc --v" there)
            1.for demo purpose(in empty repo practice) :- 
                make app.ts in any newly made folder
                    content :- var greetings: string = "Hello";
                            var numbers: number[] = [1, 2, 3];
                run command in powershell :- npx tsc app.ts
                    for continuely watch like nodemon :- npx tsc app.ts -w
                run command in gitbash :- tsc app.ts
                    for continuely watch like nodemon :- tsc app.ts -w   
            2. for node js(only import syntax works when write code) :-
               run command(for make tsconfig.json at root directory) :- tsc --init       
                    in tsconfig.json(change following) :-
                         "target": "es2016"
                         "module": "commonjs"
                         "moduleResolution": "node10"   ( uncomment this line )
                         "rootDir": "./src"  (move your all logical contain files and folders in src folder(make new src folder))
                         "outDir": "./dist"
                         "esModuleInterop": true
                         "forceConsistentCasingInFileNames": true
                         "strict": true
                         "skipLibCheck": true
                    make sure in src folder all files have .ts extension
                run command :- npm i -D typescript ts-node nodemon @types/node @types/express 
                changes in package.json :-
                        "main": "dist/index.js",
                        "type": "commonjs",
                        "scripts": {
                            "dev": "nodemon src/index.ts",
                            "start": "node dist/index.js",
                            "build": "npx tsc"
                        },



download nvm in windows :-
        got to :- https://github.com/coreybutler/nvm-windows/releases
                download nvm-setup.exe
                first :-  C:\Users\admin\AppData\Roaming\nvm (make sure this path)
                second :-  C:\nvm4w\nodejs (make sure this path)
                email enter is optional
        after installation complete :-
        open start menu :- write cmd => right click => run as admininstrator 
            for nvm check => nvm -v || nvm --version    
            nvm list available = Show all available Node.js versions that can be installed.
            nvm install <version>	=> Install a specific Node.js version (e.g., nvm install 20.16.0).
            nvm install latest => Install the latest Node.js version.
            nvm list || nvm ls	=> Show all available Node.js versions that can be installed.
            nvm use <version>	=> Switch to a specific Node.js version (e.g., nvm use 20.16.0).
            nvm uninstall <version>	=> Remove a specific Node.js version (e.g., nvm uninstall 20.16.0).
            nvm on	=> Enable NVM (used if it was turned off).
            nvm off	=> Disable NVM temporarily.
            nvm current => Show the currently active Node.js version(in your system) . || node -v || node --version


elastic search paform and node js queries:- 1(platform) and 2(node js)
    //* to find all the indexs
        1. GET /_cat/indices?v
            GET /_cat/indices?format=json

        2.  await client.cat.indices({ format: 'json' })

    //* to get data from any index
        1. GET /user/_search
            {
            "query": {
                "match_all": {}
            }
            }

         2. const response = await client.search({
            index: 'user',
            body: {
                query: {
                    match_all: {} // Retrieves all documents
                }
            }
        });  

    //* to search by 1 field
        1.GET /user/_search
            {
            "query": {
                "match": { "userName": "ishbedi536" }
            }
            }     

        2.const response = await client.search({
            index: 'user_names',
            body: {
                query: {
                    match: { username } // Search for a specific username
                }
            }
        });


    //* to search in more than 1 field
        1.GET /user/_search
            {
            "query": {
                "multi_match": {
                "query": "ishbedi536",
                "fields": ["userName", "email", "firsName", "lastName"]
                }
            }
            }

        2.  const response = await client.search({
            index: 'user_names',
            body: {
                query: {
                    multi_match: {
                        query: queryText,
                        fields: ["username", "email", "full_name"] 
                    }
                }
            }
        }); 


    //* to search multiple fields at once
        1.GET /user_names/_search
            {
            "query": {              
                "bool": {
                "must": [
                    { "match": { "username": "john_doe" }},
                    { "match": { "email": "john@example.com" }}
                ]
                }
            }
            }  

        2.   const response = await client.search({
            index: 'user_names',
            body: {
                query: {
                    bool: {
                        must: [
                            { match: { username } },
                            { match: { email } }
                        ]
                    }
                }
            }
        }); 


    //* to get mappings(keys) of any index
        1. GET /products/_mappings

        2. const result = await client.indices.getMapping({ index: 'products' });

    //* to add mappings(keys) in any index
        1.    PUT /products/_mapping  
            {
            "properties": { 
                "isCreatedByAdmin": {
                "type": "boolean"
                },
                "isLastUpdatedByAdmin": {
                "type": "boolean"
                }
            }
            } 
        2. const response = await client.indices.putMapping({
                index: 'products',
                body: {
                properties: {
                    isCreate    dByAdmin: {
                    type: 'boolean'
                    },
                    isLastUpdatedByAdmin: {
                    type: 'boolean'
                    }
                }
                }
            });  

    //* to delete any index
        1.  DELETE /products   
        2.  const response = await client.indices.delete({ index: 'products' });  

    //* to remove(trunate) all the data
        1.      POST /your_index_name/_delete_by_query
            {
            "query": {
                "match_all": {}
            }
            }

        2.  const response = await client.deleteByQuery({
            index: 'products',
            body: {
            query: {
                match_all: {}
            }
            }
        });  


     //* to remove any specfic data by search
        1. POST /your_index_name/_delete_by_query
            {
            "query": {
                "term": {
                "userName": "raj"
                }
            }
            }   

        2. const response = await client.deleteByQuery({
            index: 'products',
            body: {
            query: {
                term: {
                userName: "raj"
                }   
            }
            }
        })  

    // * to update any specfic data
        1.  POST /your_index_name/_update_by_query
        {
        "query": {
            "term": {
            "userName": "raj"
            }
        },
        "script": {
            "source": "ctx._source.userName = 'newUsername'",
            "lang": "painless"
        }
        }

        2.  const response = await client.updateByQuery({
            index: 'users',
            body: {
            query: {
                term: {
                userName: 'raj'
                }
            },
            script: {
                source: "ctx._source.userName = 'john'",
                lang: "painless"
            }
            }
        });


    //* to get data in range
        1.    POST /your_index_name/_search
            {
            "query": {
                "range": {
                "dateField": {
                    "gte": "2025-01-01",  // Greater than or equal to
                    "lte": "2025-01-31",  // Less than or equal to
                    "format": "yyyy-MM-dd" // Optional: Specify the date format
                }
                }
            }
            }

        2.    const response = await client.search({
                index: 'orders',
                body: {
                query: {
                    range: {
                    createdAt: {
                        gte: '2025-01-01',
                        lte: '2025-01-31',
                        format: 'yyyy-MM-dd'
                    }
                    }
                }
                }
            });  

    //* pagination logic
        1. POST /your_index_name/_search
            {
            "query": {
                "match_all": {}
            },
            "from": 0,
            "size": 10
            }

        2.  const response = await client.search({
            index: 'orders',
            body: { 
            query: {
                match_all: {}
            },
            from: from,
            size: size
            }
        });    
             

    
            
















