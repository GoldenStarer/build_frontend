angular.module('MetronicApp').controller('normEditController', function($rootScope, $scope, req,uploadFile,$state,$q) {
	$scope.$on('$viewContentLoaded', function() {
		// initialize core components
		App.initAjax();
		var ue = UE.getEditor('editor');

		$scope.value = function() {
	    	console.log($("#select2_sample1").val()+$("#select2_sample2").val());
		}
		
		init();

		function init() { //初始化
			req('GET', 'theme/type/all', {}, function(res) {
				// 请求成功执行代码
				if(res.code==0){
					let list = res.result;
					$scope.themeList = list;
				}else{
					alert(res.msg);
					console.log(res.result);
				}
			});
			
			req('GET', 'industry/type/all', {}, function(res) {
				// 请求成功执行代码
				if(res.code==0){
					let list = res.result;
					$scope.industryList = list;
				}else{
					alert(res.msg);
					console.log(res.result);
				}
			});
		}
		
		$scope.save = function() {
			let title = $("#title").val();
			let number = $("#number").val();
	    	let themeList = $("#select2_sample1").val();
	    	let industryList = $("#select2_sample2").val();
	    	let content = UE.getEditor('editor').getContent();
	    	if(!title){
	    		alert("标题不能为空");
	    		return;
	    	}
	    	if(!content){
	    		alert("内容不能为空");
	    		return;
	    	}
	    	if(!themeList){
	    		themeList = [];
	    	}
	    	if(!industryList){
	    		industryList = [];
	    	}
	    	let save = {
	    		title:title,
	    		number:number,
	    		themeList:themeList,
	    		industryList:industryList,
	    		content:content
	    	}
	    	console.log(save);
	    	
	    	req('POST', 'norm/save', save, function(res) {
				// 请求成功执行代码
				if(res.code==0){
					alert(res.msg);
					//refresh();
				}else{
					alert(res.msg);
					console.log(res.result);
				}
			});
	    	
		}
		
	});
});