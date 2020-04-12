import { gql } from 'apollo-boost';

export const addMovieMutation = gql`
    mutation addMovieMutation($name: String!, $gener: String!, $directorId: ID!, $rate: Int, $watched: Boolean!) {
        addMovie(name: $name, gener: $gener, directorId: $directorId, rate: $rate, watched: $watched){
            name
        }
    }
`;

export const updateMovieMutation = gql`
    mutation updateMovieMutation($id: ID, $name: String!, $gener: String!, $directorId: ID!, $rate: Int, $watched: Boolean!) {
        updateMovie(id: $id, name: $name, gener: $gener, directorId: $directorId, rate: $rate, watched: $watched){
            name
        }
    }
`;