import React, { Component } from 'react';
import Link from './Link';
import WastageSummary from './WastageSummary';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAlerts } from '../actions/AlertsAction';
import Loader from './Loader';
import Error404 from './Error404';

class SegmentLeak extends Component {
	constructor(props) {
		super(props);

		this.handleResolveClick = this.handleResolveClick.bind(this);
		this.state = {
			mapExpanded: false,
			leakResolved: false,
			error: null
		};
	}
	componentDidMount() {
	}

	handleMapExpand() {
		this.setState({
			mapExpanded: !this.state.mapExpanded
		});
	}

	handleResolveClick(id) {
		var formData = new FormData();
		formData.append('id', id);

		fetch(`${process.env.REACT_APP_API_URL}/api/segmentleaks/resolveleaks`, {
			method: 'POST',
			body: formData
		})
			.then((res) => {
				if (res.ok) {
					this.setState({
						leakResolved: !this.state.leakResolved
					});
				}
			})
			.catch((err) => {
				this.setState({
					error: err
				});
				alert(String(err));
			});
	}

	render() {
		const { error, loading, alerts } = this.props;
		if ((!alerts || alerts.length === 0) && loading) {
			return <Loader />;
		}
		if (error) {
			return <Error404/>
		}
		const leaks = alerts.filter(a => a.entityId === parseInt(this.props.match.params.id));
		const leakInfo = leaks.map((alert, index) => {
			if (parseInt(alert.status) === 2) {
				return (
					<div key={index}>
						<div className={`leakInfo ${alert.severity}`}>
							<h2>{`${alert.entityName} ${alert.entityId} ${alert.entityType}`}</h2>
							<p>({alert.severity})</p>
							<h1>R {alert.cost.toFixed(2)}</h1>
							<p>is being lost per hour!</p>
							<p>Loosing {alert.litresPerHour.toFixed(0)}&#x2113; per hour</p>
							<p>no leak would be 0&#x2113; per hour</p>
						</div>
						<img
							id="map-toggle"
							src={this.state.mapExpanded === false ? 'images/map_expand.png' : 'images/map_close.png'}
							alt="segment-map"
							onClick={() => this.handleMapExpand()}
						/>
						<hr />
						<Link to={`/alert/segment-history/${alert.entityId}`} text="component history" />
						<p className="wastegeLabel">wastage</p>
						<WastageSummary
							severity={alert.severity}
							litres={alert.typeLitres.toFixed(0)}
							percent={(alert.typeLitres / alert.totalLitres * 100).toFixed(0)}
						/>
						<button onClick={()=>this.handleResolveClick(alert.entityId)}
							disabled={this.state.leakResolved}
							className={`resolve-button ${!this.state.leakResolved ? "unresolved-leak" : "resolved-leak"}`}
						>
							{this.state.leakResolved ? "RESOLVED" : "RESOLVE"}
						</button>
						<small
							className={this.state.leakResolved === false ? 'default-status' : 'leak-unresolved-status'}
							id="resolved-status"
						>
							{this.state.leakResolved === false ? (
								'the problem is fixed, click'
							) : (
								''
							)}
						</small>
					</div>
				);
			}
			else
				//Need to fetch from API
				return <Error404 />
		});
		//TODO: Fix this map function -> why??
		return <div>{leakInfo[0]}</div>;
	}
}

SegmentLeak.propTypes = {
	fetchAlerts: PropTypes.func.isRequired,
	alerts: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
	alerts: state.alerts.items,
	loading: state.alerts.loading,
	error: state.alerts.error
});
export default connect(mapStateToProps, { fetchAlerts })(SegmentLeak);
