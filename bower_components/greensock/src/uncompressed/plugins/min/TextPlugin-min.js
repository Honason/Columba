/*!
 * VERSION: 0.5.1
 * DATE: 2014-07-17
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";var i=function(s){var t=s.nodeType,e="";if(1===t||9===t||11===t){if("string"==typeof s.textContent)return s.textContent;for(s=s.firstChild;s;s=s.nextSibling)e+=i(s)}else if(3===t||4===t)return s.nodeValue;return e},s=_gsScope._gsDefine.plugin({propName:"text",API:2,version:"0.5.1",init:function(s,t,e){var l,n;if(!("innerHTML"in s))return!1;if(this._target=s,"object"!=typeof t&&(t={value:t}),void 0===t.value)return this._text=this._original=[""],!0;for(this._delimiter=t.delimiter||"",this._original=i(s).replace(/\s+/g," ").split(this._delimiter),this._text=t.value.replace(/\s+/g," ").split(this._delimiter),this._runBackwards=e.vars.runBackwards===!0,this._runBackwards&&(l=this._original,this._original=this._text,this._text=l),"string"==typeof t.newClass&&(this._newClass=t.newClass,this._hasClass=!0),"string"==typeof t.oldClass&&(this._oldClass=t.oldClass,this._hasClass=!0),l=this._original.length-this._text.length,n=0>l?this._original:this._text,this._fillChar=t.fillChar||(t.padSpace?"&nbsp;":""),0>l&&(l=-l);--l>-1;)n.push(this._fillChar);return!0},set:function(i){i>1?i=1:0>i&&(i=0),this._runBackwards&&(i=1-i);var s=this._text.length,t=i*s+.5|0,e,l,n;this._hasClass?(e=this._newClass&&0!==t,l=this._oldClass&&t!==s,n=(e?"<span class='"+this._newClass+"'>":"")+this._text.slice(0,t).join(this._delimiter)+(e?"</span>":"")+(l?"<span class='"+this._oldClass+"'>":"")+this._delimiter+this._original.slice(t).join(this._delimiter)+(l?"</span>":"")):n=this._text.slice(0,t).join(this._delimiter)+this._delimiter+this._original.slice(t).join(this._delimiter),this._target.innerHTML="&nbsp;"===this._fillChar&&-1!==n.indexOf("  ")?n.split("  ").join("&nbsp;&nbsp;"):n}}),t=s.prototype;t._newClass=t._oldClass=t._delimiter=""}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();