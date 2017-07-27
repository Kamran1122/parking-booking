import React, { Component } from 'react'
import Loader from '../Loader';
import {firebaseAuth,userRef,locationsRef,insert} from '../../config/constants';

export default class LocationDes extends Component{
	constructor(props){
		super(props);
		this.state = {
			slotInfo: []
		}
	}
	componentWillMount(){
		var slotKey = this.props.slotKey;
		var that = this;
		insert.ref('location/'+slotKey+'/slots').on('value',snap=>{
			var slotData = [];
			snap.forEach(function(childSnap){
				var childData = childSnap.val();
				slotData.push(childData);
				that.setState({
					slotInfo:slotData 
				});
			})
		})
	}
	render(){
		return(
			<div className="col-md-12">
				<h3 className="text-center">All available slots</h3>
				{
					this.state.slotInfo.map((index,key)=>
						
							<div className="col-md-2 btn-line">
								<button key={key} className="btn btn-primary">Slot No: {index.no}</button>
							</div>
						
					)
				}

			</div>
			)
	}
}