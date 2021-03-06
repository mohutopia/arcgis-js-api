// COPYRIGHT © 201 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/aspect","dojo/dom-construct","dojo/dnd/Moveable","esri/dijit/Legend","esri/dijit/geoenrichment/utils/MouseUtil"],function(e,n,t,o,r,i){var d={},a=10,s=e(r,{_isSupportedLayerType:function(e){return!!(e&&"esri.layers.GraphicsLayer"===e.declaredClass&&e.renderer&&e.name&&e.graphics.length)||this.inherited(arguments)},_isLayerDrawingEnabled:function(e){return!(!e||"esri.layers.FeatureLayer"!==e.declaredClass||!e.renderer||"heatmap"!==e.renderer.type)||this.inherited(arguments)},_getServiceTitle:function(e){return e._titleForLegend=e._titleForLegend||e.name,this.inherited(arguments)}});return d.createLegend=function(r,d,l,c){function u(){g&&g.destroy(),g=null,c&&c.onDestroyed()}function h(){function l(){g.domNode&&(g.domNode.style.left=a+"px",g.domNode.style.top=d.clientHeight-g.domNode.clientHeight-a+"px",g.domNode.style.maxHeight=d.clientHeight-2*a+"px")}u(),g=new s({map:r,layerInfos:null},t.create("div",{class:"esriGEReportPlayer_mapLegend"},d)),g.startup(),g.own(r.on("before-unload",u));var h=e(o,{onMouseDown:function(){for(var e,n=0,t=g.domNode.childNodes.length;n<t;n++)if(i.isMouseOver(g.domNode.childNodes[n])){e=!0;break}e&&this.inherited(arguments)}}),f=new h(g.domNode);g.own(f),l(),g.own(n.after(g,"_createLegendForLayer",function(e){return setTimeout(l),e})),c&&c.onCreated(g)}var g;l&&(l.showLegend&&h(),l.onVisibilityChanged=function(){l.showLegend?h():u()})},d});