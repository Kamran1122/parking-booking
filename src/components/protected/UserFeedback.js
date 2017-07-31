import React, { Component } from 'react';
import {firebaseAuth,userRef,insert} from '../../config/constants';
import Loader from '.././Loader';

export default class UserFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	done: false,
    	loaded: false
    }
  }
  componentWillMount(){
	var that = this;
	var username = null;
	firebaseAuth().onAuthStateChanged((user)=>{
		if (user) {
			insert.ref('users/'+user.uid).on('value',snap=>{
				snap.forEach( function(childSnap) {
					username= childSnap.val().name;
					that.setState({
						loaded:true 
					});
				});
			})
			that.handleSubmit=(e)=>{
				e.preventDefault();
				insert.ref('feedback').push({
					name: username,
					title: that.refs.title.value,
					des: that.refs.description.value
				},function(error){
					if (error) {
						alert(error);
					}
					else{
						that.setState({
							done:true 
						});
					}
				})
			}
		}
	})
  }
  render() {
    return this.state.loaded===false ? <Loader /> : (
    <div>
    	{
    	this.state.done===true ? <div><h2 className="text-center" >Thank you for your feedback!</h2></div> :
      <div className="col-md-offset-2 col-md-4 back">
      	<h2 className="text-center">Give us your Feedback</h2>
      	<form onSubmit={(e)=>this.handleSubmit(e)} className="form-group">
      		<label>Title</label>
      		<input required type="text" placeholder="Title" ref="title" className="form-control" /><br/>
      		<label>Description</label>
      		<textarea required cols="30" rows="10" ref="description" className="form-control" placeholder="Give us your Views about the applicaiton" ></textarea><br/>
      		<input type="submit" className="btn-lg btn-default" value="Submit Feedback" />
      	</form>
      </div>
  		}
  	</div>
    );
  }
}