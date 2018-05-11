// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/i18n!../nls/common","../core/accessorSupport/decorators","./Widget","./Expand/ExpandViewModel","./support/widget"],function(e,n,o,t,a,i,r,d,s){var p={base:"esri-expand esri-widget",modeAuto:"esri-expand--auto",modeDrawer:"esri-expand--drawer",modeFloating:"esri-expand--floating",container:"esri-expand__container",containerExpanded:"esri-expand__container--expanded",panel:"esri-expand__panel",button:"esri-widget-button",text:"esri-icon-font-fallback-text",icon:"esri-collapse__icon",iconExpanded:"esri-expand__icon--expanded",iconNumber:"esri-expand__icon-number",iconNumberExpanded:"esri-expand__icon-number--expanded",expandIcon:"esri-icon-expand",collapseIcon:"esri-icon-collapse",content:"esri-expand__content",contentExpanded:"esri-expand__content--expanded",expandMask:"esri-expand__mask",expandMaskExpanded:"esri-expand__mask--expanded"};return function(e){function n(n){var o=e.call(this)||this;return o.autoCollapse=null,o.collapseTooltip="",o.content="",o.expanded=null,o.expandTooltip="",o.group=null,o.iconNumber=0,o.mode="auto",o.view=null,o.viewModel=new d,o}return o(n,e),Object.defineProperty(n.prototype,"collapseIconClass",{get:function(){return p.collapseIcon},set:function(e){if(!e)return void this._clearOverride("collapseIconClass");this._override("collapseIconClass",e)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"expandIconClass",{get:function(){return s.isWidget(this.content)?this.content.iconClass:p.expandIcon},set:function(e){if(!e)return void this._clearOverride("expandIconClass");this._override("expandIconClass",e)},enumerable:!0,configurable:!0}),n.prototype.expand=function(){this.viewModel.expanded=!0},n.prototype.collapse=function(){this.viewModel.expanded=!1},n.prototype.toggle=function(){this.viewModel.expanded=!this.viewModel.expanded},n.prototype.render=function(){var e=this.viewModel.expanded,n=this.mode,o=this.expandTooltip||a.expand,t=this.collapseTooltip||a.collapse,i=e?t:o,r=this.collapseIconClass,d=this.expandIconClass,l=(h={},h[p.iconExpanded]=e,h[r]=e,h[d]=!e,h),c=(g={},g[p.containerExpanded]=e,g),x=(f={},f[p.contentExpanded]=e,f),u=(m={},m[p.expandMaskExpanded]=e,m),v=this.iconNumber,b=v&&!e?s.tsx("span",{key:"expand__icon-number",class:p.iconNumber},v):null,_=v&&e?s.tsx("span",{key:"expand__expand-icon-number",class:s.join(p.iconNumber,p.iconNumberExpanded)},v):null,y=(w={},w[p.modeAuto]="auto"===n,w[p.modeDrawer]="drawer"===n,w[p.modeFloating]="floating"===n,w);return s.tsx("div",{class:p.base,classes:y},s.tsx("div",{bind:this,onclick:this._toggle,class:p.expandMask,classes:u}),s.tsx("div",{class:p.container,classes:c},s.tsx("div",{class:p.panel},s.tsx("div",{bind:this,onclick:this._toggle,onkeydown:this._toggle,"aria-label":i,title:i,role:"button",tabindex:"0",class:p.button},b,s.tsx("span",{"aria-hidden":"true",class:p.icon,classes:l}),s.tsx("span",{class:p.text},i)),_),s.tsx("div",{class:p.content,classes:x,bind:this},this._renderContent())));var h,g,f,m,w},n.prototype._toggle=function(){this.toggle()},n.prototype._renderContent=function(){var e=this.content;return"string"==typeof e?s.tsx("div",{innerHTML:e}):s.isWidget(e)?e.render():e instanceof HTMLElement?s.tsx("div",{bind:e,afterCreate:this._attachToNode}):s.isWidgetBase(e)?s.tsx("div",{bind:e.domNode,afterCreate:this._attachToNode}):null},n.prototype._attachToNode=function(e){var n=this;e.appendChild(n)},t([i.aliasOf("viewModel.autoCollapse")],n.prototype,"autoCollapse",void 0),t([i.property({dependsOn:["content"]}),s.renderable()],n.prototype,"collapseIconClass",null),t([i.property(),s.renderable()],n.prototype,"collapseTooltip",void 0),t([i.property(),s.renderable()],n.prototype,"content",void 0),t([i.aliasOf("viewModel.expanded"),s.renderable()],n.prototype,"expanded",void 0),t([i.property({dependsOn:["content"]}),s.renderable()],n.prototype,"expandIconClass",null),t([i.property(),s.renderable()],n.prototype,"expandTooltip",void 0),t([i.aliasOf("viewModel.group")],n.prototype,"group",void 0),t([i.property(),s.renderable()],n.prototype,"iconNumber",void 0),t([i.property(),s.renderable()],n.prototype,"mode",void 0),t([i.aliasOf("viewModel.view"),s.renderable()],n.prototype,"view",void 0),t([i.property({type:d}),s.renderable("viewModel.state")],n.prototype,"viewModel",void 0),t([s.accessibleHandler()],n.prototype,"_toggle",null),n=t([i.subclass("esri.widgets.Expand")],n)}(i.declared(r))});