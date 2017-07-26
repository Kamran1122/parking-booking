import React, { Component } from 'react'
import {firebaseAuth,userRef} from '../../config/constants';
import Loader from '../Loader';
import User from './User';
import Admin from './Admin';

export default class Dashboard extends Component {
	constructor(props){
		super(props);
		this.state = {
			studentInfo: {},
			loaded: false,
			admin: false
		}
	}

  	componentWillMount(){
  		var that = this;
  		firebaseAuth().onAuthStateChanged((user)=>{
	  		if (user) {
	  			userRef.on('value',snap=>{
	  				var studentData = [];
	  				snap.forEach(function(childSnap){
						var childData = childSnap.val();
						if (childData.info.uid===user.uid) {
							if (childData.info.type==='admin') {
								that.setState({
									studentInfo: childData,
									loaded: true,
									admin: true
								});
							} else{
								that.setState({
									studentInfo: childData,
									loaded: true
								});
							}
						}
	  				})
	  			})
	  		}	
	  	})
  	}
  render () {
    return this.state.loaded ===false ? <Loader /> : (
      <div>
        {
        	this.state.admin===true ? 
        	<Admin /> :
        	<User />
        }
      </div>
    )
  }
}