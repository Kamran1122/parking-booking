import React,{Component} from 'react';
import ReactLoading from 'react-loading';

export default class Loader extends Component {
	render(){
		return(
	<div className="center" >
		<ReactLoading type="spokes" color="#444" />
	</div>
			)
	}
}