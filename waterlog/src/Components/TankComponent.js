import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTankLevelById } from '../actions/TankLevelsByIdAction';

export class TankComponent extends Component {
  componentWillMount() {
    this.props.fetchTankLevelById(this.props.id);
  }

  getTankImage = (percent) => {
    if (percent === 100) {
      return <img src="/images/100_tank.png"
        width="150"
        height="150"
        alt="100% tank" />
    }
    else if (percent === 50) {
      return <img src="/images/50_tank.png"
        width="150"
        height="150"
        alt="50% tank" />
    }
    else if (percent === 0) {
      return <img src="/images/0_tank.png"
        width="150"
        height="150"
        alt="0% tank" />
    }
    else if (percent === 75) {
      return <img src="/images/75_tank.png"
        width="150"
        height="150"
        alt="75% tank" />
    }
    else if (percent >= 1 && percent <= 40) {
      return (
        <div>
          <img src="/images/tank-yellow.png"
            width="150"
            height="150"
            alt="50% tank" />
          <p id="percentage">{percent}%</p>
        </div>
      )
    }
    else if (percent >= 41 && percent <= 79) {
      return (<div>
        <img src="/images/tank-orange.png"
          width="150"
          height="150"
          alt="50% tank" />
        <p id="percentage">{percent}%</p>
      </div>
      )
    }
  }
  render() {
    const { error, loading, level } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }
    if (loading) {
      return <div>Loading...</div>;
    }
    console.log(level)
    return (
      <div className={"tankComponent"}>
        <h3>{"Tank " + level.tank_Id}</h3>
        {this.getTankImage(level.percentage)}
        <h5>{level.level_Status}</h5>
        <h5> {level.instruction}</h5>
      </div>
    );
  }
}

TankComponent.propTypes = {
  fetchTankLevelById: PropTypes.func.isRequired,
  level: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  level: state.level.item,
  loading: state.level.loading,
  error: state.level.errors
});
export default connect(mapStateToProps, { fetchTankLevelById })(TankComponent);
