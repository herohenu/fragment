~function(){!new function(){var a="";a+='		<div id="bookmark-qrcode-img" class="img"></div>',a+='		<div class="input">',a+='			<textarea id="bookmark-qrcode-input"></textarea>',a+='			<button class="create" type="button" id="bookmark-qrcode-create">\u751f\u6210\u4e8c\u7ef4\u7801</button> <button class="close" type="button" id="bookmark-qrcode-close">\u5173\u95ed</button>',a+='			<p><a href="http://ma.taobao.com/">http://ma.taobao.com/</a></p>',a+="		</div>",URL="http://ma.taobao.com/api/qrcode.html?sec=qr&activity=encode&text={text}&width=180&height=180&ecLevel=L&characterSet=gbk&t={t}";var b=this,c=function(a){return document.getElementById(a)};this.render=function(){var a=c("bookmark-qrcode");a?a.style.display="block":(a=b.create(),b.addStyleSheet(),c("bookmark-qrcode-create").onclick=function(){b.createQR(c("bookmark-qrcode-input").value)},c("bookmark-qrcode-close").onclick=function(){document.body.removeChild(a)}),b.createQR(location.href),c("bookmark-qrcode-input").value=location.href},this.addStyleSheet=function(){var a,b="bookmark-qrcode-stylesheet",c=".bookmark-qrcode *{margin:0;padding:0;box-sizing: content-box;}.bookmark-qrcode{position:fixed;z-index:99999;top:10px;left:50%;margin-left:-200px;background:#fff;border:10px solid #1570a6;}.bookmark-qrcode .img,.bookmark-qrcode .input{float:left;padding:10px;}.bookmark-qrcode .img{width:180px;height:180px;}.bookmark-qrcode .img img{display:block;width:180px;height:180px;}.bookmark-qrcode .input{width:180px;height:200px;background:#1570a6;padding:0 10px;}.bookmark-qrcode .input textarea{width:175px;height:120px;padding:5px;margin-bottom:10px;}.bookmark-qrcode .input button{padding:5px 10px;}.bookmark-qrcode .input a{display:block;font-size:12px;font-family:Arial,sans-serif;margin-top:10px;color:#fff;}";if(b&&(b=b.replace("#",""))&&(a=document.getElementById("#"+b)),!a){a=document.createElement("style"),a.id=b;var d=document.getElementsByTagName("head")[0];d.appendChild(a),a.styleSheet?a.styleSheet.cssText=c:a.appendChild(document.createTextNode(c))}},this.create=function(){var b=document.createElement("div");return b.className="bookmark-qrcode",b.id="bookmark-qrcode",b.innerHTML=a,document.body.appendChild(b),b},this.createQR=function(a){var b=URL.replace("{text}",encodeURIComponent(encodeURIComponent(a))).replace("{t}",Math.random()),d=document.createElement("img"),e=c("bookmark-qrcode-img");e.innerHTML="",d.onerror=function(){e.innerText="\u751f\u6210\u5931\u8d25\uff0c\u8bf7\u70b9\u51fb\u53f3\u8fb9\u201c\u751f\u6210\u4e8c\u7ef4\u7801\u201d\u6309\u94ae\u91cd\u8bd5"},d.src=b,e.appendChild(d)},b.render()}}();