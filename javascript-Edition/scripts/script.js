  window.onload = function(){
  		waterFall('main','box');

  		//后端来的图像数据
  		var dataInt = {
  			"data":[{"src":'23.jpg'},{"src":'24.jpg'},{"src":'25.jpg'},{"src":'26.jpg'},
  			{"src":'27.jpg'},{"src":'28.jpg'},{"src":'29.jpg'},{"src":'30.jpg'},
  			{"src":'80.jpg'},{"src":'79.jpg'},{"src":'77.jpg'},{"src":'66.jpg'},
  			{"src":'44.jpg'},{"src":'42.jpg'},{"src":'45.jpg'},{"src":'46.jpg'}]
  		}


      window.onscroll = function(){
      if (checkScrollSlide) {
         //将数据块渲染到页面尾部
         var oParent = document.getElementById('main');
         for(var i = 0 ; i < dataInt.data.length ; i++){
              var oBox = document.createElement('div');
              oBox.className = 'box';
              oParent.appendChild(oBox);
              var oA = document.createElement('a');
              oA.href = "#";
              oBox.appendChild(oA);
              var oPic = document.createElement('div');
              oPic.className = 'pic';
              oA.appendChild(oPic);
              var oImg = document.createElement('img');
              oImg.src = "images/"+dataInt.data[i].src;
              oPic.appendChild(oImg);
         }
           		waterFall('main','box');

      }
  }	
}
  function waterFall (parent,box){
       //将main下所有名字为BOX的元素取出来
       var oParent = document.getElementById(parent);
       var oBoxs = getByClass(oParent,box);
      //计算整个页面的列数(页面宽度／box宽度)
       var oBoxW = oBoxs[0].offsetWidth;
       var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
       oParent.style.cssText = 'width:'+ oBoxW*cols + 'px;margin: 0 auto'

       var hArr = [];
       for( var i = 0 ; i < oBoxs.length ; i++){
       	if (i<cols) {
       		hArr.push(oBoxs[i].offsetHeight);
       	}else{
          var minH = Math.min.apply(null,hArr);
          var index =getMinhIndex(hArr,minH);
 					oBoxs[i].style.position = 'absolute';
 					oBoxs[i].style.top = minH +'px';
 					oBoxs[i].style.left =oBoxW*index +'px';
 					hArr[index]+=oBoxs[i].offsetHeight;
      }
    }
}
  //根据class获取元素

 function getByClass(parent,clsName){
 	 var boxArr = new Array(),  //用来获取所有class为box的元素
 	 	   oElements = parent.getElementsByTagName('*');
 	 	   for(var i = 0 ;i< oElements.length;i++){
 	 	   	if (oElements[i].className==clsName) {
           boxArr.push(oElements[i]);
 	 	   	}
 	 	   }
 	 	   return boxArr;
 }


 //
 function getMinhIndex(arr,val){
   for(var i in arr){
   	if (arr[i]==val){
   		return i;
   	}
   }
 }
//检测是否具备滚动加载数据块
 function checkScrollSlide(){
    var oParent = document.getElementById('main');
    var oBoxs = getByClass(oParent,'box');
    var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop; //标准模式和混杂模式兼容
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return(lastBoxH<scrollTop+height)?true:false;
   }
 