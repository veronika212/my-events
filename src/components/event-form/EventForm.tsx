import React, { Component } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

interface EventFormData extends InjectedFormProps {
  firstName?: string;
  lastName?: string;
  email?: string;
}

class EventForm extends Component<EventFormData> {
  onSubmit = values => {
    console.log(values);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'eventForm',
})(EventForm);
