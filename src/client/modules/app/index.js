import React, {Children} from 'react';
import PropTypes from 'prop-types';
import {Container} from 'semantic-ui-react';

import Header from '../../components/header/Header';

function App(props) {
    const Content = Children.only(props.children);

    return (
        <Container fluid>
            <Header />
            <Container fluid>
                {Content}
            </Container>
        </Container>
    );
}

App.propTypes = {
    children: PropTypes.element.isRequired
};

export default App;
