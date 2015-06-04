/*!
 * VERSION: beta 1.4.1
 * DATE: 2014-07-17
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";var e=_gsScope._gsDefine.plugin({propName:"roundProps",version:"1.4.1",priority:-1,API:2,init:function(e,o,r){return this._tween=r,!0}}),o=e.prototype;o._onInitAllProps=function(){for(var e=this._tween,o=e.vars.roundProps instanceof Array?e.vars.roundProps:e.vars.roundProps.split(","),r=o.length,n={},p=e._propLookup.roundProps,s,t,_;--r>-1;)n[o[r]]=1;for(r=o.length;--r>-1;)for(s=o[r],t=e._firstPT;t;)_=t._next,t.pg?t.t._roundProps(n,!0):t.n===s&&(this._add(t.t,s,t.s,t.c),_&&(_._prev=t._prev),t._prev?t._prev._next=_:e._firstPT===t&&(e._firstPT=_),t._next=t._prev=null,e._propLookup[s]=p),t=_;return!1},o._add=function(e,o,r,n){this._addTween(e,o,r,r+n,o,!0),this._overwriteProps.push(o)}}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();