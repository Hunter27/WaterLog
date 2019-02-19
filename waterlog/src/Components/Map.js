import React, { Component } from 'react';
import { Map, 
        TileLayer, 
        Polyline, 
        CircleMarker, 
        Popup 
} from 'react-leaflet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMapsData } from './../actions/MapActions';
import Loader from './Loader';


var markers = [
	{ id: 1, lat: -25.782473, lon: 28.338061, status: 'fault' },
	{ id: 2, lat: -25.782454, lon: 28.337993, status: 'ok' },
	{ id: 3, lat: -25.782456, lon: 28.337866, status: 'ok' },
	{ id: 4, lat: -25.782634, lon: 28.338039, status: 'ok' },
	{ id: 5, lat: -25.783408, lon: 28.33618, status: 'fault' }
];

var segments = [
	{ id: 1, senseIDIn: 1, senseIDOut: 2, status: 'leak' },
	{ id: 2, senseIDIn: 2, senseIDOut: 3, status: 'normal' },
	{ id: 3, senseIDIn: 3, senseIDOut: 4, status: 'normal' },
	{ id: 4, senseIDIn: 4, senseIDOut: 5, status: 'leak' }
];

const backgroundColor = '#253238';
const errorColor = '#FF1744';
const lighterColor = '#4F5B62';
class MapComponent extends Component {
  componentDidMount() {
		this.props.fetchMapsData();
  }
  
	constructor() {
		super();
		this.state = {
			lat: -25.783000,
			lng: 28.337000,
			markers: markers,
			simpleView: false,
			segments: segments,
			zoom: 17
		};
	}

	render() {
    const { error, loading, mapData } = this.props;
    if (error) {
			return <div>Error! {error.message}</div>;
		}
		if (loading) {
			return <Loader />
    }
    
    if(mapData){

    } else {
      return <div>Error! Failed to fetch</div>;
    }
    const position = [ this.state.lat, this.state.lng ];
    let defaultColor = this.state.simpleView ? backgroundColor:lighterColor;
		return (
			<div className="map-main-div">
				<div className="map-tile-div">
					<Map center={position} zoom={this.state.zoom} zoomControl={false}>
						{(() => {
							if (this.state.simpleView)
								return <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />;
						})()}
						{this.state.segments.map((segment) => { 
							let sensorIn = this.state.markers.find((marker) => {
								if (marker.id === segment.senseIDIn) return marker; else return null;
							});
							let sensorOut = this.state.markers.find((marker) => {
								if (marker.id === segment.senseIDOut) return marker; else return null;
							});
							let sensorInColor = defaultColor,
								sensorOutColor = defaultColor,
								segmentColor = defaultColor;
							if (sensorIn.status.toLowerCase() === 'fault') {
								sensorInColor = errorColor;
							}
							if (sensorOut.status.toLowerCase() === 'fault') {
								sensorOutColor = errorColor;
							}
							if (segment.status.toLowerCase() === 'leak') {
								segmentColor = errorColor;
							}

							return (
								<div>
									<Polyline
										positions={[ [ sensorIn.lat, sensorIn.lon ], [ sensorOut.lat, sensorOut.lon ] ]}
                    color={segmentColor}
                    weight={6}
									>
										<Popup>
											<span>{'segment ' + segment.id + '\n status ' + segment.status}</span>
										</Popup>
									</Polyline>
									<CircleMarker
										center={[ sensorIn.lat, sensorIn.lon ]}
                    radius={5}
                    opacity={.7}
										key={sensorIn.id}
                    color={sensorInColor}
                    fillOpacity={1}
									>
										<Popup>
											<span>{'sensor ' + sensorIn.id + '\n status ' + sensorIn.status}</span>
										</Popup>
									</CircleMarker>
									<CircleMarker
										fill={true}
										center={[ sensorOut.lat, sensorOut.lon ]}
										radius={5}
                    opacity={.7}
										key={sensorOut.id}
                    color={sensorOutColor}
                    fillOpacity={1}
									>
										<Popup>
											<span>{'sensor ' + sensorOut.id + '\n status ' + sensorOut.status}</span>
										</Popup>
									</CircleMarker>
								</div>
							);
						})}
					</Map>
				</div>
				<div className="map-button-div-layer2 map-button-tab">
					<button
						className={`map-button ${this.state.simpleView ? '' : 'active'}`}
						onClick={() => {
							this.setState({ simpleView: false });
						}}
					>
						Simplified
					</button>
					<button
						className={`map-button ${this.state.simpleView ? 'active' : ''}`}
						onClick={() => {
							this.setState({ simpleView: true });
						}}
					>
						Live Map
					</button>
				</div>
			</div>
		);
	}
}


MapComponent.propTypes = {
	fetchMapsData: PropTypes.func.isRequired,
	mapData: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  mapData: state.maps.items,
	loading: state.maps.loading,
	error: state.maps.error
});

export default connect(mapStateToProps, { fetchMapsData })(MapComponent);
