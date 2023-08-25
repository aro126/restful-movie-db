const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        "routes": {
            "cors": {
                "origin": ['*'],
                "headers": ["Accept", "Content-Type"],
                "additionalHeaders": ["X-Requested-With"]
            }
        }
    });

    await server.register({
        plugin: require('hapi-mongodb'),
        options: {
            url: process.argv[2],
            settings: {
                useUnifiedTopology: true
            },
            decorate: true
        }
    });

    // Get all movies
    server.route({
        method: 'GET',
        path: '/movies',
        handler: async (req, h) => {

            const offset = Number(req.query.offset) || 0;

            const movie = await req.mongo.db.collection('movies').find({}).sort({ metacritic: -1 }).skip(offset).limit(20).toArray();

            return movie;
        }
    });

    // Get a single movie
    server.route({
        method: 'GET',
        path: '/movies/{id}',
        handler: async (req, h) => {
            const id = req.params.id;
            const ObjectID = req.mongo.ObjectID;

            const movie = await req.mongo.db.collection('movies').findOne({ _id: new ObjectID(id) }, { projection: { title: 1, plot: 1, fullplot: 1, cast: 1, year: 1, released: 1 } });
            
            return movie;
        }
    });

    // Search for a movie
    server.route({
        method: 'GET',
        path: '/search',
        handler: async (req, h) => {
            const query = req.query.term;

            const results = await req.mongo.db.collection("movies").aggregate([
                {
                    $search: {
                        "text": {
                            "query": query,
                            "path": "title"
                        }
                    }
                },
                {
                    $project: { title: 1, plot: 1 }
                },
                {
                    $limit: 10
                }
            ]).toArray();

            return results;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

init();  