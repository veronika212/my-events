import React, { Component } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Link } from 'react-router-dom';

import './event-form.css';

interface EventFormData extends InjectedFormProps {
  userName?: string;
  eventName?: string;
  email?: string;
  county?: string;
  address: {
    city: string;
    place: string;
    street: string;
    zipCode: number;
    state: string;
  };
  category: string;
  startDate: string;
  endDate: string;
  description: string;
}

const selectOptions = [
  {
    label: 'Category',
    value: '',
  },
  {
    label: 'Art',
    value: 'Art',
  },
  {
    label: 'Commedy',
    value: 'Commedy',
  },
  {
    label: 'Dance',
    value: 'Dance',
  },
  {
    label: 'Film',
    value: 'Film',
  },
  {
    label: 'Sport',
    value: 'Sport',
  },
  {
    label: 'Food',
    value: 'Food',
  },
  {
    label: 'Theater',
    value: 'Theater',
  },
  {
    label: 'Party',
    value: 'Party',
  },
  {
    label: 'Music',
    value: 'Music',
  },
  {
    label: 'Networking',
    value: 'Networking',
  },
];

const selectOptionsCounty = [
  {
    label: 'County',
    value: '',
  },
  {
    label: 'Banskobystricky kraj',
    value: 'Banskobystricky kraj',
  },
  {
    label: 'Bratislavsky kraj',
    value: 'Bratislavsky kraj',
  },
  {
    label: 'Nitriansky kraj',
    value: 'Nitriansky kraj',
  },
  {
    label: 'Presovsky kraj',
    value: 'Presovsky kraj',
  },
  {
    label: 'Kosicsky kraj',
    value: 'Kosicsky kraj',
  },
  {
    label: 'Trenciansky kraj',
    value: 'Trenciansky kraj',
  },
  {
    label: 'Trnavsky kraj',
    value: 'Trnavsky kraj',
  },
  {
    label: 'Zilinsky kraj',
    value: 'Zilinsky kraj',
  },
];

class EventForm extends Component<EventFormData> {
  onSubmit = values => {
    console.log(values);
  };

  renderInput = field => {
    return (
      <div>
        <input
          {...field.input}
          className="form-control"
          type="text"
          placeholder={field.placeholder}
        />
      </div>
    );
  };

  renderSelect = (name, options) => {
    return (
      <Field className="form-control" name={name} component="select">
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
    );
  };

  renderTextarea = field => (
    <div>
      <textarea
        className="form-control"
        {...field.input}
        placeholder={field.placeholder}
        rows="10"
      />
    </div>
  );

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="event-form" onSubmit={handleSubmit(this.onSubmit)}>
        <h4 className="event-form__title">Form of event</h4>
        <div className="clearfix">
          <div className="event-form__item event-form__float">
            <Field name="userName" component={this.renderInput} placeholder="Name of user" />
          </div>

          <div className="event-form__item event-form__float">
            <Field name="eventName" component={this.renderInput} placeholder="Name of event" />
          </div>
        </div>

        <div className="clearfix">
          <div className="event-form__item event-form__float">
            <Field name="address.street" component={this.renderInput} placeholder="Street" />
          </div>

          <div className="event-form__item event-form__float">
            <Field name="address.city" component={this.renderInput} placeholder="City" />
          </div>
        </div>

        <div className="clearfix">
          <div className="event-form__item event-form__float">
            <Field name="address.zipCode" component={this.renderInput} placeholder="zipCode" />
          </div>

          <div className="event-form__item event-form__float">
            <Field name="address.state" component={this.renderInput} placeholder="State" />
          </div>
        </div>

        <div className="event-form__center">
          <Field name="address.place" component={this.renderInput} placeholder="Place of event" />
        </div>

        <div className="clearfix">
          <div className="event-form__item event-form__float">
            <Field
              name="startDate"
              component={this.renderInput}
              placeholder="Start date of event"
            />
          </div>

          <div className="event-form__item event-form__float">
            <Field name="endDate" component={this.renderInput} placeholder="End date of event" />
          </div>
        </div>

        <div className="clearfix">
          <div className="event-form__item event-form__float">
            {this.renderSelect('caunty', selectOptionsCounty)}
          </div>
          <div className="event-form__item event-form__float">
            {this.renderSelect('category', selectOptions)}
          </div>
        </div>

        <div className="event-form__description">
          <Field
            name="description"
            component={this.renderTextarea}
            placeholder="Description of event"
          />
        </div>

        <div className="event-form-button">
          <button type="submit" className="btn btn-primary event-form-button__left-btn">
            Submit
          </button>
          <Link to="/" className="btn btn-danger">
            Cancel
          </Link>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'eventForm',
})(EventForm);
