import React from 'react';
import {feedbackRef} from '../../config/constants';
import Loader from '.././Loader';

export default class ViewFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	loaded: false,
    	feedbackInfo: []
    }
  }
  componentWillMount(){
  	var that = this;
  	var feedbackData = [];
	feedbackRef.on('value',snap=>{
		snap.forEach( function(childSnap) {
			feedbackData.push(childSnap.val());
			that.setState({
				feedbackInfo: feedbackData,
				loaded: true
			});
		});
	})
  }

  render() {
    return this.state.loaded===false ? <Loader /> : (
      <div className="col-md-offset-2 col-md-4 back">
      	<h2 className="text-center">All users feedback</h2>
      	{
      		this.state.feedbackInfo.map((index)=>
				<div className="desBack">
					<h3>{index.title}</h3>
					<p><strong>User: </strong> {index.name}</p>
					<p><strong>Message: </strong>  {index.des}</p>
				</div>
      		)	
      	}
      </div>
    );
  }
}