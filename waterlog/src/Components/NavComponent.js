import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAlerts } from '../actions/AlertsAction';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import AlertComponent from '../Pages/Alert';
import HomeComponent from '../Pages/Home';
import MapComponent from '../Components/MapFullScreen';
import UsageComponent from '../Pages/Usage';
import SegmentLeak from './SegmentLeak';
import TankInformation from '../Pages/TankInformation';
import FaultySensor from './FaultySensor';

class NavComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notifications: 0
		};
	}

	componentDidMount() {
		this.props.fetchAlerts();
	}

	componentWillUnmount() {
		clearInterval(this.timer);
		this.timer = null;
	}

	render() {
		const { notif } = this.props;
		
		return (
			<Router>
				<div className="App">
					<header className="app-header">
						<div className="navicons">
							<div className="logo">
								<img src="images/logo_blue.png" alt="logo" />
							</div>
							<NavLink exact to="/" className="navicon-container" activeClassName="selected-route">
								<img src="images/home_icon.png" alt="home" />
							</NavLink>
							<NavLink to="/alert" className="navicon-container" activeClassName="selected-route">
								<img src="images/alert_icon.png" alt="alert" />
								<span className="badge">{this.state.notifications || this.props.total}</span>
							</NavLink>
							<NavLink exact to="/map" className="navicon-container" activeClassName="selected-route">
								<img src="images/map_icon.png" alt="map" />
							</NavLink>
							<NavLink exact to="/usage" className="navicon-container" activeClassName="selected-route">
								<img src="images/usage_icon.png" alt="usage" />
							</NavLink>
						</div>
					</header>
					<div className="router-outlet">
						<Switch>
							<Route exact path="/" component={HomeComponent} />
							<Route exact path="/alert" component={AlertComponent} />
							<Route exact path="/alert/segment/:id/:date" render={(props) => <SegmentLeak {...props} />} />
							<Route exact path="/alert/sensor/:id/:date" render={(props) => <FaultySensor {...props} />} />
							<Route exact path="/alert/tank/:id" render={(props) => <TankInformation {...props} />} />
							<Route exact path="/map" component={MapComponent} />
							<Route exact path="/usage" component={UsageComponent} />
							<Route exact path="*" component={HomeComponent} />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

SegmentLeak.propTypes = {
	total: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
	total: state.alerts.total
});
export default connect(mapStateToProps, { fetchAlerts })(NavComponent);
