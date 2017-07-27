import React, { Component } from 'react'
import Loader from '../Loader';
import {firebaseAuth,userRef,locationsRef,insert} from '../../config/constants';

export default class LocationDes extends Component{
	constructor(props){
		super(props);
		this.state = {
			slotInfo: [],
			slotForm: false
		}
	}
	componentWillMount(){
		var slotKey = this.props.slotKey;
		var that = this;
		insert.ref('location/'+slotKey+'/slots').on('value',snap=>{
			var slotData = [];
			snap.forEach(function(childSnap){
				var childData = childSnap.val();
				var key = {key: childSnap.key};
				var data = Object.assign({},childData,key);
				slotData.push(data);
				that.setState({
					slotInfo:slotData 
				});
			})
		})
		that.handleSlot=(value)=>{
			var key = value;
			that.setState({
				slotForm:true 
			});
		}
	}

	render(){
		const SlotForm =()=>{ 
				return(
				<form className="form-group">
					<h3 className="text-center">Reserve your parking slot</h3>
					<input type="date" ref="startDate" className="form-control" /><br/>
					<input type="time" ref="startDate" className="form-control" /><br/>
					<input type="submit" className="btn-default"/>
				</form>
				)
		}
		return(
			<div className="col-md-12">
				<h3 className="text-center">All available Slots</h3>
				{
					this.state.slotInfo.map((index,key)=>
						<div className="col-md-2 btn-line">
							<button key={key} onClick={()=>this.handleSlot(index.key)} className="btn btn-primary">Slot No: {index.no}</button>
						</div>
					)
				}<br/>
				{
					this.state.slotForm && 
						<SlotForm />
				}
			</div>
			)
	}
}
