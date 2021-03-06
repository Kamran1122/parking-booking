import React, { Component } from 'react'
import {firebaseAuth,userRef,locationsRef} from '../../config/constants';
import Loader from '../Loader';
import { Route, BrowserRouter, Link, Redirect, Switch,browserHistory,Router } from 'react-router-dom';
import LocationDes from './LocationDes';

export default class ViewLocation extends Component{
	constructor(props){
		super(props);
		this.state = {
			locationInfo: [],
			loaded: false,
			LocationDes: false,
			slots: null,
			location: null
		}
	}
	componentWillMount(){
		var that = this;
		locationsRef.on('value',snap=>{
			var locationData = [];
			snap.forEach(function(childSnap){
				var childData = childSnap.val();
				var key = {key: childSnap.key};
				var data = Object.assign({},childData,key);
				locationData.push(data);
				that.setState({
					locationInfo: locationData,
					loaded: true
				});
			})
		})
	}
	componentDidMount(){
		this.handleClick=(value)=>{
			var data = value.split(',');
			var key = data[0];
			var location = data[1];
			this.setState({
				LocationDes:true,
				key: key,
				location: location 
			});
		}
	}
	render(){
		return this.state.loaded===false ? <Loader /> : (
		<BrowserRouter>
			<div>
			<div className="col-md-offset-2 col-md-6 back">
				{
					this.state.LocationDes===true ? <LocationDes location={this.state.location} slotKey={this.state.key} /> :
				<div>
				<h3 className="text-center">All Locations</h3>
				{
					this.state.locationInfo.map((index,key)=>
				
				<table className="table  tableBack" key={key} >
					<thead>
						<tr>
							<th>Location</th>
							<th>Slots</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{index.location}</td>
							<td>{index.slotsCount}</td>
							<td><button onClick={()=>this.handleClick(index.key+','+index.location)} className="btn-default">View</button></td>
						</tr>
					</tbody>
				</table>
					)
				}
				</div>
				} 
			</div>
			</div>
		</BrowserRouter>
			)
	}
}