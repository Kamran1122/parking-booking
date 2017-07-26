import React, { Component } from 'react'
import {firebaseAuth,userRef} from '../../config/constants';
import Loader from '../Loader';

export default class User extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<h1>Admin</h1>			
			)
	}
}