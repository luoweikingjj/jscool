const $ = new ScriptableToolKit(`工具包使用示例`, `ScriptableToolKitDemo`)
const isRunWidget = true

if (config.runsInWidget || isRunWidget) {
    let widget = new ListWidget()
    widget.backgroundImage = $.getWidgetBg()

    // Your code here
    const url = {
        url: 'http://www.baidu.com'
    }
    $.post(url, (response, data) => {
        $.log(JSON.stringify(response))
        $.log(data)
    })

    // persistence your data
    // get all data content
    $.log(await $.getDataFile())

    // get value of key from icloud container('local' or 'icloud'). If there is no value, return 'defaultValue' you passed in
    $.log(await $.getVal('key', 'icloud', 'defaultValue'))

    // set value for key to target container('local' or 'icloud')
    $.setVal('key', 'value', 'icloud')
    $.setVal('key1', 'value1', 'icloud')
    $.log(await $.getVal('key', 'icloud', 'defaultValue'))
    $.log(await $.getDataFile())

    widget.presentSmall()
    Script.setWidget(widget)
    Script.complete()
} else {
    $.log($.lang)
    $.widgetCutBg()
}

//ScriptableToolKit-start
function ScriptableToolKit(t,e,i){return new class{constructor(t,e,i){this.local=FileManager.local();this.icloud=FileManager.iCloud();this.curDateCache=this.local.joinPath(this.local.documentsDirectory(),"curDateCache");this.options=i;this.tgEscapeCharMapping={"&":"＆"};this.userAgent=`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.2 Safari/605.1.15`;this.prefix=`lk`;this.name=t;this.id=e;this.data=null;this.dataFile=`${this.prefix}${this.id}.json`;this.bgImgPath=`${this.prefix}${this.id}Bg.jpg`;this.bgImgPath=this.local.joinPath(this.local.documentsDirectory(),this.bgImgPath);this.lang=Device.language();this.isSaveLog=this.getResultByKey(`${this.prefix}IsSaveLog${this.id}`,true);this.isEnableLog=this.getResultByKey(`${this.prefix}IsEnableLog${this.id}`,true);this.logSeparator="\n██";this.now=(new Date).getTime();this.execStatus=true;this.notifyInfo=[];this.msg={zh:["在开始之前，先进入主屏幕，进入图标排列模式。滑到最右边的空白页，并进行截图。","看起来你选择的图片不是iPhone的截图，或者你的iPhone不支持。请换一张图片再试一次。","你想创建什么尺寸的widget？","你想把widget放在哪里？"," (请注意，您的设备只支持两行小部件，所以中间和底部的选项是一样的)。","widget的背景图已裁切完成，想在Scriptable内部使用还是导出到相册？","已经截图，继续","退出去截图","小","中","大","顶部左边","顶部右边","中间左边","中间右边","底部左边","底部右边","顶部","中间","底部","在Scriptable内部使用","导出到相册"],en:["Before you start, go to your home screen and enter wiggle mode. Scroll to the empty page on the far right and take a screenshot.","It looks like you selected an image that isn't an iPhone screenshot, or your iPhone is not supported. Try again with a different image.","What size of widget are you creating?","What position will it be in?"," (Note that your device only supports two rows of widgets, so the middle and bottom options are the same.)","Your widget background is ready. Would you like to use it in a Scriptable widget or export the image?","Continue","Exit to Take Screenshot","Small","Medium","Large","Top left","Top right","Middle left","Middle right","Bottom left","Bottom right","Top","Middle","Bottom","Use in Scriptable","Export to Photos"]}}getResultByKey(t,e){if(!this.options){return e}const i=this.options[t];if(this.isEmpty(i)){return e}else{return i}}appendNotifyInfo(t,e){if(e==1){this.notifyInfo=t}else{this.notifyInfo.push(t)}}prependNotifyInfo(t){this.notifyInfo.splice(0,0,t)}execFail(){this.execStatus=false}sleep(t){return new Promise(e=>setTimeout(e,t))}log(t){if(this.isEnableLog)console.log(`${this.logSeparator}${t}`)}logErr(t){this.execStatus=false;if(this.isEnableLog){console.log(`${this.logSeparator}${this.name}执行异常:`);console.log(t);console.log(`\n${t.message}`)}}getContainer(t){return t=="local"?this.local:this.icloud}async getVal(t,e,i){let o=this.getContainer(e);let r="";try{let t=o.joinPath(o.documentsDirectory(),this.dataFile);if(!o.fileExists(t)){return Promise.resolve(i)}r=await o.readString(t);r=JSON.parse(r)}catch(t){throw t}return Promise.resolve(r.hasOwnProperty(t)?r[t]:i)}async getDataFile(t){let e=this.getContainer(t);let i="";try{let t=e.joinPath(e.documentsDirectory(),this.dataFile);if(!e.fileExists(t)){return Promise.resolve("")}i=await e.readString(t)}catch(t){throw t}return Promise.resolve(i)}async setVal(t,e,i){let o=this.getContainer(i);let r;let l=o.joinPath(o.documentsDirectory(),this.dataFile);try{if(!o.fileExists(l)){r={}}else{r=await o.readString(l);r=JSON.parse(r)}}catch(t){r={}}r[t]=e;o.writeString(l,JSON.stringify(r))}async get(t,e=(()=>{})){let i=new Request("");i.url=t.url;i.method="GET";i.headers=t.headers;const o=await i.loadString();e(i.response,o);return o}async post(t,e=(()=>{})){let i=new Request("");i.url=t.url;i.body=t.body;i.method="POST";i.headers=t.headers;const o=await i.loadString();e(i.response,o);return o}async loadScript({scriptName:t,url:e}){this.log(`获取脚本【${t}】`);const i=await this.get({url:e});this.icloud.writeString(`${this.icloud.documentsDirectory()}/${t}.js`,i);this.log(`获取脚本【${t}】完成🎉`)}require({scriptName:t,url:e="",reload:i=false}){if(this.icloud.fileExists(this.icloud.joinPath(this.icloud.documentsDirectory(),`${t}.js`))&&!i){this.log(`引用脚本【${t}】`);return importModule(t)}else{this.loadScript({scriptName:t,url:e});this.log(`引用脚本【${t}】`);return importModule(t)}}async generateAlert(t,e){let i=new Alert;i.message=t;for(const t of e){i.addAction(t)}return await i.presentAlert()}isEmpty(t){return typeof t=="undefined"||t==null||t==""||t=="null"}isWorkingDays(t){return new Promise(async(e,i)=>{const o=t.getMonth()+1>9?t.getMonth()+1:"0"+(t.getMonth()+1);const r=t.getDate()>9?t.getDate():"0"+t.getDate();const l=`${t.getFullYear()}${o}${r}`;let s=0;try{let t=await this.getVal("curDateCache","local","fff");if(l==t.split("-")[0]){s=t.split("-")[1];this.log("already request")}else{this.log("send request");const t={url:"http://tool.bitefu.net/jiari/?d="+l};await this.post(t,(t,e)=>{s=e;this.setVal("curDateCache",`${l+"-"+s}`,"local")})}}catch(t){this.logErr(t)}finally{e(s==0?workingDaysFlag:holidayFlag)}})}randomString(t){t=t||32;var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";var i=e.length;var o="";for(let r=0;r<t;r++){o+=e.charAt(Math.floor(Math.random()*i))}return o}autoComplete(t,e,i,o,r,l,s,a,n,h){t+=``;if(t.length<r){while(t.length<r){if(l==0){t+=o}else{t=o+t}}}if(s){let e=``;for(var g=0;g<a;g++){e+=h}t=t.substring(0,n)+e+t.substring(a+n)}t=e+t+i;return this.toDBC(t)}customReplace(t,e,i,o){try{if(this.isEmpty(i)){i="#{"}if(this.isEmpty(o)){o="}"}for(let r in e){t=t.replace(`${i}${r}${o}`,e[r])}}catch(t){this.logErr(t)}return t}toDBC(t){var e="";for(var i=0;i<t.length;i++){if(t.charCodeAt(i)==32){e=e+String.fromCharCode(12288)}else if(t.charCodeAt(i)<127){e=e+String.fromCharCode(t.charCodeAt(i)+65248)}}return e}getWidgetBg(){return this.local.readImage(this.bgImgPath)}phoneSizes(){return{2688:{small:507,medium:1080,large:1137,left:81,right:654,top:228,middle:858,bottom:1488},1792:{small:338,medium:720,large:758,left:54,right:436,top:160,middle:580,bottom:1e3},2436:{small:465,medium:987,large:1035,left:69,right:591,top:213,middle:783,bottom:1353},2532:{small:474,medium:1014,large:1062,left:78,right:618,top:231,middle:819,bottom:1407},2208:{small:471,medium:1044,large:1071,left:99,right:672,top:114,middle:696,bottom:1278},1334:{small:296,medium:642,large:648,left:54,right:400,top:60,middle:412,bottom:764},1136:{small:282,medium:584,large:622,left:30,right:332,top:59,middle:399,bottom:399},1624:{small:310,medium:658,large:690,left:46,right:394,top:142,middle:522,bottom:902}}}remove(t){this.local.remove(t)}cropImage(t,e){let i=new DrawContext;i.size=new Size(e.width,e.height);i.drawImageAtPoint(t,new Point(-e.x,-e.y));return i.getImage()}async widgetCutBg(){var t;var e=this.msg[this.lang]||this.msg.en;t=e[0];let i=[e[6],e[7]];let o=await this.generateAlert(t,i);if(o)return;let r=await Photos.fromLibrary();let l=r.size.height;let s=this.phoneSizes()[l];if(!s){t=e[1];await this.generateAlert(t,["OK"]);return}t=e[2];let a=[e[8],e[9],e[10]];let n=await this.generateAlert(t,a);t=e[3];t+=l==1136?e[4]:"";let h={w:"",h:"",x:"",y:""};if(n==0){h.w=s.small;h.h=s.small;let i=["Top left","Top right","Middle left","Middle right","Bottom left","Bottom right"];let o=[e[11],e[12],e[13],e[14],e[15],e[16]];let r=await this.generateAlert(t,o);let l=i[r].toLowerCase().split(" ");h.y=s[l[0]];h.x=s[l[1]]}else if(n==1){h.w=s.medium;h.h=s.small;h.x=s.left;let i=["Top","Middle","Bottom"];let o=[e[17],e[18],e[19]];let r=await this.generateAlert(t,o);let l=i[r].toLowerCase();h.y=s[l]}else if(n==2){h.w=s.medium;h.h=s.large;h.x=s.left;let i=[e[17],e[19]];let o=await this.generateAlert(t,i);h.y=o?s.middle:s.top}let g=this.cropImage(r,new Rect(h.x,h.y,h.w,h.h));t=e[5];const d=[e[20],e[21]];const c=await this.generateAlert(t,d);if(c){Photos.save(g)}else{this.log(this.bgImgPath);this.local.writeImage(this.bgImgPath,g)}Script.complete()}}(t,e,i)}
//ScriptableToolKit-end