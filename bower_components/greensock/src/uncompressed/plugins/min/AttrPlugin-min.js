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
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";var t=/(?:\d|\-|\+|=|#|\.)*/g,s=/[A-Za-z%]/g;_gsScope._gsDefine.plugin({propName:"attr",API:2,version:"0.4.0",init:function(e,i,r){var o,_,h,u,n;if("function"!=typeof e.setAttribute)return!1;this._target=e,this._proxy={},this._start={},this._end={},this._suffix={};for(o in i)this._start[o]=this._proxy[o]=_=e.getAttribute(o)+"",this._end[o]=h=i[o]+"",this._suffix[o]=u=s.test(h)?h.replace(t,""):s.test(_)?_.replace(t,""):"",u&&(n=h.indexOf(u),-1!==n&&(h=h.substr(0,n))),this._addTween(this._proxy,o,parseFloat(_),h,o)||(this._suffix[o]=""),"="===h.charAt(1)&&(this._end[o]=this._firstPT.s+this._firstPT.c+u),this._overwriteProps.push(o);return!0},set:function(t){this._super.setRatio.call(this,t);for(var s=this._overwriteProps,e=s.length,i=1===t?this._end:t?this._proxy:this._start,r=i===this._proxy,o;--e>-1;)o=s[e],this._target.setAttribute(o,i[o]+(r?this._suffix[o]:""))}})}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();