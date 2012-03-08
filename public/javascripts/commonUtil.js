// jQuery Plugin(location of this plugin could be changed)
(function($){
	$.fn.initForm=function() {
		jqFrm = $(this);
		$.each(jqFrm.find(":input"),function(index,ctl){
			var jqCtl = $(ctl);
			if(ctl["tagName"]=="SELECT") ctl["selectedIndex "] = 0;
			else if(ctl["tagName"]=="TEXTAREA") ctl.value = "";
			else {//INPUT
				if(jqCtl.attr("type")=="text"||jqCtl.attr("type")=="hidden") jqCtl.val("");
				if(jqCtl.attr("type")=="checkbox"||jqCtl.attr("type")=="radio") jqCtl.attr("checked",false);
				if(jqCtl.attr("type")=="radio") jqFrm.find(":radio[name='"+ jqCtl.attr("name") +"']:eq(0)").attr("checked",true);
			}
		});
	};
	$.fn.serializeJSON=function(seperator,needEscape) {
		var jqFrm = $(this);
		if(jqFrm.length < 1) return {};
		var isWrapped = false;
		if(jqFrm[0].tagName != "FORM") {
			isWrapped = true;
			jqFrm = jqFrm.wrap("<form/>").parent();
		}
		var json = {};
		if(!seperator) seperator = ",";
		var val = "";
		jQuery.map(jqFrm.serializeArray(), function(n, i){
			val = n['value'];
			if(needEscape) val = escape(val);
			if(json[n['name']]) json[n['name']] += seperator + val;
			else json[n['name']] = val;
		});
		if(isWrapped) jqFrm.end().unwrap();
		return json;
	};

	$.fn.setFormJSON = function(objJson, seperator){
		//for(var obj in objJson){
		//	//alert((new JsonUtil()).stringify(obj));
		//	alert(obj.toString());
		//}
		var jqFrm = $(this);
		
		if(!seperator) seperator = ",";
		
		$.each(objJson,function(id, val){
			//
			//alert(id + "+::+"+ val);
			//alert($(frmSelector).length);
			var jqCtl = jqFrm.find(":input[name='"+id+"']");
			if(jqCtl.length<1) return;
			//alert(jqCtl[0].tagName);
			if(jqCtl[0].tagName == "INPUT"){
				if(jqCtl.attr("type")=="radio") {
					//alert(jqCtl.length);
					jqCtl.attr("checked",false);
					jqCtl.filter(":radio[value='"+val+"']").attr("checked",true);
				} else if(jqCtl.attr("type")=="checkbox") {
					jqCtl.attr("checked",false);
					$.grep(val.split(seperator),function(ele,i){
						//alert(ele);
						jqCtl.filter(":checkbox[value='"+ele+"']").attr("checked",true);
					});
				} else {
					jqCtl.val(unescape(val));
				}
			} else if (jqCtl[0].tagName == "SELECT"){
				jqCtl.val(unescape(val));
			} else if (jqCtl[0].tagName == "TEXTAREA"){
				jqCtl.text(unescape(val));
			}
		});
	}
	
	
	
	$.fn.outerHTML = function(){
	    // IE, Chrome & Safari will comply with the non-standard outerHTML, all others (FF) will have a fall-back for cloning
	    return (!this.length) ? this : (this[0].outerHTML || (
	      function(el){
	          var div = document.createElement('div');
	          div.appendChild(el.cloneNode(true));
	          var contents = div.innerHTML;
	          div = null;
	          return contents;
	    })(this[0]));
	};
})(jQuery);

var commonUtil = {
	callService : function(strSvcId, oInput, bAsync, fCallback){
		$.extend(oInput, {"svcId":strSvcId});
		$.ajax({
			async : false,
			type: "post",
			url: "/callservice",
			data: {"input":JSON.stringify(oInput)},
			success : function (result) {
				//oOutput = oJsonUtil.parse(result);
				if(fCallback) fCallback(result);
			},
			error: function(xhr, status, error) {
				alert("Failed to Call Quick Ajax Svc");
				//var err = eval!("(" + xhr.responseText + ")");
				//$.growlUI('Error', err.Message, 20000);
			}
		});
	},
	
	
	
	tmp:"tmp"
}
