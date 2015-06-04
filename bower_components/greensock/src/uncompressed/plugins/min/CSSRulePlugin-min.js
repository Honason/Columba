/*!
 * VERSION: beta 0.6.3
 * DATE: 2014-12-31
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("plugins.CSSRulePlugin",["plugins.TweenPlugin","TweenLite","plugins.CSSPlugin"],function(e,t,s){var o=function(){e.call(this,"cssRule"),this._overwriteProps.length=0},n=window.document,i=s.prototype.setRatio,l=o.prototype=new s;return l._propName="cssRule",l.constructor=o,o.version="0.6.3",o.API=2,o.getRule=function(e){var t=n.all?"rules":"cssRules",s=n.styleSheets,o=s.length,i=":"===e.charAt(0),l,r,u,c;for(e=(i?"":",")+e.toLowerCase()+",",i&&(c=[]);--o>-1;){try{if(r=s[o][t],!r)continue;l=r.length}catch(p){console.log(p);continue}for(;--l>-1;)if(u=r[l],u.selectorText&&-1!==(","+u.selectorText.split("::").join(":").toLowerCase()+",").indexOf(e)){if(!i)return u.style;c.push(u.style)}}return c},l._onInitTween=function(e,t,o){if(void 0===e.cssText)return!1;var i=e._gsProxy=e._gsProxy||n.createElement("div");return this._ss=e,this._proxy=i.style,i.style.cssText=e.cssText,s.prototype._onInitTween.call(this,i,t,o),!0},l.setRatio=function(e){i.call(this,e),this._ss.cssText=this._proxy.cssText},e.activate([o]),o},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();