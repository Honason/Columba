/*!
 * VERSION: 0.4.0
 * DATE: 2015-05-06
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";var t=/(?:\d|\-|\+|=|#|\.)*/g,s=/[A-Za-z%]/g;_gsScope._gsDefine.plugin({propName:"attr",API:2,version:"0.4.0",init:function(e,i){var r,o,_,h,u;if("function"!=typeof e.setAttribute)return!1;this._target=e,this._proxy={},this._start={},this._end={},this._suffix={};for(r in i)this._start[r]=this._proxy[r]=o=e.getAttribute(r)+"",this._end[r]=_=i[r]+"",this._suffix[r]=h=s.test(_)?_.replace(t,""):s.test(o)?o.replace(t,""):"",h&&(u=_.indexOf(h),-1!==u&&(_=_.substr(0,u))),this._addTween(this._proxy,r,parseFloat(o),_,r)||(this._suffix[r]=""),"="===_.charAt(1)&&(this._end[r]=this._firstPT.s+this._firstPT.c+h),this._overwriteProps.push(r);return!0},set:function(t){this._super.setRatio.call(this,t);for(var s,e=this._overwriteProps,i=e.length,r=1===t?this._end:t?this._proxy:this._start,o=r===this._proxy;--i>-1;)s=e[i],this._target.setAttribute(s,r[s]+(o?this._suffix[s]:""))}})}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();