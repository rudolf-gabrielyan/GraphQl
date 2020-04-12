const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLBoolean } = graphql;

const Movies = require('../models/movie');
const Directors = require('../models/director');

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type:  new GraphQLNonNull( GraphQLString ) },
        gener: { type:  new GraphQLNonNull( GraphQLString ) },
        rate: { type: GraphQLInt  },
        watched:{ type:  new GraphQLNonNull( GraphQLBoolean ) },
        director: {
            type: DirectorType,
            resolve({ directorId }, args) {
                return Directors.findById(directorId);
            }
        }
    })
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve({ id }, args) {
                return Movies.find({ directorId: id });
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: { type: new GraphQLNonNull( GraphQLString ) },
                age: { type: new GraphQLNonNull( GraphQLInt ) },
            },
            resolve(parent, { name, age }) {
                const director = new Directors({ name, age });
                return director.save();     
            },
        },
        addMovie: {
            type: MovieType,
            args: {
                name: { type: new GraphQLNonNull( GraphQLString ) },
                gener: { type: new GraphQLNonNull( GraphQLString ) },
                directorId: { type: new GraphQLNonNull( GraphQLID ) },
                rate: { type: GraphQLInt  },
                watched:{ type:  new GraphQLNonNull( GraphQLBoolean ) },
            },
            resolve(parent, { name, gener, directorId, rate, watched }) {
                const movie = new Movies({ name, gener, directorId, rate, watched });
                return movie.save();      
            },
        },
        deleteDirector: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }){
                return Directors.findByIdAndRemove(id);
            }
        },
        deleteMovie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }){
                return Movies.findByIdAndRemove(id);
            }
        },
        updateDirector: {
            type: DirectorType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull( GraphQLString ) },
                age: { type: new GraphQLNonNull( GraphQLInt ) },
            },
            resolve(parent, { id, name, age }) {
                return Directors.findByIdAndUpdate(
                    id,
                    { $set: { name, age } },
                    { new: true }
                )
                 
            },
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull( GraphQLString ) },
                gener: { type: new GraphQLNonNull( GraphQLString ) },
                directorId: { type: new GraphQLNonNull( GraphQLID ) },
                rate: { type: GraphQLInt  },
                watched:{ type:  new GraphQLNonNull( GraphQLBoolean ) },
            },
            resolve(parent, { id, name, gener, directorId, rate, watched }) {
                return Movies.findByIdAndUpdate(
                    id,
                    { $set: { name, gener, directorId, rate, watched } },
                    { new: true }
                )
                 
            },
        }
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }){
                return Movies.findById(id);
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }){
                return Directors.findById(id);
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            args: { name: { type: GraphQLString } },
            resolve(parent, { name }) {
                return Movies.find({ name: { $regex: name, $options: "i" } });
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            args: { name: { type: GraphQLString } },
            resolve(parent, { name }) {
                return Directors.find({ name: { $regex: name, $options: "i" } });
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
