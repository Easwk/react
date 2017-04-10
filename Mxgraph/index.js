import React, { Component } from 'react'
import ReactDom from 'react-dom'
import ToolBar from './ToolBar'

let start_x = 0;
let start_y = 0;
class MxGraph extends Component{
	constructor(props) {
		super(props);
		this.handleMouseDown = this.handleMouseDown.bind(this);	
		this.handleMouseMove = this.handleMouseMove.bind(this);	
		this.handleMouseUp   = this.handleMouseUp.bind(this);
		this.handlgetgrab    = this.handlgetgrab.bind(this);	
		this.handleGrab      = this.handleGrab.bind(this);	
	}
	//鼠标点下去
	handleMouseDown(event){
		var e = event || window.event;
		this.props.isMove = true;
		e.stopPropagation();
	}
	//鼠标移动
	handleMouseMove(event){
		var e = event || window.event;
		if(this.props.isMove){
			let MoveArea = ReactDom.findDOMNode(this.refs.MoveArea); //react获取真实的DOM节点
			let page_x   = e.pageX; //获取鼠标X坐标
			if(page_x < 100){
				page_x = 100;
			}else if(page_x > 1065){
				page_x = 1065;
			}
			MoveArea.style.left = page_x +"px";
		}		
	}
	//鼠标松开
	handleMouseUp(){
		this.props.isMove = false;
		this.props.tograb = false;
		let MoveArea = ReactDom.findDOMNode(this.refs.MoveArea);
		MoveArea.style.cursor = "default";

	}
	handlgetgrab(event){
		var e = event || window.event;
		this.props.tograb = true;
		let MoveArea = ReactDom.findDOMNode(this.refs.MoveArea);

		start_x = e.pageX - MoveArea.scrollLeft;
		start_y = e.pageY - MoveArea.scrollTop;
		MoveArea.style.cursor = "pointer";
	}
	//抓取移动
	handleGrab(event){
		var e = event || window.event;
		if(this.props.tograb){
			let move_x = e.pageX - start_x; //移动的X
			let move_y = e.pageY - start_y; //移动的Y
			let MoveArea = ReactDom.findDOMNode(this.refs.MoveArea);
			MoveArea.scrollLeft = move_x;
			MoveArea.scrollTop  = move_y;
		}
	}
	render(){
		return(
			<div className='cqy_containers' 
				 isMove={false}
				 onMouseMove={this.handleMouseMove}
				 onMouseUp={this.handleMouseUp}>
				<div className='cqy_LeftMenu' id='cqy_LeftMenu'>
					<ToolBar/>
				</div>
				<div className='cqy_RightContainer' 
					 id='cqy_RightContainer'
					 ref='MoveArea'
					 tograb={false}
					 onMouseDown={this.handlgetgrab}
					 onMouseMove={this.handleGrab}
					 onMouseUp={this.handleMouseUp}>
					 <div className='cqy_droparea'
						 onMouseDown={this.handleMouseDown}></div>

				</div>
			</div>
		)
	}
}

export default MxGraph