import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from "redux-form";
import {composeValidators, isRequired, combineValidators, hasLengthGreaterThan} from "revalidate";
import cuid from 'cuid';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import TextInput from "../../../app/common/form/TextInput";
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from "../../../app/common/form/SelectInput";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {}

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }

  return {
    initialValues: event
  }
}

const actions = {
  createEvent,
  updateEvent
}

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
  title: isRequired({message: "Event Title is Required"}),
  category: isRequired({message: "Category is Required"}),
  description: composeValidators(
    isRequired({message: "Description is Required!"}),
    hasLengthGreaterThan(4)({message: "Description needs to be atleast 5 characters!"})
  )(),
  city: isRequired("city"),
  venue: isRequired("venue")
})

class EventForm extends Component {

  onFormSubmit = (values) => {
   
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: "Bob"
      }
      this.props.createEvent(newEvent)
      this.props.history.push('/events')
    } 

  }

  render() {
    const {submitting, pristine, invalid} = this.props;
    return (
      <Grid.Column width= "10" >
      <Segment>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Header sub color = "teal" content="Event Details" />         
              <Field name="title"
              type="text"
              component={TextInput}
              placeholder="Give Your Event a Name"
              />
              <Field name="category"
              type="text"
              options={category}
              component={SelectInput}
              placeholder="What is your Event about?"
              />
              <Field name="description"
              type="text"
              rows ="3"
              component={TextArea}
              placeholder="Tell us about your Event"
              />
              <Header sub color="teal"
              content="Event Location Details"
              />
              <Field name="city"
              type="text"
              component={TextInput}
              placeholder="Give Your Event a Name"
              />
              <Field name="venue"
              type="text"
              component={TextInput}
              placeholder="Give Your Event a Name"
              />
              <Field name="date"
              type="text"
              component={TextInput}
              placeholder="Give Your Event a Name"
              />
             
              <Button 
              disabled={invalid || submitting || pristine}
              positive type="submit">
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
            </Form>
      </Segment>
      </Grid.Column>
      
    );
  }
}

export default connect(mapState, actions)(reduxForm({form: "EventForm", enableReinitialize:true, validate } )(EventForm));
