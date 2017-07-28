import React, { Component } from 'react';
import Loader from '.././Loader';
import {firebaseAuth,userRef,bookingRef} from '../../config/constants';

export default class ViewBookings extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
	var that = this;
	firebaseAuth().onAuthStateChanged((user)=>{
	  if (user) {
	  	bookingRef.on('value',snap=>{
	  	  snap.forEach(function(childSnap){
	  	  	console.log(childSnap.val());
	  	  })
	  	})
	  }  
	});
  }
  render() {
    return (
      
      	<Loader />
      
    );
  }
}