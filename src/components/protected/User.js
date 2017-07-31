import React, { Component } from 'react'
import {firebaseAuth,userRef} from '../../config/constants';
import Loader from '../Loader';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import ViewLocation from './ViewLocation';
import LocationDes from './LocationDes';
import UserBookings from './UserBookings';
import UserFeedback from './UserFeedback';

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
				        <Link to="/Dashboard/ViewLocation" >
							<a href="#" className="list-group-item">
				            	<i className="fa fa-comment-o"></i> View all locations
				        	</a>
				        </Link>
				        <Link to="/Dashboard/UserBookings" >
							<a href="#" className="list-group-item">
				            	<i className="fa fa-comment-o"></i> View My Bookings
				        	</a>
				        </Link>
				        <Link to="/Dashboard/UserFeedback" >
							<a href="#" className="list-group-item">
				            	<i className="fa fa-comment-o"></i> Give Feedback
				        	</a>
				        </Link>
				    </div>        
				</div>
				<div className="">
					<Switch>
						<Route path="/Dashboard/ViewLocation" component={ViewLocation} />
						<Route path="/Dashboard/UserBookings" component={UserBookings} />
						<Route path="/Dashboard/UserFeedback" component={UserFeedback} />
					</Switch>
				</div>
			</div>
		</div>
	</BrowserRouter>				
			)
	}
}