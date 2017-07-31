import React, { Component } from 'react'
import {firebaseAuth,userRef} from '../../config/constants';
import Loader from '../Loader';

export default class User extends Component{
	constructor(props){
		super(props);
		this.state = {
			userInfo: [],
			loaded: false
		}
	}
	componentWillMount(){
		var that = this;
		var userData = [];
		userRef.on('value',snap=>{
			snap.forEach( function(childSnap) {
				var key = {key: childSnap.key};
				var childData = childSnap.val().info;
				var data = Object.assign({},childData,key);
				if (data.type==='user') {
					userData.push(data);
					that.setState({
						userInfo: userData,
						loaded: true
					});
				} else{
					that.setState({
						loaded: true 
					});
				}
			});
		})
		that.deleteUser=(value)=>{
			userRef.child(value).remove();
		}
	}
	
	render(){
		return this.state.loaded===false ? <Loader /> : (
			<div className="col-md-offset-2 col-md-4 back">
				<h2 className="text-center">All Users</h2>
				{
					this.state.userInfo.map((index,key)=>
						<table className="table table-condensed tableBack" key={key} >
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{index.name}</td>
									<td>{index.email}</td>
									<td><button onClick={()=>this.deleteUser(index.key)} className="btn-default" >Delete</button></td>
								</tr>
							</tbody>
						</table>
					)		
				}
			</div>			
			)
	}
}