import React, { Component } from 'react';
import {connect} from 'react-redux';
import InputRange from 'react-input-range';
import PropTypes from 'prop-types';
import 'react-input-range/lib/css/index.css';
import { getActiveContests, setFilter } from '../../actions/actionCreator';
import MySelect from '../Input/MySelect';
import Button from '../Button/Button';
import options from '../../constants/constants';
import styles from './Filter.module.sass';
import queryString from 'query-string';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      industry: '',
      price: {
        min: 0,
        max: 100,
      },
    };
  }

  setValue = (name, e) => {
    this.setState({ [name]: e });
  };

  clearFilter = () => {
    this.setState({
      type: '',
      industry: '',
      price: {
        min: 0,
        max: 100,
      },
    });
    this.props.getActiveContests();
  };

  findFilter = () => {
    const {type, industry, price} = this.state;
    const {setFilter} = this.props;
    let filterData = {
      type: type.value,
      industry: industry.value,
      price: `${price.min},${price.max}`,
    };
    filterData = queryString.stringify(filterData);
    setFilter(filterData);
  };

  render() {
    const { type, industry, price } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <span>Filters: </span>
          <MySelect
            value={type}
            options={options.types}
            placeholder={'type'}
            onChange={this.setValue}
            name={'type'}
            className={styles.select}
          />
          <MySelect
            value={industry}
            options={options.industry}
            placeholder={'industry'}
            onChange={this.setValue}
            name={'industry'}
            className={styles.select}
          />
        </div>
        <div className={styles.row}>
          <span className={styles.price}>Price: </span>
          <div className={styles.range}>
            <InputRange
              maxValue={100}
              minValue={0}
              value={price}
              onChange={price => this.setState({ price })}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.buttons}>
            <Button content={'clear'} btnStyle={'filter'} onClick={this.clearFilter}/>
            <Button content={'find'} btnStyle={'filter'} onClick={this.findFilter}/>
          </div>
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  setFilter: (data) => dispatch(setFilter(data)),
  getActiveContests: () => dispatch(getActiveContests()),
});

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Filter);
