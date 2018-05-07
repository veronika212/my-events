import React, { Component } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './event-form.css';
import { createEvent } from '../../ducks/events';
import { required, isNumber } from '../../helpers/FormHelpers';

interface EventFormData extends InjectedFormProps {
  userName?: string;
  name?: string;
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
  createEvent: any;
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

class EventFormPresenter extends Component<EventFormData> {
  onSubmit = values => {
    this.props.createEvent(values);
  };

  renderInput = field => {
    const {
      meta: { touched, error },
    } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <input
          {...field.input}
          className="form-control"
          type="text"
          placeholder={field.placeholder}
        />
        <div className="input-error">{touched ? error : ''}</div>
      </div>
    );
  };

  renderSelect = (name, options) => {
    return (
      <Field className="form-control" name={name} component="select" validate={[required]}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
    );
  };

  renderTextarea = field => {
    const {
      meta: { touched, error },
    } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <textarea
          className="form-control"
          {...field.input}
          placeholder={field.placeholder}
          rows="10"
        />
        <div className="input-error">{touched ? error : ''}</div>
      </div>
    );
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container-fluid">
        <form className="event-form" onSubmit={handleSubmit(this.onSubmit)}>
          <h4 className="event-form__title">Form of event</h4>
          <div className="row clearfix">
            <div className="col-xs-12 col-sml-12 col-md-12 col-lg-6 event-form__item event-form__float">
              <Field
                name="userName"
                component={this.renderInput}
                placeholder="Name of user"
                validate={[required]}
              />
            </div>

            <div className="col-xs-12 col-sml-12 col-md-12 col-lg-6 event-form__item event-form__float">
              <Field
                name="name"
                component={this.renderInput}
                placeholder="Name of event"
                validate={[required]}
              />
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-xs-12 col-sml-12 col-md-12 col-lg-6 event-form__item event-form__float">
              <Field
                name="address.street"
                component={this.renderInput}
                placeholder="Street"
                validate={[required]}
              />
            </div>

            <div className="col-xs-12 col-sml-12 col-md-12 col-lg-6 event-form__item event-form__float">
              <Field
                name="address.city"
                component={this.renderInput}
                placeholder="City"
                validate={[required]}
              />
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-xs-12 col-sml-12 col-md-12 col-lg-6 event-form__item event-form__float">
              <Field
                name="address.zipCode"
                component={this.renderInput}
                placeholder="zipCode"
                validate={[required, isNumber]}
              />
            </div>

            <div className="col-xs-12 col-sml-12 col-md-12 col-lg-6 event-form__item event-form__float">
              <Field
                name="address.state"
                component={this.renderInput}
                placeholder="State"
                validate={[required]}
              />
            </div>
          </div>

          <div className="col-xs-12 col-sml-12 col-md-12 col-lg-6 event-form__center">
            <Field
              name="address.place"
              component={this.renderInput}
              placeholder="Place of event"
              validate={[required]}
            />
          </div>

          <div className="row clearfix">
            <div className="col-xs-12 col-sml-12 col-md-12 col-lg-6 event-form__item event-form__float">
              <Field
                name="startDate"
                component={this.renderInput}
                placeholder="Start date of event"
                validate={[required]}
              />
            </div>

            <div className="col-xs-12 col-sml-12 col-md-12 col-lg-6 event-form__item event-form__float">
              <Field
                name="endDate"
                component={this.renderInput}
                placeholder="End date of event"
                validate={[required]}
              />
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-xs-12 col-sml-12 col-md-12 col-lg-6 event-form__item event-form__float">
              {this.renderSelect('caunty', selectOptionsCounty)}
            </div>
            <div className="col-xs-12 col-sml-12 col-md-12 col-lg-6 event-form__item event-form__float">
              {this.renderSelect('category', selectOptions)}
            </div>
          </div>

          <div className="event-form__description">
            <Field
              name="description"
              component={this.renderTextarea}
              placeholder="Description of event"
              validate={[required]}
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
      </div>
    );
  }
}

const EventForm = connect(null, { createEvent })(EventFormPresenter);

export default reduxForm({
  form: 'eventForm',
})(EventForm);
