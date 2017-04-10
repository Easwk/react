import React from 'react'
var Option = (props) => (
	<div className={props.active} 
			title="Text" 
			onClick={props.activeoption}>
		<span className="text">{props.name}</span>
		<span className="closeMenu" onClick={props.close}></span>
	</div>
)
export default Option;