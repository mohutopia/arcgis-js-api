// COPYRIGHT © 2016 Esri
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
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/query","dijit/registry","dojo/topic","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/has","../../../../../kernel","../../../base/InputBase","dijit/form/Select"],function(t,e,i,s,n,l,o,u,d,a,c,r,h){var p=t(h,{lazyOptions:null,loadDropDown:function(){this.lazyOptions&&(this.options=this.lazyOptions),this.inherited(arguments)}}),f=t([r],{templateString:"<div></div>",defaultValue:null,codelistType:null,emptyLabel:null,codelist:null,options:null,selectWidget:null,viewOnlyNode:null,_checkedFilter:!1,_displayValue:null,_inputValue:null,_viewOnly:null,_wasValueSet:!1,postCreate:function(){this.inherited(arguments),this.options=[],o.add(this.domNode,"gxeInputSelect gxeIndent")},destroy:function(){this.selectWidget&&this.selectWidget.destroyRecursive(!1),this.inherited(arguments)},startup:function(){this._started||(this.inherited(arguments),this.buildUI(this._viewOnly))},buildUI:function(t){this._checkFilter(),(null===t||t===!1)&&this._buildSelectWidget(),(null===t||t===!0)&&(this.viewOnlyNode=u.create("div",{"class":"gxeViewOnlyText gxeViewOnly"},this.domNode,"last"))},_buildSelectWidget:function(){var t=this.domNode,e=this,i=[],s=this.options,n=this._findDefaultOption(this._inputValue);n&&(i.push(n),this._displayValue=n.label,this._inputValue=n.value),this.selectWidget=new p({"class":"gxeEditOnly",options:i,lazyOptions:s}),this.selectWidget.placeAt(t,"last"),this.selectWidget.on("change",function(){e._displayValue=this.get("displayedValue"),e._inputValue=this.get("value"),e.emitInteractionOccurred()}),this.focusNode=this.selectWidget,this.selectWidget.focusNode&&this.selectWidget.focusNode.focus&&(this.focusNode=this.selectWidget.focusNode),this.emitInteractionOccurred()},_checkFilter:function(){this._checkedFilter||(this._checkedFilter=!0,this.options=this._filterOptions(this.options))},connectXNode:function(t,s){var n;this._viewOnly=s,this.inherited(arguments);var l=e.getObject("gxeDocument",!1,t),o=e.getObject("gxeDocument.documentType.codelists",!1,t);l&&o&&(this.codelist=o.makeCodelist(l,this.codelistType),this.codelist&&(this.options=this.codelist.codes,null!==this.emptyLabel&&(n=this.emptyLabel,i.some(this.options,function(t){return t.isEmptyCode?(t.label=n,!0):void 0})))),this._checkFilter();var u=t.value;(!s||t.fixed)&&"undefined"!=typeof u&&null!==u&&this.setInputValue(u)},_filterOptions:function(t){var e=null;if(!this.parentXNode)return t;if(!this.parentXNode.optionsFilter)return this.parentXNode.gxeDocument&&this.parentXNode.gxeDocument.documentType&&(e=this.parentXNode.gxeDocument.documentType),e.filterOptions&&"function"==typeof e.filterOptions?e.filterOptions(this.parentXNode,this.parentXNode.gxeDocument,t):t;var s=this.parentXNode.optionsFilter.split(","),n=i.filter(t,function(t){return i.some(s,function(e){return t.value===e})});return n},_findDefaultOption:function(t){var e=this._findOption(t,!1);return e||null===this.defaultValue||(e=this._findOption(this.defaultValue,!1)),e||i.some(this.options,function(t){return t.selected?(e=t,!0):void 0}),e||this.options.length>0&&(e=this.options[0]),e&&this._resetSelected(e),e},_findFirstInputWgt:function(t,e){var i,l=s("[data-gxe-path='"+t+"']",e);return l&&l.length>0&&(i=n.byNode(l[0]))?i.inputWidget:null},_findOption:function(t,e){var s=null;return e&&null===t&&(t=""),i.some(this.options,function(e){return e.value===t?(s=e,!0):void 0}),s},getDisplayValue:function(){return this.isViewMode()&&!this._wasValueSet?null:this._displayValue},getInputValue:function(){return this.isViewMode()&&!this._wasValueSet?null:this._inputValue},isViewMode:function(){var t=e.getObject("parentXNode.gxeDocument.isViewOnly",!1,this);return t&&t===!0?!0:void 0},_resetSelected:function(t){i.forEach(this.options,function(e){e.selected=!1,e.value===t.value&&(e.selected=!0)})},setInputValue:function(t){this._wasValueSet=!0,"undefined"==typeof t&&(t=null),this._displayValue=null,this._inputValue=t;var e=[],i=this._findOption(t,!0);i&&(e.push(i),this._displayValue=i.label,this._resetSelected(i)),this.selectWidget&&(this.selectWidget.set("options",e),this.selectWidget.reset()),this.emitInteractionOccurred(),this.applyViewOnly()}});return a("extend-esri")&&e.setObject("dijit.metadata.types.arcgis.form.InputSelectCode",f,c),f});