import React, { Component } from 'react'
import ReactDom from 'react-dom'
const connector = require('ASSET/img/connector.gif')
const imgUrl = require('ASSET/img/grid.gif')
import 'ASSET/less/mxgraph'

class ToolBar extends Component{
	constructor(props) {
		super(props);
		this.state={

		}
	}

	componentDidMount(){
		if(!mxClient.isBrowserSupported()){
			console.log("Browser is not supported!")
			this.context.router.replace("/mxgraph")
		}else{
			mxConnectionHandler.prototype.connectImage = new mxImage(connector, 16, 16)
			let tbContainer = document.getElementById('tbContainer') //左侧工具栏
			let container = document.createElement('div'); //右侧graph
				//container.style.position = 'absolute';
				//container.style.overflow = 'auto'
				container.style.marginLeft = '10px';
				//container.style.right='0px';
				container.setAttribute('class','cqy_content');
			document.getElementById('cqy_RightContainer').appendChild(container)
			//创建一个没有事件的工具栏
			let toolbar = new mxToolbar(tbContainer)
			toolbar.enabled = false
			//IE处理
			if(mxClient.IS_IE){
				new mxDivResizer(tbContainer)
				new mxDivResizer(container)
			}
			//在container创建模型和视图，在浏览器使用最快的渲染
			let model = new mxGraphModel()
			let graph = new mxGraph(container,model)
			//拖动
			graph.panningHandler.useLeftButtonForPanning = true;
			//让SVG里面的cell元素可以拖动，连线
			graph.panningHandler.ignoreCell = false;
			graph.container.style.cursor = 'move';
			graph.setPanning(true);
			//定义删除和放大缩小操作
			let deleteAndBigOrSmall = require('DRAWTOOL/deleteAndBigOrSmall').default
			deleteAndBigOrSmall()
			//启用新的连接
			graph.setConnectable(true)
			graph.setMultigraph(false)
			graph.centerZoom = false
			//启用导航线
			mxGraphHandler.prototype.guidesEnabled = true
			mxConstants.GUIDE_COLOR = '#FF0000'
			mxConstants.GUIDE_STROKEWIDTH = 1
			mxEdgeHandler.prototype.snapToTerminals = false
			mxRectangleShape.prototype.crisp = true
			let style = graph.getStylesheet().getDefaultEdgeStyle()
			style[mxConstants.STYLE_ROUNDED] = true
			style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector
			graph.alternateEdgeStyle = 'elbow=vertical'
			//拖入控件或释放按键时工具栏停止编辑
			let keyHandler = new mxKeyHandler(graph)
			let rubberband = new mxRubberband(graph)
			//禁用浏览器自带右键菜单
			mxEvent.disableContextMenu(document.body)
			graph.panningHandler.autoExpand = true //鼠标悬停
			const rightClickMenu = require('DRAWTOOL/RightClickMenu').default
			rightClickMenu(graph)
			let addVertex = function(icon, w, h, style){
				//第一个参数是文本，第二个是位置信息，第三个是样式
				let vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style)
				vertex.setVertex(true)
				const addToolbarItem = require('DRAWTOOL/addToolbarItem').default
				let img = addToolbarItem(graph, toolbar, vertex, icon)
				img.enabled = true
				
				// 拖动后改变工具栏图标的透明度
				graph.getSelectionModel().addListener(mxEvent.CHANGE, function(){
					let tmp = graph.isSelectionEmpty()
					mxUtils.setOpacity(img, (tmp) ? 100 : 20)
					img.enabled = tmp
				})
			}

			addVertex(require('ASSET/img/radio-button.png'), 40, 40, 'shape=ellipse')
			addVertex(require('ASSET/img/round.png'), 40, 40, 'shape=rounded')


			//缩放
			document.getElementById('cqy_RightContainer').appendChild(mxUtils.button('放大',function(){
		    	graph.zoomIn()
		    }))
		    document.getElementById('cqy_RightContainer').appendChild(mxUtils.button('缩小', function(){
				graph.zoomOut()
			}))
		}
	}

	render(){
		return(
			<div id='tbContainer' className='ht-tbContainer'>
				{/*<img onLoad={this.handleOnLoad} className='ht-imgStyle' src={this.state.imgUrl}/>*/}
			</div>
		)
	}
}

export default ToolBar