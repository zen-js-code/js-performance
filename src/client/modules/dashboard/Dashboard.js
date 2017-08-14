import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, Header, Segment, Statistic, Card} from 'semantic-ui-react';

import {loadRecipes} from './Dashboard.actions';

export class Dashboard extends Component {
    componentWillMount() {
        // this.props.dispatch(loadRecipes('cake'));
    }

    createRecipesItems(recipes) {
        return recipes.map(({id, name}) => {
            return (
                <Card key={id}>
                    <Card.Content>
                        <Card.Header>{name}</Card.Header>
                    </Card.Content>
                </Card>
            );
        })
    }

    render() {
        const {recipes = []} = this.props;

        return (
            <div>
                <Header as="h2" attached>
                    Dashboard
                </Header>
                <Segment as={Container}>
                    <Statistic>
                        <Statistic.Label>Recipes</Statistic.Label>
                        <Statistic.Value>427</Statistic.Value>
                    </Statistic>
                </Segment>
                {/* <Segment as={Container}>
                    <Card.Group itemsPerRow={3}>
                        {this.createRecipesItems(recipes)}
                    </Card.Group>
                </Segment> */}
            </div>
        );
    }
}

export default connect((state) => {
    const {recipes = []} = state;
    return {recipes};
})(Dashboard);
