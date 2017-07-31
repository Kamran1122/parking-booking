import React, { Component } from 'react'
import {firebaseAuth,userRef} from '../../config/constants';
import Loader from '../Loader';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import AddParking from './AddParking';
import ViewLocation from './ViewLocation';
import UserDetail from './UserDetail';
import LocationDes from './LocationDes';
import ViewBookings from './ViewBookings';
import ViewFeedback from './ViewFeedback';

export default class Admin extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
	<BrowserRouter>
		<div>
			<div className="row">
				<div className="col-sm-4 col-md-3 sidebar">
				    <div className="mini-submenu">
				        <span className="icon-bar"></span>
				        <span className="icon-bar"></span>
				        <span className="icon-bar"></span>
				    </div>
				    <div className="list-group">
				        <span href="#" className="list-group-item active">
				            Admin
				            <span className="pull-right" id="slide-submenu">
				                <i className="fa fa-times"></i>
				            </span>
				        </span>
				        <Link to="/Dashboard/AddParking" >
							<a href="#" className="list-group-item">
				            	<i className="fa fa-comment-o"></i> Add a new Location
				        	</a>
				        </Link>
				        <Link to="/Dashboard/ViewLocation" >
							<a href="#" className="list-group-item">
				            	<i className="fa fa-comment-o"></i> View all locations
				        	</a>
				        </Link>
				        <Link to="/Dashboard/ViewBookings" >
							<a href="#" className="list-group-item">
				            	<i className="fa fa-comment-o"></i> View all Bookings
				        	</a>
				        </Link>
				        <Link to="/Dashboard/ViewUsers" >
							<a href="#" className="list-group-item">
				            	<i className="fa fa-comment-o"></i> View all Users
				        	</a>
				        </Link>
				        <Link to="/Dashboard/ViewFeedback" >
							<a href="#" className="list-group-item">
				            	<i className="fa fa-comment-o"></i> User Feedback
				        	</a>
				        </Link>
				    </div>        
				</div>
				<div className="">
					<Switch>
						<Route path="/Dashboard/AddParking" component={AddParking} />
						<Route path="/Dashboard/ViewLocation" component={ViewLocation} />
						<Route path="/Dashboard/ViewBookings" component={ViewBookings} />
						<Route path="/Dashboard/ViewUsers" component={UserDetail} />
						<Route path="/Dashboard/ViewFeedback" component={ViewFeedback} />
					</Switch>
				</div>
			</div>
		</div>
	</BrowserRouter>	
			
			)
	}
}