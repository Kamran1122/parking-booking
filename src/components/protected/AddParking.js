import React, { Component } from 'react'
import {firebaseAuth,userRef,ref} from '../../config/constants';
import Loader from '../Loader';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';

export default class AddParking extends Component{
	constructor(props){
		super(props);
		this.state = {
			error: false,
			success: false
		}
	}
	componentWillMount(){
		this.submitHandle=(e)=>{
			e.preventDefault();
			var location = this.refs.location.value;
			var slots = this.refs.slots.value;
			if (location===''&&slots==='') {
				this.setState({
					error:true 
				});
			} else{
				var that = this;
				ref.child(`location`)
					.push({
						location: location,
						slotsCount: slots 
					},function(error){
						if (error) {
							alert('Something went wrong try again');
						} else{
							that.refs.location.value="";
							that.refs.slots.value="";
							that.setState({
								success:true 
							});
						}
					}).then((snap)=>{
						for (var i = 1; i <=slots; i++) {
							ref.child(`location/${snap.key}/slots`)
							.push({
								no: i,
								booked: false			
							})
						}
					})
			}
		}
	}
	render(){
		return(
			<div className="col-md-offset-2 col-md-4 back">	
				<form onSubmit={this.submitHandle} className="form-group" >
					<h2 className="text-center">Add Parking Location</h2>
					<input type="text" className="form-control" placeholder="Location" ref="location" /><br/>
					<input type="number" className="form-control" ref="slots" placeholder="Number of slots" /><br/>
					<input type="submit" className="btn-lg btn-default"/>
					{
						this.state.error && 
						<div className="alert alert-danger">Please fill out all the fields</div>
					}
					{
						this.state.success && 
						<div className="alert alert-success">
						<strong>Success!</strong> Location has been added.
						</div>
					}
				</form>
			</div>	
			)
	}
}