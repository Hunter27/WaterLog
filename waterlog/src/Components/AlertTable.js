import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAlerts } from "../actions/AlertsAction";
import Loader from "./Loader";
import Error404 from "./Error404";
import { formatDate, getStatusIcon } from "./../utils";

class AlertTableComponent extends Component {
  componentDidMount() {
    this.props.fetchAlerts();
  }

  render() {
    const { error, loading, alerts } = this.props;

    if (error) {
      return <Error404 />;
    }
    if (loading) {
      return <Loader />;
    }
    return (
      <div>
        <h1 className="alerts-header">Alerts</h1>
        <div className="img-container">
          <img className="alert-img" src="images/ascending_descending.png" alt="ascending_descending icon" />
          <img className="alert-img" src="images/filter_icon.png" alt="filter icon" />
        </div>
        <table>
          <tbody>
            {alerts.map((alert, index) => (
              <tr
                key={index}
                className={`table-row ${parseInt(alert.status) == 2 ? 'table-row-unresolved' : ''}`}
                onClick={() =>
                  (window.location.href = `alert/${alert.entityName}/${
                    alert.entityId
                  }`)
                }
              >
                <td className="event-date">{formatDate(alert.date)}</td>
                <td>{`${alert.entityName.toUpperCase()} ${
                  alert.entityId
                } ${alert.entityType.toUpperCase()}`}</td>
                <td>
                  {alert.entityName === "Segment" ? `R${!isNaN(alert.cost) && alert.cost.toFixed(2)}/hr` : ""} {/*TODO fix decimal*/}
                </td>
                <td>
                  {alert.entityName === "Segment"
                    ? <img alt="severity indicator"src={getStatusIcon(alert.severity)} className="severity-indicator" />
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

AlertTableComponent.propTypes = {
  fetchAlerts: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts.items,
  loading: state.alerts.loading,
  error: state.alerts.error
});

export default connect(
  mapStateToProps,
  { fetchAlerts }
)(AlertTableComponent);
