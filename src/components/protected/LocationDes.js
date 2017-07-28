import React, { Component } from 'react'
import Loader from '../Loader';
import {firebaseAuth,userRef,locationsRef,insert,ref} from '../../config/constants';

export default class LocationDes extends Component{
	constructor(props){
		super(props);
		this.state = {
			slotInfo: [],
			slotForm: false,
			slotFormKey: null,
			slotNo: null
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
			var val = value.split(',');
			var key = val[0];
			var slotNo = val[1];
			that.setState({
				slotForm:true,
				slotFormKey: key,
				slotNo: slotNo 
			});
		}
		that.parkForm=(e,val)=>{
			e.preventDefault();
			var startDate = that.startDate.value;
			var startTime = that.startTime.value;
			var hours = that.hours.value;
			ref.child(`location/${that.props.slotKey}/slots/${val}`)
				.set({
					booked: true,
					startDate: startDate,
					startTime: startTime,
					hours: hours,
					no: that.state.slotNo						
				},function(error){
					if (error) { alert('Something went wront please try again'); }
					else{
						that.setState({
							slotForm:false 
						});
					}
				})
		}
		that.closeForm=()=>{
			that.setState({
				slotForm:false 
			});
		}
	}

	render(){
		const SlotForm =()=>{ 
				return(
					<div>
						<form onSubmit={(e)=>this.parkForm(e,this.state.slotFormKey)} className="form-group">
							<h3 className="text-center">Reserve your parking slot for Slot No: {this.state.slotNo} </h3>
							<label>Start Date</label>
							<input type="date" ref={(startDate)=>this.startDate=startDate} className="form-control" required /><br/>
							<label>Start Time</label>
							<input type="time" ref={(startTime)=>this.startTime=startTime} className="form-control" required /><br/>
							<label>Hours</label>
							<input type="number" ref={(hours)=>this.hours=hours} placeholder="Hours" className="form-control" required /><br/>
							<input type="submit" className="btn-lg btn-default"/>
							<input type="button" onClick={this.closeForm} style={{marginLeft: '8px'}} className="btn-lg btn-danger" value="Close" />
						</form>
					</div>
				)
		}
		return(
			<div>
			<div className="col-md-12">
				<h3 className="text-center">All available Slots</h3>
				{
					this.state.slotInfo.map((index,key)=>
						<div className="col-md-2 btn-line" key={key}>
							{
								index.booked===false ? 
								<button onClick={()=>this.handleSlot(index.key+','+index.no)} className="btn btn-primary">Slot No: {index.no}</button>
								: <button className="btn btn-danger" disabled>Slot No: {index.no}</button>
							}
						</div>
					)
				}<br/>
			</div>
				{
					this.state.slotForm && 
						<SlotForm  />
				}
				</div>
			)
	}
}
