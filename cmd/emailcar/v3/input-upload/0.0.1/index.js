define("emailcar/v3/input-upload/0.0.1/index",["jquery","rui-upload/1.2.1/index","handlebars","arale-dialog/1.5.1/dialog"],function(a,n,i){var t=a("jquery"),l=a("rui-upload/1.2.1/index"),e=a("handlebars"),u=e.template({1:function(){return"ui-input-upload-exist"},3:function(a){var n;return"            "+this.escapeExpression(this.lambda(null!=(n=null!=a?a.data:a)?n.filename:n,a))+"\n"},5:function(a){var n,i=this.lambda,t=this.escapeExpression;return'            <a href="'+t(i(null!=(n=null!=a?a.data:a)?n.src:n,a))+'" target="_blank"><img src="'+t(i(null!=(n=null!=a?a.data:a)?n.src:n,a))+'" alt=""></a>\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(a,n,i,t){var l,e;return'<div class="ui-input-upload '+(null!=(l=n["if"].call(a,null!=(l=null!=a?a.data:a)?l.id:l,{name:"if",hash:{},fn:this.program(1,t,0),inverse:this.noop,data:t}))?l:"")+'">\n    <div class="ui-input-upload-form">\n        <div class="ui-input-upload-placeholder">\n            '+this.escapeExpression((e=null!=(e=n.placeholder||(null!=a?a.placeholder:a))?e:n.helperMissing,"function"==typeof e?e.call(a,{name:"placeholder",hash:{},data:t}):e))+'\n        </div>\n        <span class="ui-input-upload-btn">选择文件</span>\n    </div>\n    <div class="ui-input-upload-preview">\n        <div class="ui-input-upload-photo">\n'+(null!=(l=n["if"].call(a,null!=a?a.is_file:a,{name:"if",hash:{},fn:this.program(3,t,0),inverse:this.program(5,t,0),data:t}))?l:"")+'        </div>\n        <div class="ui-input-upload-again">重新上传</div>\n    </div>\n</div>\''},useData:!0}),r=a("arale-dialog/1.5.1/dialog"),o=function(a){var n=t(a),i={};if(i.action=n.data("action"),!i.action)throw'need data-action="/upload_photo_url/"';i.placeholder=n.attr("placeholder"),i.data=n.val(),i.data&&(i.data=t.parseJSON(i.data)),"file"===n.data("type")&&(i.is_file=!0);var e=function(a){var i=arguments.callee;n.data("ui-uploader")&&(n.data("ui-uploader").destroy(),n.data("dom-input").remove());var e=t(u(a));n.val(a.data.id),n.data("dom-input",e),n.after(e);var o=e.find(".ui-input-upload-placeholder"),d=e.find(".ui-input-upload-again,.ui-input-upload-btn"),p=new l({trigger:d,name:"file",action:a.action,multiple:!1,success:function(n){var n=t.parseJSON(n);"error"===n.status&&new r({content:S.com.template.errorDialog({title:"提示",content:n.msg})}).show(),a.data=n,i(a)},progress:function(a,n,i,t){o.html("正在上传..."+t+"%")},error:function(){new r({content:S.com.template.errorDialog({title:"提示",content:"上传出错，请重新上传"})}).show()}});n.data("ui-uploader",p)};e(i)};i.exports=o});