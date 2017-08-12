import React from 'react';
import {Container, Header, Segment, Form, TextArea} from 'semantic-ui-react';

export default function Edit() {
    return (
        <div>
            <Header as="h2" attached>
                Edit
            </Header>
            <Segment as={Container}>
                <Form>
                    <TextArea autoHeight placeholder='Type in the recipe' />
                </Form>
            </Segment>
        </div>
    );
}
