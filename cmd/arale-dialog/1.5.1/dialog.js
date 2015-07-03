define("arale-dialog/1.5.1/dialog",["jquery","arale-overlay/1.2.0/overlay","position/1.1.0/index","arale-iframe-shim/1.1.0/index","arale-widget/1.2.0/widget","arale-base/1.2.0/base","arale-class/1.2.0/class","arale-events/1.2.0/events","arale-templatable/0.10.0/src/templatable","handlebars/1.3.0/dist/cjs/handlebars","arale-messenger/2.1.0/index","handlebars-runtime/1.3.0/dist/cjs/handlebars.runtime"],function(e,t,a){a.exports=e("arale-dialog/1.5.1/src/dialog"),a.exports.ConfirmBox=e("arale-dialog/1.5.1/src/confirmbox")}),define("arale-dialog/1.5.1/src/dialog",["jquery","arale-overlay/1.2.0/overlay","position/1.1.0/index","arale-iframe-shim/1.1.0/index","arale-widget/1.2.0/widget","arale-base/1.2.0/base","arale-class/1.2.0/class","arale-events/1.2.0/events","arale-templatable/0.10.0/src/templatable","handlebars/1.3.0/dist/cjs/handlebars","arale-messenger/2.1.0/index","handlebars-runtime/1.3.0/dist/cjs/handlebars.runtime"],function(e,t,a){function i(e){null==e.attr("tabindex")&&e.attr("tabindex","-1")}function s(e){var t=e[0].contentWindow.document;return t.body.scrollHeight&&t.documentElement.scrollHeight?Math.min(t.body.scrollHeight,t.documentElement.scrollHeight):t.documentElement.scrollHeight?t.documentElement.scrollHeight:t.body.scrollHeight?t.body.scrollHeight:void 0}function n(e){var t=!1;try{e[0].contentWindow.document}catch(a){t=!0}return t}function l(e,t){for(var a=-1,i=0;i<t.length;i++)if(t[i]===e){a=i;break}-1!==a&&t.splice(a,1)}var r=e("jquery"),o=e("arale-overlay/1.2.0/overlay"),h=o.Mask,c=e("arale-events/1.2.0/events"),d=e("arale-templatable/0.10.0/src/templatable"),f=e("arale-messenger/2.1.0/index"),g=o.extend({Implements:d,attrs:{template:e("arale-dialog/1.5.1/src/dialog.handlebars"),trigger:{value:null,getter:function(e){return r(e)}},classPrefix:"ui-dialog",content:{value:null,setter:function(e){return/^(https?:\/\/|\/|\.\/|\.\.\/)/.test(e)&&(this._type="iframe",(e.indexOf("?ajax")>0||e.indexOf("&ajax")>0)&&(this._ajax=!0)),e}},hasMask:!0,closeTpl:"\xd7",width:500,height:null,initialHeight:300,effect:"none",zIndex:999,autoFit:!0,align:{value:{selfXY:["50%","50%"],baseXY:["50%","42%"]},getter:function(e){return this.element.height()>.84*r(window).height()?{selfXY:["50%","0"],baseXY:["50%","0"]}:e}}},parseElement:function(){this.set("model",{classPrefix:this.get("classPrefix")}),g.superclass.parseElement.call(this),this.contentElement=this.$("[data-role=content]"),this.contentElement.css({height:"100%",zoom:1}),this.$("[data-role=close]").hide()},events:{"click [data-role=close]":function(e){e.preventDefault(),this.hide()}},show:function(){return"iframe"===this._type&&(this._ajax?this._ajaxHtml():(!this.get("height")&&this.contentElement.css("height",this.get("initialHeight")),this._showIframe())),g.superclass.show.call(this),this},hide:function(){return"iframe"===this._type&&this.iframe&&(this._isCrossDomainIframe||this.iframe.attr({src:"javascript:'';"}),this.iframe.remove(),this.iframe=null),g.superclass.hide.call(this),clearInterval(this._interval),delete this._interval,this},destroy:function(){return this.element.remove(),this._hideMask(),clearInterval(this._interval),g.superclass.destroy.call(this)},setup:function(){g.superclass.setup.call(this),this._setupTrigger(),this._setupMask(),this._setupKeyEvents(),this._setupFocus(),i(this.element),i(this.get("trigger")),this.activeTrigger=this.get("trigger").eq(0)},_onRenderContent:function(e){if("iframe"!==this._type){var t;try{t=r(e)}catch(a){t=[]}t[0]?this.contentElement.empty().append(t):this.contentElement.empty().html(e),this._setPosition()}},_onRenderCloseTpl:function(e){""===e?this.$("[data-role=close]").html(e).hide():this.$("[data-role=close]").html(e).show()},_onRenderVisible:function(e){e?"fade"===this.get("effect")?this.element.fadeIn(300):this.element.show():this.element.hide()},_setupTrigger:function(){this.delegateEvents(this.get("trigger"),"click",function(e){e.preventDefault(),this.activeTrigger=r(e.currentTarget),this.show()})},_setupMask:function(){var e=this;h._dialogs=h._dialogs||[],this.after("show",function(){if(this.get("hasMask")){h.set("zIndex",e.get("zIndex")).show(),h.element.insertBefore(e.element);for(var t,a=0;a<h._dialogs.length;a++)h._dialogs[a]===e&&(t=h._dialogs[a]);t?(l(t,h._dialogs),h._dialogs.push(t)):h._dialogs.push(e)}}),this.after("hide",this._hideMask)},_hideMask:function(){if(this.get("hasMask"))for(var e=h._dialogs?h._dialogs.length:0,t=0;e>t;t++)if(h._dialogs[t]===this)if(l(this,h._dialogs),0===h._dialogs.length)h.hide();else if(t===e-1){var a=h._dialogs[h._dialogs.length-1];h.set("zIndex",a.get("zIndex")),h.element.insertBefore(a.element)}},_setupFocus:function(){this.after("show",function(){this.element.focus()}),this.after("hide",function(){this.activeTrigger&&this.activeTrigger.focus()})},_setupKeyEvents:function(){this.delegateEvents(r(document),"keyup.esc",function(e){27===e.keyCode&&this.get("visible")&&this.hide()})},_showIframe:function(){var e=this;this.iframe||this._createIframe(),this.iframe.attr({src:this._fixUrl(),name:"dialog-iframe"+(new Date).getTime()}),this.iframe.one("load",function(){e.get("visible")&&(e._isCrossDomainIframe=n(e.iframe),e._isCrossDomainIframe||(e.get("autoFit")&&(clearInterval(e._interval),e._interval=setInterval(function(){e._syncHeight()},300)),e._syncHeight()),e._setPosition(),e.trigger("complete:show"))})},_fixUrl:function(){var e=this.get("content").match(/([^?#]*)(\?[^#]*)?(#.*)?/);return e.shift(),e[1]=(e[1]&&"?"!==e[1]?e[1]+"&":"?")+"t="+(new Date).getTime(),e.join("")},_createIframe:function(){var e=this;this.iframe=r("<iframe>",{src:"javascript:'';",scrolling:"no",frameborder:"no",allowTransparency:"true",css:{border:"none",width:"100%",display:"block",height:"100%",overflow:"hidden"}}).appendTo(this.contentElement),c.mixTo(this.iframe[0]),this.iframe[0].on("close",function(){e.hide()});var t=new f("parent","arale-dialog");t.addTarget(this.iframe[0].contentWindow,"iframe1"),t.listen(function(t){switch(t=JSON.parse(t),t.event){case"close":e.hide();break;case"syncHeight":e._setHeight("px"===t.height.toString().slice(-2)?t.height:t.height+"px")}})},_setHeight:function(e){this.contentElement.css("height",e),this.element[0].className=this.element[0].className},_syncHeight:function(){var e;if(this.get("height"))clearInterval(this._interval),delete this._interval;else{try{this._errCount=0,e=s(this.iframe)+"px"}catch(t){this._errCount=(this._errCount||0)+1,this._errCount>=6&&(e=this.get("initialHeight"),clearInterval(this._interval),delete this._interval)}this._setHeight(e)}},_ajaxHtml:function(){var e=this;this.contentElement.css("height",this.get("initialHeight")),this.contentElement.load(this.get("content"),function(){e._setPosition(),e.contentElement.css("height",""),e.trigger("complete:show")})}});a.exports=g}),define("arale-dialog/1.5.1/src/dialog.handlebars",["handlebars-runtime/1.3.0/dist/cjs/handlebars.runtime"],function(e,t,a){var i=e("handlebars-runtime/1.3.0/dist/cjs/handlebars.runtime")["default"];a.exports=i.template(function(e,t,a,i,s){this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),s=s||{};var n,l,r="",o="function",h=this.escapeExpression;return r+='<div class="',(l=a.classPrefix)?n=l.call(t,{hash:{},data:s}):(l=t&&t.classPrefix,n=typeof l===o?l.call(t,{hash:{},data:s}):l),r+=h(n)+'">\n    <a class="',(l=a.classPrefix)?n=l.call(t,{hash:{},data:s}):(l=t&&t.classPrefix,n=typeof l===o?l.call(t,{hash:{},data:s}):l),r+=h(n)+'-close" title="Close" href="javascript:;" data-role="close"></a>\n    <div class="',(l=a.classPrefix)?n=l.call(t,{hash:{},data:s}):(l=t&&t.classPrefix,n=typeof l===o?l.call(t,{hash:{},data:s}):l),r+=h(n)+'-content" data-role="content"></div>\n</div>\n'})}),define("arale-dialog/1.5.1/src/confirmbox",["jquery","arale-overlay/1.2.0/overlay","position/1.1.0/index","arale-iframe-shim/1.1.0/index","arale-widget/1.2.0/widget","arale-base/1.2.0/base","arale-class/1.2.0/class","arale-events/1.2.0/events","arale-templatable/0.10.0/src/templatable","handlebars/1.3.0/dist/cjs/handlebars","arale-messenger/2.1.0/index","handlebars-runtime/1.3.0/dist/cjs/handlebars.runtime"],function(e,t,a){var i=e("jquery"),s=e("arale-dialog/1.5.1/src/dialog"),n=e("arale-dialog/1.5.1/src/confirmbox.handlebars"),l=s.extend({attrs:{title:"\u9ed8\u8ba4\u6807\u9898",confirmTpl:'<a class="ui-dialog-button-orange" href="javascript:;">\u786e\u5b9a</a>',cancelTpl:'<a class="ui-dialog-button-white" href="javascript:;">\u53d6\u6d88</a>',message:"\u9ed8\u8ba4\u5185\u5bb9"},setup:function(){l.superclass.setup.call(this);var e={classPrefix:this.get("classPrefix"),message:this.get("message"),title:this.get("title"),confirmTpl:this.get("confirmTpl"),cancelTpl:this.get("cancelTpl"),hasFoot:this.get("confirmTpl")||this.get("cancelTpl")};this.set("content",n(e))},events:{"click [data-role=confirm]":function(e){e.preventDefault(),this.trigger("confirm")},"click [data-role=cancel]":function(e){e.preventDefault(),this.trigger("cancel"),this.hide()}},_onChangeMessage:function(e){this.$("[data-role=message]").html(e)},_onChangeTitle:function(e){this.$("[data-role=title]").html(e)},_onChangeConfirmTpl:function(e){this.$("[data-role=confirm]").html(e)},_onChangeCancelTpl:function(e){this.$("[data-role=cancel]").html(e)}});l.alert=function(e,t,a){var s={message:e,title:"",cancelTpl:"",closeTpl:"",onConfirm:function(){t&&t(),this.hide()}};new l(i.extend(null,s,a)).show().after("hide",function(){this.destroy()})},l.confirm=function(e,t,a,s,n){"object"!=typeof s||n||(n=s);var r={message:e,title:t||"\u786e\u8ba4\u6846",closeTpl:"",onConfirm:function(){a&&a(),this.hide()},onCancel:function(){s&&s(),this.hide()}};new l(i.extend(null,r,n)).show().after("hide",function(){this.destroy()})},l.show=function(e,t,a){var s={message:e,title:"",confirmTpl:!1,cancelTpl:!1};new l(i.extend(null,s,a)).show().before("hide",function(){t&&t()}).after("hide",function(){this.destroy()})},a.exports=l}),define("arale-dialog/1.5.1/src/confirmbox.handlebars",["handlebars-runtime/1.3.0/dist/cjs/handlebars.runtime"],function(e,t,a){var i=e("handlebars-runtime/1.3.0/dist/cjs/handlebars.runtime")["default"];a.exports=i.template(function(e,t,a,i,s){function n(e,t){var i,s,n="";return n+='\n<div class="',(s=a.classPrefix)?i=s.call(e,{hash:{},data:t}):(s=e&&e.classPrefix,i=typeof s===f?s.call(e,{hash:{},data:t}):s),n+=g(i)+'-title" data-role="title">',(s=a.title)?i=s.call(e,{hash:{},data:t}):(s=e&&e.title,i=typeof s===f?s.call(e,{hash:{},data:t}):s),(i||0===i)&&(n+=i),n+="</div>\n"}function l(e,t){var i,s,n="";return n+='\n    <div class="',(s=a.classPrefix)?i=s.call(e,{hash:{},data:t}):(s=e&&e.classPrefix,i=typeof s===f?s.call(e,{hash:{},data:t}):s),n+=g(i)+'-operation" data-role="foot">\n        ',i=a["if"].call(e,e&&e.confirmTpl,{hash:{},inverse:m.noop,fn:m.program(4,r,t),data:t}),(i||0===i)&&(n+=i),n+="\n        ",i=a["if"].call(e,e&&e.cancelTpl,{hash:{},inverse:m.noop,fn:m.program(6,o,t),data:t}),(i||0===i)&&(n+=i),n+="\n    </div>\n    "}function r(e,t){var i,s,n="";return n+='\n        <div class="',(s=a.classPrefix)?i=s.call(e,{hash:{},data:t}):(s=e&&e.classPrefix,i=typeof s===f?s.call(e,{hash:{},data:t}):s),n+=g(i)+'-confirm" data-role="confirm">\n            ',(s=a.confirmTpl)?i=s.call(e,{hash:{},data:t}):(s=e&&e.confirmTpl,i=typeof s===f?s.call(e,{hash:{},data:t}):s),(i||0===i)&&(n+=i),n+="\n        </div>\n        "}function o(e,t){var i,s,n="";return n+='\n        <div class="',(s=a.classPrefix)?i=s.call(e,{hash:{},data:t}):(s=e&&e.classPrefix,i=typeof s===f?s.call(e,{hash:{},data:t}):s),n+=g(i)+'-cancel" data-role="cancel">\n            ',(s=a.cancelTpl)?i=s.call(e,{hash:{},data:t}):(s=e&&e.cancelTpl,i=typeof s===f?s.call(e,{hash:{},data:t}):s),(i||0===i)&&(n+=i),n+="\n        </div>\n        "}this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),s=s||{};var h,c,d="",f="function",g=this.escapeExpression,m=this;return h=a["if"].call(t,t&&t.title,{hash:{},inverse:m.noop,fn:m.program(1,n,s),data:s}),(h||0===h)&&(d+=h),d+='\n<div class="',(c=a.classPrefix)?h=c.call(t,{hash:{},data:s}):(c=t&&t.classPrefix,h=typeof c===f?c.call(t,{hash:{},data:s}):c),d+=g(h)+'-container">\n    <div class="',(c=a.classPrefix)?h=c.call(t,{hash:{},data:s}):(c=t&&t.classPrefix,h=typeof c===f?c.call(t,{hash:{},data:s}):c),d+=g(h)+'-message" data-role="message">',(c=a.message)?h=c.call(t,{hash:{},data:s}):(c=t&&t.message,h=typeof c===f?c.call(t,{hash:{},data:s}):c),(h||0===h)&&(d+=h),d+="</div>\n    ",h=a["if"].call(t,t&&t.hasFoot,{hash:{},inverse:m.noop,fn:m.program(3,l,s),data:s}),(h||0===h)&&(d+=h),d+="\n</div>\n"})});