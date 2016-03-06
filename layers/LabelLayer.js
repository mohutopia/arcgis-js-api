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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/number","dojo/i18n!dojo/cldr/nls/number","dojo/_base/array","dojo/_base/connect","dojo/has","dojox/gfx/_base","../kernel","../lang","../graphic","../PopupInfo","./labelLayerUtils/DynamicLabelClass","./labelLayerUtils/StaticLabelClass","../symbols/TextSymbol","../symbols/ShieldLabelSymbol","../geometry/Extent","../geometry/Point","../geometry/webMercatorUtils","./GraphicsLayer","./LabelClass","../renderers/SimpleRenderer"],function(e,t,r,n,i,a,s,l,o,h,f,b,c,u,g,v,p,L,m,d,y,_,S){function P(e){return"sizeInfo"===e.type}var w=t(y,{declaredClass:"esri.layers.LabelLayer",constructor:function(e){this.id="labels",this.featureLayers=[],this._featureLayerInfos=[],this._preparedLabels=[],this._engineType="STATIC",this._mapEventHandlers=[],e&&(e.id&&(this.id=e.id),e.mode&&(this._engineType="DYNAMIC"===e.mode.toUpperCase()?"DYNAMIC":"STATIC"))},_setMap:function(){var e=this.inherited(arguments);return this._map&&this._mapEventHandlers.push(this._map.on("extent-change",r.hitch(this,"refresh"))),this.refresh(),e},_unsetMap:function(){var e;for(e=0;e<this._mapEventHandlers.length;e++)s.disconnect(this._mapEventHandlers[e]);this.refresh(),this.inherited(arguments)},setAlgorithmType:function(e){this._engineType=e&&"DYNAMIC"===e.toUpperCase()?"DYNAMIC":"STATIC",this.refresh()},addFeatureLayer:function(e,t,n,i){if(!this.getFeatureLayer(e.layerId)){var a=[];a.push(e.on("update-end",r.hitch(this,"refresh"))),a.push(e.on("suspend",r.hitch(this,"refresh"))),a.push(e.on("resume",r.hitch(this,"refresh"))),a.push(e.on("edits-complete",r.hitch(this,"refresh"))),a.push(e.on("labeling-info-change",r.hitch(this,"refresh"))),a.push(e.on("time-extent-change",r.hitch(this,"refresh"))),a.push(e.on("show-labels-change",r.hitch(this,"refresh"))),this._featureLayerInfos.push({FeatureLayer:e,LabelExpressionInfo:n,LabelingOptions:i,LabelRenderer:t,EventHandlers:a}),this.featureLayers.push(e),this.refresh()}},getFeatureLayer:function(e){var t,r;for(t=0;t<this.featureLayers.length;t++)if(r=this.featureLayers[t],void 0!==r&&r.id==e)return r;return null},removeFeatureLayer:function(e){var t,r,n;if(r=this.getFeatureLayer(e),void 0!==r&&(n=a.indexOf(this.featureLayers,r),n>-1)){for(this.featureLayers.splice(n,1),t=0;t<this._featureLayerInfos[n].EventHandlers.length;t++)s.disconnect(this._featureLayerInfos[n].EventHandlers[t]);this._featureLayerInfos.splice(n,1),this.refresh()}},removeAllFeatureLayers:function(){var e;for(e=0;e<this.featureLayers.length;e++){for(var t=0;t<this._featureLayerInfos[e].EventHandlers.length;t++)s.disconnect(this._featureLayerInfos[e].EventHandlers[t]);this.featureLayers=[],this._featureLayerInfos=[]}this.refresh()},getFeatureLayers:function(){return this.featureLayers},getFeatureLayerInfo:function(e){var t,r;for(t=0;t<this.featureLayers.length;t++)if(r=this.featureLayers[t],void 0!==r&&r.id==e)return this._featureLayerInfos[t];return null},refresh:function(){var e,t,r,n,i,a,s,l,o=[],h="DYNAMIC"===this._engineType?new u:new g;if(this._map){for(h.setMap(this._map,this),this._preparedLabels=[],t=0;t<this.featureLayers.length;t++)if(r=this.featureLayers[t],r.visible&&r.showLabels&&r.visibleAtMapScale&&!r._suspended)if(n=this._featureLayerInfos[t],s=this._convertOptions(null),n.LabelRenderer){if(o=r.labelingInfo,o&&(l=o[0],l&&(a=this._getLabelExpression(l),s=this._convertOptions(l))),i=n.LabelRenderer,n.LabelExpressionInfo&&(a=n.LabelExpressionInfo),n.LabelingOptions){if(s=this._convertOptions(null),void 0!==n.LabelingOptions.pointPriorities){var f=n.LabelingOptions.pointPriorities;s.pointPriorities="above-center"==f||"AboveCenter"==f||"esriServerPointLabelPlacementAboveCenter"==f?"AboveCenter":"above-left"==f||"AboveLeft"==f||"esriServerPointLabelPlacementAboveLeft"==f?"AboveLeft":"above-right"==f||"AboveRight"==f||"esriServerPointLabelPlacementAboveRight"==f?"AboveRight":"below-center"==f||"BelowCenter"==f||"esriServerPointLabelPlacementBelowCenter"==f?"BelowCenter":"below-left"==f||"BelowLeft"==f||"esriServerPointLabelPlacementBelowLeft"==f?"BelowLeft":"below-right"==f||"BelowRight"==f||"esriServerPointLabelPlacementBelowRight"==f?"BelowRight":"center-center"==f||"CenterCenter"==f||"esriServerPointLabelPlacementCenterCenter"==f?"CenterCenter":"center-left"==f||"CenterLeft"==f||"esriServerPointLabelPlacementCenterLeft"==f?"CenterLeft":"center-right"==f||"CenterRight"==f||"esriServerPointLabelPlacementCenterRight"==f?"CenterRight":"AboveRight"}void 0!==n.LabelingOptions.lineLabelPlacement&&(s.lineLabelPlacement=n.LabelingOptions.lineLabelPlacement),void 0!==n.LabelingOptions.lineLabelPosition&&(s.lineLabelPosition=n.LabelingOptions.lineLabelPosition),void 0!==n.LabelingOptions.labelRotation&&(s.labelRotation=n.LabelingOptions.labelRotation),void 0!==n.LabelingOptions.howManyLabels&&(s.howManyLabels=n.LabelingOptions.howManyLabels)}i instanceof _&&(a=this._getLabelExpression(i),i=new S(i.symbol),s=this._convertOptions(i)),this._addLabels(r,i,a,s)}else if(o=r.labelingInfo)for(e=o.length-1;e>=0;e--)l=o[e],l&&(i=new _(l instanceof _?l.toJson():l),a=this._getLabelExpression(l),s=this._convertOptions(l),this._addLabels(r,i,a,s));var b=h._process(this._preparedLabels);this.clear(),this.drawLabels(this._map,b)}},drawLabels:function(e,t){this._scale=(e.extent.xmax-e.extent.xmin)/e.width;var r;for(r=0;r<t.length;r++){var n=t[r],i=n.layer,a=n.x,s=n.y,l=n.text,o=n.angle,h=n.layer.labelSymbol;"polyline"==i.geometry.type&&n.layer.options.labelRotation&&h.setAngle(o*(180/Math.PI)),h.setText(l);var f=a,c=s;if(h instanceof v){var u=h.getHeight(),g=Math.sin(o);f-=.25*u*this._scale*g,c-=.33*u*this._scale}var p=new b(new m(f,c,e.extent.spatialReference));p.setSymbol(h),this.add(p)}},_addLabels:function(e,t,r,n){var i,a,s,l,o=t.minScale,h=t.maxScale;if(this._isWithinScaleRange(o,h)&&r&&""!==r){var f=this._map,b=!e.url&&!f.spatialReference.equals(e.spatialReference);for(i=0;i<e.graphics.length;i++)if(a=e.graphics[i],a.visible!==!1){if(s=a.geometry,b){if(!d.canProject(s,f))continue;s=d.project(s,f)}s&&this._isWhere(t.where,a.attributes)&&this._isWithinScreenArea(s)&&(l=this._buildLabelText(r,a.attributes,e.fields,n),this._addLabel(l,t,e.renderer,a,n,s,f))}}},_isWithinScreenArea:function(e){var t;if(t="point"===e.type?new L(e.x,e.y,e.x,e.y,e.spatialReference):e.getExtent(),void 0===t)return!1;var r=this._intersects(this._map,t);return null===r||0===r.length?!1:!0},_isWithinScaleRange:function(e,t){var r=this._map.getScale();return e>0&&r>=e?!1:t>0&&t>=r?!1:!0},_isWhere:function(e,t){try{if(!e)return!0;if(e){var r=e.split(" ");if(3===r.length)return this._sqlEquation(t[r[0].substr(1,r[0].length-2)],r[1],r[2]);if(7===r.length){var n=this._sqlEquation(t[r[0].substr(1,r[0].length-2)],r[1],r[2]),i=r[3],a=this._sqlEquation(t[r[4].substr(1,r[4].length-2)],r[5],r[6]);switch(i){case"AND":return n&&a;case"OR":return n||a}}}return!1}catch(s){console.log("Error.: can't parse = "+e)}},_sqlEquation:function(e,t,r){switch(t){case"=":return e==r?!0:!1;case"<>":return e!=r?!0:!1;case">":return e>r?!0:!1;case">=":return e>=r?!0:!1;case"<":return r>e?!0:!1;case"<=":return r>=e?!0:!1}return!1},_getSizeInfo:function(e){return e?e.sizeInfo||a.filter(e.visualVariables,P)[0]:null},_addLabel:function(e,t,n,i,a,s,l){var h,f,b,c;if(e&&""!==r.trim(e)&&t){e=e.replace(/\s+/g," "),h=t.getSymbol(i),h instanceof v?(h=new v(h.toJson()),h.setVerticalAlignment("baseline"),h.setHorizontalAlignment("center")):h=h instanceof p?new p(h.toJson()):new v,h.setText(e),t.symbol=h;var u=this._getProportionalSize(t.sizeInfo,i.attributes);if(u&&(h instanceof v?h.setSize(u):h instanceof p&&(h.setWidth(u),h.setHeight(u))),b=0,c=0,n){f=n.getSymbol(i);var g,L=this._getSizeInfo(n);L&&(g=n.getSize(i,{sizeInfo:L,resolution:l.getResolutionInMeters()})),null!=g?b=c=g:f&&("simplemarkersymbol"==f.type?(b=f.size,c=f.size):"picturemarkersymbol"==f.type?(b=f.width,c=f.height):("simplelinesymbol"==f.type||"cartographiclinesymbol"==f.type)&&(b=f.width))}var m={};m.graphic=i,m.options=a,m.geometry=s,m.labelRenderer=t,m.labelSymbol=h,m.labelWidth=h.getWidth()/2,m.labelHeight=h.getHeight()/2,m.symbolWidth=o.normalizedLength(b)/2,m.symbolHeight=o.normalizedLength(c)/2,m.text=e,m.angle=h.angle,this._preparedLabels.push(m)}},_buildLabelText:function(e,t,a,s){var l=e.replace(/{[^}]*}/g,function(e){var l,o,h,b=e;for(l=0;l<a.length;l++){if("{"+a[l].name+"}"==e){b=t[a[l].name];var u=a[l].domain;if(u&&r.isObject(u)){if("codedValue"==u.type)for(h=0;h<u.codedValues.length;h++)u.codedValues[h].code==b&&(b=u.codedValues[h].name);else"range"==u.type&&u.minValue<=b&&b<=u.maxValue&&(b=u.name);return null===b?"":b}var g=a[l].type;if(s.fieldInfos){var v=s.fieldInfos;for(o=0;o<v.length;o++)if("{"+v[o].fieldName+"}"==e){var p=v[o].format;if("esriFieldTypeDate"==g){var L=p.dateFormat?p.dateFormat:"shortDate",m="DateFormat"+c.prototype._dateFormats[L];m&&(b=f.substitute({myKey:b},"${myKey:"+m+"}"))}else("esriFieldTypeInteger"==g||"esriFieldTypeSingle"==g||"esriFieldTypeSmallInteger"==g||"esriFieldTypeLong"==g||"esriFieldTypeDouble"==g)&&p&&(b=n.format(b,{places:p.places}),p.digitSeparator||i.group&&(b=b.replace(new RegExp("\\"+i.group,"g"),"")));break}}break}b=""}return null===b?"":b});return l},_getLabelExpression:function(e){return e.labelExpressionInfo?e.labelExpressionInfo.value:this._validSyntax(e.labelExpression)?this._convertLabelExpression(e.labelExpression):""},_validSyntax:function(e){var t=/^(\s*\[[^\]]+\]\s*)+$/i;return t.test(e)},_convertLabelExpression:function(e){return e.replace(new RegExp("\\[","g"),"{").replace(new RegExp("\\]","g"),"}")},_getProportionalSize:function(e,t){if(!e)return null;var r=f.substitute(t,"${"+e.field+"}",{first:!0});if(!e.minSize||!e.maxSize||!e.minDataValue||!e.maxDataValue||!r||e.maxDataValue-e.minDataValue<=0)return null;var n=(e.maxSize-e.minSize)/(e.maxDataValue-e.minDataValue),i=n*(r-e.minDataValue)+e.minSize;return i},_convertOptions:function(e){var t="shortDate",r=null,n=null,i="",a="AboveRight",s="PlaceAtCenter",l="Above",o=!0,h="OneLabel";return e&&(e.format&&(t=e.format.dateFormat,r={places:e.format.places,digitSeparator:e.format.digitSeparator}),n=e.fieldInfos,i=e.labelPlacement),a="above-center"==i||"esriServerPointLabelPlacementAboveCenter"==i?"AboveCenter":"above-left"==i||"esriServerPointLabelPlacementAboveLeft"==i?"AboveLeft":"above-right"==i||"esriServerPointLabelPlacementAboveRight"==i?"AboveRight":"below-center"==i||"esriServerPointLabelPlacementBelowCenter"==i?"BelowCenter":"below-left"==i||"esriServerPointLabelPlacementBelowLeft"==i?"BelowLeft":"below-right"==i||"esriServerPointLabelPlacementBelowRight"==i?"BelowRight":"center-center"==i||"esriServerPointLabelPlacementCenterCenter"==i?"CenterCenter":"center-left"==i||"esriServerPointLabelPlacementCenterLeft"==i?"CenterLeft":"center-right"==i||"esriServerPointLabelPlacementCenterRight"==i?"CenterRight":"AboveRight",s="above-start"==i||"below-start"==i||"center-start"==i?"PlaceAtStart":"above-end"==i||"below-end"==i||"center-end"==i?"PlaceAtEnd":"PlaceAtCenter",l="above-after"==i||"esriServerLinePlacementAboveAfter"==i||"above-along"==i||"esriServerLinePlacementAboveAlong"==i||"above-before"==i||"esriServerLinePlacementAboveBefore"==i||"above-start"==i||"esriServerLinePlacementAboveStart"==i||"above-end"==i||"esriServerLinePlacementAboveEnd"==i?"Above":"below-after"==i||"esriServerLinePlacementBelowAfter"==i||"below-along"==i||"esriServerLinePlacementBelowAlong"==i||"below-before"==i||"esriServerLinePlacementBelowBefore"==i||"below-start"==i||"esriServerLinePlacementBelowStart"==i||"below-end"==i||"esriServerLinePlacementBelowEnd"==i?"Below":"center-after"==i||"esriServerLinePlacementCenterAfter"==i||"center-along"==i||"esriServerLinePlacementCenterAlong"==i||"center-before"==i||"esriServerLinePlacementCenterBefore"==i||"center-start"==i||"esriServerLinePlacementCenterStart"==i||"center-end"==i||"esriServerLinePlacementCenterEnd"==i?"OnLine":"Above",("always-horizontal"==i||"esriServerPolygonPlacementAlwaysHorizontal"==i)&&(o=!1),{dateFormat:t,numberFormat:r,fieldInfos:n,pointPriorities:a,lineLabelPlacement:s,lineLabelPosition:l,labelRotation:o,howManyLabels:h}}});return l("extend-esri")&&r.setObject("layers.LabelLayer",w,h),w});