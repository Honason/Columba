/*!
 * VERSION: 0.1.2
 * DATE: 2014-07-17
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine.plugin({propName:"endArray",API:2,version:"0.1.2",init:function(e,n,s){var o=n.length,i=this.a=[],t,r;if(this.target=e,this._round=!1,!o)return!1;for(;--o>-1;)t=e[o],r=n[o],t!==r&&i.push({i:o,s:t,c:r-t});return!0},round:function(e){"endArray"in e&&(this._round=!0)},set:function(e){var n=this.target,s=this.a,o=s.length,i,t;if(this._round)for(;--o>-1;)i=s[o],n[i.i]=Math.round(i.s+i.c*e);else for(;--o>-1;)i=s[o],t=i.s+i.c*e,n[i.i]=1e-6>t&&t>-1e-6?0:t}})}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();