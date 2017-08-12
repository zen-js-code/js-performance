import React from 'react';
import {Container, Header, Segment, Form, Button} from 'semantic-ui-react';

export default function Settings() {
    return (
        <div>
            <Header as="h2" attached>
                Settings
            </Header>
            <Segment as={Container}>
                <Form>
                    <Form.Group widths={2}>
                        <Form.Input label="First name" placeholder="First name" />
                        <Form.Input label="Last name" placeholder="Last name" />
                    </Form.Group>
                    <Form.Group widths={2}>
                        <Form.Input label="Address" placeholder="Address" />
                        <Form.Input label="Phone" placeholder="Phone" />
                    </Form.Group>
                    <Form.Checkbox label="I agree to the Terms and Conditions" />
                    <Button type="submit">Submit</Button>
                </Form>
            </Segment>
        </div>
    );
}
