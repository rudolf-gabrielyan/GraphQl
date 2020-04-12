import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { styles } from './styles';
import { directorsQuery } from './queries';

const withGraphQl = graphql(directorsQuery, {
    options: ({ name = '' }) => ({
        variables: { name },
    }),
});

export default compose(withStyles(styles), withGraphQl);
