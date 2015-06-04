/*!
 * VERSION: beta 0.2.1
 * DATE: 2014-07-17
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine.plugin({propName:"directionalRotation",version:"0.2.1",API:2,init:function(e,t,s){"object"!=typeof t&&(t={rotation:t}),this.finals={};var i=t.useRadians===!0?2*Math.PI:360,n=1e-6,o,p,r,u,f,a;for(o in t)"useRadians"!==o&&(a=(t[o]+"").split("_"),p=a[0],r=parseFloat("function"!=typeof e[o]?e[o]:e[o.indexOf("set")||"function"!=typeof e["get"+o.substr(3)]?o:"get"+o.substr(3)]()),u=this.finals[o]="string"==typeof p&&"="===p.charAt(1)?r+parseInt(p.charAt(0)+"1",10)*Number(p.substr(2)):Number(p)||0,f=u-r,a.length&&(p=a.join("_"),-1!==p.indexOf("short")&&(f%=i,f!==f%(i/2)&&(f=0>f?f+i:f-i)),-1!==p.indexOf("_cw")&&0>f?f=(f+9999999999*i)%i-(f/i|0)*i:-1!==p.indexOf("ccw")&&f>0&&(f=(f-9999999999*i)%i-(f/i|0)*i)),(f>n||-n>f)&&(this._addTween(e,o,r,r+f,o),this._overwriteProps.push(o)));return!0},set:function(e){var t;if(1!==e)this._super.setRatio.call(this,e);else for(t=this._firstPT;t;)t.f?t.t[t.p](this.finals[t.p]):t.t[t.p]=this.finals[t.p],t=t._next}})._autoCSS=!0}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();