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

define(["dojo/_base/declare","dojo/_base/connect","dojo/_base/lang","dojo/_base/array","dojo/_base/url","dojo/dom-construct","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/dom","dojox/collections/ArrayList","dojox/gfx/matrix","../kernel","../config","../sniff","../domUtils","../tileUtils","../geometry/Point","../geometry/Rect","../geometry/Extent","./layer"],function(t,e,i,s,n,a,o,l,r,h,_,d,c,p,m,f,u,v,g,x,y){var w=t(y,{declaredClass:"esri.layers.TiledMapServiceLayer",constructor:function(t,s){e.connect(this,"onLoad",this,"_initTiledLayer"),this._displayLevels=s?s.displayLevels:null,this._lowestLevel=this._displayLevels?this._displayLevels[0]:0,this.resampling=s?s.resampling:void 0,this._resamplingTolerance=s?s.resamplingTolerance:null,this.exclusionAreas=s?s.exclusionAreas:null;var n=i.hitch;this._addImage=n(this,this._addImage),this._tileLoadHandler=n(this,this._tileLoadHandler),this._tileErrorHandler=n(this,this._tileErrorHandler),this._popTile=n(this,this._popTile),this._cleanUpRemovedImages=n(this,this._cleanUpRemovedImages),this._fireOnUpdateEvent=n(this,this._fireOnUpdateEvent),this._transitionEnd=n(this,this._transitionEnd),this._tileMapCallback=n(this,this._tileMapCallback)},opacity:1,isPNG32:!1,_multiple:1,isResampling:!1,_initTiledLayer:function(){var t=this.tileInfo,e=t.lods;this.resampling=null!=this.resampling?this.resampling:!1,this._tileW=t.width,this._tileH=t.height;var i,n,a,o=this.scales=[],l=this._displayLevels,r=-1/0,h=1/0,_=this.fullExtent,d=new v(_.xmin,_.ymax),c=new v(_.xmax,_.ymin),p=u.getContainingTileCoords,f=e.length;for(a=0;f>a;a++)n=e[a],i=p(t,d,n),n.startTileRow=i.row<0?0:i.row,n.startTileCol=i.col<0?0:i.col,i=p(t,c,n),n.endTileRow=i.row,n.endTileCol=i.col,l&&-1===s.indexOf(l,n.level)||(o[a]=n.scale,r=n.scale>r?n.scale:r,h=n.scale<h?n.scale:h);r===-1/0||this._hasMin||this.setMinScale(r),1/0===h||this._hasMax||this.setMaxScale(h),this.setExclusionAreas(this.exclusionAreas),this._patchIE=m("ie")>=6&&m("ie")<7&&(this.isPNG32||"Mixed"===t.format)},isVisibleAtScale:function(t){return t?y.prototype._isMapAtVisibleScale.call(this,t,!0):!1},_isMapAtVisibleScale:function(t){var e=this.inherited(arguments,[t,!0]);if(e){var i,s=this._map,n=this.scales,a=s.getScale(),o=!1,l=s.width>s.height?s.width:s.height;for(i=0;i<n.length;i++)if(Math.abs(n[i]-a)/n[i]<1/l){o=!0;break}e=o}return e},_setMap:function(t,i){this.inherited(arguments),this._map=t;var s=this._div=a.create("div",null,i),n=t.__visibleDelta,o=e.connect,l=c._css.names,h={position:"absolute",width:t.width+"px",height:t.height+"px",overflow:"visible"},_=p.defaults.map.zoomDuration;"css-transforms"===t.navigationMode?(h[l.transform]=c._css.translate(-n.x,-n.y),r.set(s,h),delete h[l.transform],h[l.transition]=l.transformName+" "+_+"ms ease",r.set(this._active=a.create("div",null,s),h),this._active._remove=0,this._passives=[]):(h.left=-n.x+"px",h.top=-n.y+"px",r.set(s,h)),this._onResizeHandler_connect=o(t,"onResize",this,"_onResizeHandler"),this._opacityChangeHandler_connect=o(this,"onOpacityChange",this,"_opacityChangeHandler");var d=this.tileInfo,m=d.spatialReference,f=m._getInfo();if(this._wrap=t.wrapAround180&&m._isWrappable()&&Math.abs(f.origin[0]-d.origin.x)<=f.dx,this._wrap&&u._addFrameInfo(d,f),this.setExclusionAreas(this.exclusionAreas),this.evaluateSuspension(),this.suspended&&!t.loaded)var v=e.connect(t,"onLoad",this,function(){e.disconnect(v),v=null,this.setExclusionAreas(this.exclusionAreas),this.evaluateSuspension()});return s},_unsetMap:function(){this.suspended||this._suspendImpl(),a.destroy(this._div),this._map=this._div=null;var t=e.disconnect;t(this._onResizeHandler_connect),t(this._opacityChangeHandler_connect),this.inherited(arguments)},onSuspend:function(){this.inherited(arguments),this._suspendImpl()},_suspendImpl:function(){f.hide(this._div),clearTimeout(this._wakeTimer),this._wakeTimer=null,this._disableDrawConnectors();var t,i,s,n=this._tiles,o=this._tileIds,l=this._loadingList,r=e.disconnect,h=a.destroy;for(l&&l.count>0&&(l.forEach(function(e){t=n[e],t&&(r(t._onload_connect),r(t._onerror_connect),r(t._onabort_connect),t._onload_connect=t._onerror_connect=t._onabort_connect=null)}),l.clear(),this._fireUpdateEnd()),this._removeList.clear(),i=o.length-1;i>=0;i--)s=o[i],t=s&&n[s],t&&h(t);if("css-transforms"===this._map.navigationMode){var _,d=this._active,c=this._passives;for(this._noDom=0,i=c.length-1;i>=0;i--)_=c[i],_._endHandle&&r(_._endHandle),_._matrix=_._multiply=_._endHandle=null,_._marked=_._remove=0,c.splice(i,1),h(_);d._matrix=d._multiply=null,d._marked=d._remove=0}this._tileIds=this._tiles=this._tileBounds=this._ct=this._loadingList=this._removeList=this._standby=null},onResume:function(){this.inherited(arguments),this._tileIds=[],this._tiles=[],this._tileBounds=[],this._ct=null,this._removeList=new _,this._loadingList=new _,f.show(this._div),this._enableDrawConnectors(),this._wakeTimer=this._wakeTimer||setTimeout(i.hitch(this,function(){this.suspended||this._onExtentChangeHandler(this._map.extent,null,!0,this._map.__LOD)}),0)},_enableDrawConnectors:function(){var t=this._map,i=e.connect;if("css-transforms"===t.navigationMode){if(this._onScaleHandler_connect=i(t,"onScale",this,this._onScaleHandler),m("esri-mobile")){this._standby=[];var s=this,n=function(){s._noDom=1};this._onPanStartHandler_connect=i(t,"onPanStart",n),this._onZoomStartHandler_connect=i(t,"onZoomStart",n)}}else this._onZoomHandler_connect=i(t,"onZoom",this,"_onZoomHandler");this._onPanHandler_connect=i(t,"onPan",this,"_onPanHandler"),this._onExtentChangeHandler_connect=i(t,"onExtentChange",this,"_onExtentChangeHandler")},_disableDrawConnectors:function(){var t=e.disconnect;t(this._onPanHandler_connect),t(this._onZoomHandler_connect),t(this._onScaleHandler_connect),t(this._onExtentChangeHandler_connect),t(this._onPanStartHandler_connect),t(this._onZoomStartHandler_connect),this._onPanHandler_connect=this._onZoomHandler_connect=this._onScaleHandler_connect=this._onExtentChangeHandler_connect=this._onPanStartHandler_connect=this._onZoomStartHandler_connect=null},_onResizeHandler:function(t,e,i){var s,n={width:e+"px",height:i+"px"},a=r.set;if(a(this._div,n),"css-transforms"===this._map.navigationMode)for(this._active&&a(this._active,n),s=this._passives.length-1;s>=0;s--)a(this._passives[s],n)},_onExtentChangeHandler:function(t,e,i){var s,n,o,h=this._map,_=this._standby;if(clearTimeout(this._wakeTimer),this._wakeTimer=null,!h._isPanningOrZooming()){if("css-transforms"===h.navigationMode){if(i)for(s=this._passives.length-1;s>=0;s--)o=this._passives[s],r.set(o,c._css.names.transition,"none"),o._marked?(this._passives.splice(s,1),o.parentNode&&o.parentNode.removeChild(o),a.destroy(o)):o.childNodes.length>0&&(o._multiply=o._multiply?d.multiply(o._matrix,o._multiply):o._matrix);if(this._noDom=0,_&&_.length)for(s=_.length-1;s>=0;s--)n=_[s],r.set(n,"visibility","inherit"),this._popTile(n),_.splice(s,1)}this._fireUpdateStart(),this._rrIndex=0;var p,m=u.getCandidateTileInfo(h,this.tileInfo,t),f=h.__visibleDelta;if(!this._ct||m.lod.level!==this._ct.lod.level||i){var v=m&&this._ct&&m.lod.level!==this._ct.lod.level;this._ct=m;var x,y=this._tiles,w=this._tileIds,T=this._tileBounds,H=this._removeList,b=w.length;for(this._cleanUpRemovedImages(),s=0;b>s;s++)p=w[s],x=y[p],T[p]=w[s]=null,"css-transforms"===h.navigationMode&&v&&x.parentNode&&h.fadeOnZoom&&(x._fadeOut=v,x.parentNode._remove++),H.add(x);i&&(this._tileIds=[],this._tiles=[],this._tileBounds=[])}var M=f.x,I=f.y;if("css-transforms"===h.navigationMode){var E={};E[c._css.names.transform]=c._css.translate(M,I),r.set(this._div,E)}else r.set(this._div,{left:M+"px",top:I+"px"});this.__coords_dx=M,this.__coords_dy=I,this._updateImages(new g(0,0,f.width,f.height)),0===this._loadingList.count?(this._cleanUpRemovedImages(),this.onUpdate(),this._fireUpdateEnd()):this._fireOnUpdate=!0;var L,S,C=this._tileW,R=this._tileH;for(f=new g(-f.x,-f.y,f.width,f.height),s=this._tileIds.length-1;s>=0;s--)p=this._tileIds[s],p?(n=this._tiles[p],L=l.getMarginBox(n),S=new g(L.l,L.t,C,R),"css-transforms"===h.navigationMode&&(S.x=n._left,S.y=n._top),f.intersects(S)?this._tileBounds[p]=S:(this._loadingList.contains(p)&&this._popTile(n),a.destroy(n),this._tileIds.splice(s,1),delete this._tileBounds[p],delete this._tiles[p])):(this._tileIds.splice(s,1),delete this._tileBounds[p],delete this._tiles[p])}},_onPanHandler:function(t,e){var i=this._map,s=i.__visibleDelta.offset(e.x,e.y);if(this.__coords_dx=this.__coords_dy=0,"css-transforms"===i.navigationMode){var n={};n[c._css.names.transform]=c._css.translate(s.x,s.y),r.set(this._div,n),m("esri-mobile")||this._updateImages({x:-s.x,y:-s.y,width:s.width,height:s.height})}else r.set(this._div,{left:s.x+"px",top:s.y+"px"}),this._updateImages({x:-s.x,y:-s.y,width:s.width,height:s.height});this._loadingList.count>0&&(this._fireUpdateStart(),this._fireOnUpdate=!0)},_onScaleHandler:function(t,e){var i,s={},n=c._css.names,o=this._map,l=p.defaults.map.zoomDuration;for(i=this._passives.length-1;i>=0;i--){var h=this._passives[i];0===h.childNodes.length?(this._passives.splice(i,1),a.destroy(h)):("none"===h.style[n.transition]&&r.set(h,n.transition,n.transformName+" "+l+"ms ease"),r.set(h,n.transition,e?"none":n.transformName+" "+l+"ms ease"),h._matrix=t,s[n.transform]=c._css.matrix(h._multiply?d.multiply(t,h._multiply):t),r.set(h,s))}this._active&&0===this._active.childNodes.length||(r.set(this._active,n.transition,e?"none":n.transformName+" "+l+"ms ease"),this._active._matrix=t,s[n.transform]=c._css.matrix(this._active._matrix),r.set(this._active,s),this._passives.push(this._active),s={position:"absolute",width:o.width+"px",height:o.height+"px",overflow:"visible"},s[n.transition]=n.transformName+" "+l+"ms ease",r.set(this._active=a.create("div",null,this._div),s),this._active._remove=0,o.fadeOnZoom&&a.place(this._active,this._div,"first"))},_onZoomHandler:function(t,e,i){var n=l.getMarginBox(this._div);i=i.offset(-n.l,-n.t),this._previousScale&&1!==e||(this._previousScale=1);var a,o,h,_=this._tileW*e,d=this._tileH*e,c=this._tileBounds,p=this._tiles,f=this._previousScale,u=this._multiple,v=r.set,g=m("ie");if(g&&8>g)s.forEach(this._tileIds,function(t){h="",a=c[t],o=p[t].style.margin.split(" "),s.forEach(o,function(t){""!==h&&(h+=" "),t=parseFloat(t),h+=t/f*e+"px"}),v(p[t],{left:a.x-(_-a.width)*(i.x-a.x)/a.width+"px",top:a.y-(d-a.height)*(i.y-a.y)/a.height+"px",margin:1!==u&&-1===h.indexOf("NaN")?h:"",zoom:e})});else{var x,y,w=_*u,T=d*u;s.forEach(this._tileIds,function(t){h="",a=c[t],x=a.x-(_-a.width)*(i.x-a.x)/a.width,y=a.y-(d-a.height)*(i.y-a.y)/a.height,o=p[t].style.margin.split(" "),s.forEach(o,function(t){""!==h&&(h+=" "),t=parseFloat(t),h+=t/f*e+"px"}),v(p[t],{left:x+"px",top:y+"px",margin:1!==u&&-1===h.indexOf("NaN")?h:"",width:w+"px",height:T+"px"})})}this._previousScale=e},_updateImages:function(t){if(this._ct){var e,i,n,a,o,l,r,h,_,d=this._tileW,c=this._tileH,p=this._ct,m=p.lod,f=p.tile,u=f.offsets,v=f.coords,g=v.row,x=v.col,y=m.level,w=this.opacity,T=this._tileIds,H=this._loadingList,b=this._addImage,M=this._map.id,I=this.id,E=t.x,L=t.y,S=m.startTileRow,C=m.endTileRow,R=m.startTileCol,U=m.endTileCol,N=s.indexOf,O=-t.x,Z=-t.y,k=u.x-this.__coords_dx,P=u.y-this.__coords_dy,A=d-k+O,D=c-P+Z,j=Math.ceil,z=A>0?A%d:d-Math.abs(A)%d,B=D>0?D%c:c-Math.abs(D)%c,q=E>0?Math.floor((E+k)/d):j((E-(d-k))/d),W=L>0?Math.floor((L+P)/c):j((L-(c-P))/c),F=q+j((t.width-z)/d),V=W+j((t.height-B)/c);for(this._wrap&&(a=m._frameInfo,o=a[0],l=a[1],r=a[2]),h=q;F>=h;h++)for(_=W;V>=_;_++)i=g+_,n=x+h,this._wrap&&(l>n?(n%=o,n=l>n?n+o:n):n>r&&(n%=o)),!this._isExcluded(y,i,n)&&i>=S&&C>=i&&n>=R&&U>=n&&(e=M+"_"+I+"_tile_"+y+"_"+_+"_"+h,-1===N(T,e)&&(H.add(e),T.push(e),b(y,_,i,h,n,e,d,c,w,f,u)))}},_cleanUpRemovedImages:function(){var t,i=this._removeList,s=a.destroy,n=c._css.names;if(i.forEach(function(t){t._fadeOut||(t.style.filter="",t.style.zoom=1,s(t))}),"css-transforms"===this._map.navigationMode)for(t=this._passives.length-1;t>=0;t--){var o=this._passives[t];0===o.childNodes.length?(this._passives.splice(t,1),s(o)):this._map.fadeOnZoom&&!o._marked&&o._remove===o.childNodes.length&&(o._marked=1,c._css.getScaleFromMatrix(r.get(o,n.transform))<2048?(r.set(o,n.transition,"opacity 0.65s"),r.set(o,"opacity",0),e.disconnect(o._endHandle),o._endHandle=e.connect(o,n.endEvent,this._transitionEnd)):this._transitionEnd({propertyName:"opacity",target:o}))}i.clear()},_transitionEnd:function(t){var i,n=t.target;"opacity"===t.propertyName&&(e.disconnect(n._endHandle),n._endHandle=null,i=s.indexOf(this._passives,n),i>-1&&this._passives.splice(i,1),n.parentNode&&n.parentNode.removeChild(n),a.destroy(n))},_addImage:function(t,s,n,l,h,_,d,p,m,f,u){if(this._patchIE){var v=this._tiles[_]=a.create("div");v.id=_,o.add(v,"layerTile"),r.set(v,{left:d*l-u.x+"px",top:p*s-u.y+"px",width:d+"px",height:p+"px",filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this.getTileUrl(t,n,h)+"', sizingMethod='scale')"}),1>m&&r.set(v,"opacity",m);var g=v.appendChild(a.create("div"));r.set(g,{opacity:0,width:d+"px",height:p+"px"}),this._div.appendChild(v),v=null,this._loadingList.remove(_),this._fireOnUpdateEvent()}else{var x=this._tiles[_]=a.create("img"),y=e.connect;x.id=_,x.alt="",o.add(x,"layerTile");var w=d*l-u.x,T=p*s-u.y,H=this._map,b=c._css.names,M={width:d+"px",height:p+"px",visibility:"hidden"};if("css-transforms"===H.navigationMode?(M[b.transform]=c._css.translate(w,T),r.set(x,M),x._left=w,x._top=T):(M.left=w+"px",M.top=T+"px",r.set(x,M)),1>m&&r.set(x,"opacity",m),x._onload_connect=y(x,"onload",this,"_tileLoadHandler"),x._onerror_connect=y(x,"onerror",i.hitch(this,"_tileErrorHandler",n,h)),x._onabort_connect=y(x,"onabort",this,"_tileAbortHandler"),this.tileMap)this.tileMap.getTile(t,n,h,_,this._tileMapCallback);else{var I=this.getTileUrl(t,n,h,x);I&&(this._failedRequests&&this._failedRequests[I]?(r.set(x,this._failedRequests[I].css),x.src=this._failedRequests[I].src,this._multiple=parseInt(this._failedRequests[I].css.width)/this._tileW,this.isResampling=1!==this._multiple):(this._multiple=1,this.isResampling=!1,x.src=I))}"css-transforms"===H.navigationMode?this._active.appendChild(x):this._div.appendChild(x),x=null}},_tileMapCallback:function(t,e){var i,s;this.suspended||(s=this._tiles[e.id]||h.byId(e.id),s?(this._multiple=2*(e.level-t.level)||1,this.isResampling=1!==this._multiple,i=this.tileMap.style(t,e),r.set(s,i),s.src=this.getTileUrl(t.level,t.row,t.col)):this._popTile(e))},getTileUrl:function(){},_reCheckTS:/[\?\&]_ts=/gi,_reReplaceTS:/([\?\&]_ts=)[0-9]+/gi,addTimestampToURL:function(t){var e=this._refreshTS;return e&&(this._reCheckTS.test(t)?t=t.replace(this._reReplaceTS,"$$$1"+e):t+=(-1===t.indexOf("?")?"?":"&")+"_ts="+e),t},refresh:function(){this.suspended||(this._refreshTS=(new Date).getTime(),this._onExtentChangeHandler(this._map.extent,null,!0,this._map.__LOD))},_popTile:function(t){var i=e.disconnect;i(t._onload_connect),i(t._onerror_connect),i(t._onabort_connect),t._onload_connect=t._onerror_connect=t._onabort_connect=null,this._loadingList.remove(t.id),this._fireOnUpdateEvent()},_tileLoadHandler:function(t){var e=t.currentTarget;return this._noDom?void this._standby.push(e):(r.set(e,"visibility","inherit"),void this._popTile(e))},_tileAbortHandler:function(t){var e=t.currentTarget;this.onError(new Error("Unable to load tile: "+e.src)),r.set(e,"visibility","hidden"),this._popTile(e)},_tileErrorHandler:function(t,e,i){var s,a,o,l,h=i.currentTarget,_=!0;this.tileMap||!this.resampling?_=!1:(s=new n(h.src),a=s.path.split("/"),o=parseInt(a[a.length-3]),l=this._ct.lod.level-o+1,this._multiple=Math.pow(2,l),(o===this._lowestLevel||0===this._resamplingTolerance||this._resamplingTolerance&&Math.log(this._multiple)/Math.LN2>this._resamplingTolerance)&&(_=!1)),_?(this.isResampling=!0,this._resample(h,t,e)):(this.onError(new Error("Unable to load tile: "+h.src)),r.set(h,"visibility","hidden"),this._popTile(h))},_resample:function(t,e,i){var s=new n(t.src),a=s.path.split("/"),o=this._multiple,l=parseInt(a[a.length-3])-1,h=parseInt(e/o),_=parseInt(i/o),d=i%o,c=e%o,p=this.getTileUrl(l,h,_),f=this.getTileUrl(l+Math.log(o)/Math.LN2,e,i),u="-"+this._tileW*c+"px",v="-"+this._tileH*d+"px",g=u+" 0 0 "+v,x={width:this._tileW*o+"px",height:this._tileH*o+"px",margin:g};this._failedRequests||(this._failedRequests={}),this._failedRequests[f]={src:p,css:x},r.set(t,x),m("chrome")&&t.setAttribute("src",null),t.src=p},_fireOnUpdateEvent:function(){0===this._loadingList.count&&(this._cleanUpRemovedImages(),this._fireOnUpdate&&(this._fireOnUpdate=!1,this.onUpdate(),this._fireUpdateEnd()))},setOpacity:function(t){this.opacity!=t&&this.onOpacityChange(this.opacity=t)},onOpacityChange:function(){},_opacityChangeHandler:function(t){var e,i,s,n=r.set;if("css-transforms"!==this._map.navigationMode)for(s=this._div.childNodes,e=s.length-1;e>=0;e--)n(s[e],"opacity",t);else{if(this._active)for(s=this._active.childNodes,e=s.length-1;e>=0;e--)n(s[e],"opacity",t);for(e=this._passives.length-1;e>=0;e--)for(s=this._passives[e].childNodes,i=s.length-1;i>=0;i--)n(s[i],"opacity",t)}},setExclusionAreas:function(t){if(this.exclusionAreas=t,this.loaded&&this._map&&this._map.loaded){var e,i,s,n,a,o,l,r,h,_,d,c,p,m,f=this._map.spatialReference,u=this.tileInfo,g=u.origin,y=u.lods,w=y[0].level,T=y[y.length-1].level;if(this.exclusionAreas&&this.exclusionAreas.length){for(this._exclusionsPerZoom=[],i=0,s=t.length;s>i;i++)if(e=t[i],c=e.geometry,c&&"extent"===c.type&&c.xmin<=c.xmax&&c.ymin<=c.ymax){if(!f.equals(c.spatialReference)){if(!f._canProject(c.spatialReference))continue;f.isWebMercator()?(p=v.lngLatToXY(c.xmin,c.ymin),m=v.lngLatToXY(c.xmax,c.ymax)):(p=v.xyToLngLat(c.xmin,c.ymin,!0),m=v.xyToLngLat(c.xmax,c.ymax,!0)),c=new x(p[0],p[1],m[0],m[1],f)}if(r=-1,e.minZoom&&-1!==e.minZoom)r=e.minZoom;else if(e.minScale&&-1!==e.minScale)for(n=0,a=y.length;a>n;n++)if(y[n].scale<=e.minScale){r=y[n].level;break}if(r=Math.max(r,w),h=-1,e.maxZoom&&-1!==e.maxZoom)h=e.maxZoom;else if(e.maxScale&&-1!==e.maxScale)for(n=0,a=y.length;a>n;n++){if(y[n].scale<e.maxScale){h=y[n-1].level;break}if(y[n].scale===e.maxScale){h=y[n].level;break}}for(h=-1===h?T:Math.min(h,T),o=r;h>=o;o++){for(n=0,a=y.length;a>n;n++)if(y[n].level===o){l=y[n];break}l&&(this._exclusionsPerZoom[o]||(this._exclusionsPerZoom[o]=[]),_=1/l.resolution/u.rows,d=1/l.resolution/u.cols,this._exclusionsPerZoom[o].push({rowFrom:Math.floor((g.y-c.ymax)*_),rowTo:Math.ceil((g.y-c.ymin)*_),colFrom:Math.floor((c.xmin-g.x)*d),colTo:Math.ceil((c.xmax-g.x)*d)}))}}}else this._exclusionsPerZoom=null;this.suspended||this._onExtentChangeHandler(this._map.extent,null,!0,this._map.__LOD)}},_isExcluded:function(t,e,i){var s,n,a,o;if(!this._exclusionsPerZoom)return!1;if(n=this._exclusionsPerZoom[t],!n)return!1;for(a=0,o=n.length;o>a;a++)if(s=n[a],e>=s.rowFrom&&e<s.rowTo&&i>=s.colFrom&&i<s.colTo)return!0;return!1}});return m("extend-esri")&&i.setObject("layers.TiledMapServiceLayer",w,c),w});