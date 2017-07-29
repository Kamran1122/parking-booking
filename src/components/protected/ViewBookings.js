import React, { Component } from 'react';
import Loader from '.././Loader';
import {firebaseAuth,userRef,insert} from '../../config/constants';

export default class ViewBookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	bookingInfo: [],
    	loaded: false
    }
  }
  componentWillMount(){
	var that = this;
	firebaseAuth().onAuthStateChanged((user)=>{
	  if (user) {
	  	var bookingData = [];
	  	insert.ref('users').on('value',snap=>{
	  	  snap.forEach(function(childSnap){
	  	  	insert.ref('users/'+childSnap.key+'/bookings').on('value',snap=>{
	  	  		snap.forEach(function(subChild){
	  	  			var subData = subChild.val();
	  	  			bookingData.push(subData);
	  	  			that.setState({
	  	  				bookingInfo:bookingData,
						loaded: true
	  	  			});
	  	  		})
	  	  	})
	  	  })
	  	})
	  }  
	});
  }
  render() {
    return this.state.loaded===false ? <Loader /> : (
      <div className="col-md-offset-2 col-md-4 back">
      	<h2 className="text-center" >All Bookings</h2>
      	{
      		this.state.bookingInfo.map((index,key)=>
				<table className="table table-condensed tableBack" key={key}>
					<thead>
						<tr>
							<th>Location</th>
							<th>Slot No</th>
							<th>Hours</th>
							<th>Start Date</th>
							<th>Start Time</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{index.location}</td>
							<td>{index.no}</td>
							<td>{index.hours}</td>
							<td>{index.startDate}</td>
							<td>{index.startTime}</td>
						</tr>
					</tbody>
				</table>
      		)	
      	}
      </div>
    );
  }
}