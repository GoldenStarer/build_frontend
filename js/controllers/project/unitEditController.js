angular.module('MetronicApp').controller('unitEditController', function($rootScope, $scope, req, uploadFile, $state, $q,$stateParams) {
	$scope.$on('$viewContentLoaded', function() {
		// initialize core components
		App.initAjax();

		var editUnit = $stateParams.editUnit;
		var sts = false; //编辑状态默认是新增

		$scope.modal = {
			currentId: editUnit&&editUnit._id ? editUnit._id : '0',
			currentVal: editUnit&&editUnit.name ? editUnit.name : '', //当前名称值
			currentNumber: editUnit&&editUnit.number ? editUnit.number : '',
			roadList: [],
			areaList: []
		};
		var list1=[],list2=[];
		if(editUnit&&editUnit.areaIds && editUnit.areaIds.length>0){
			for(var i=0;i<editUnit.areaIds.length;i++){
				list1.push(editUnit.areaIds[i]._id);
			}
		}
		$scope.modal.areaList = list1;
		if(editUnit&&editUnit.roadIds && editUnit.roadIds.length>0){
			for(var i=0;i<editUnit.roadIds.length;i++){
				list2.push(editUnit.roadIds[i]._id);
			}
		}
		$scope.modal.industryList=list2;
		var ue = UE.getEditor('editor');
		ue.addListener("ready", function() {
			if(editUnit && editUnit.content) {
				ue.execCommand('insertHtml', editUnit.content);
				sts = true; //编辑状态为修改
			}
		});

		$scope.$on('$destroy', function() {//https://segmentfault.com/q/1010000003924221
			ue.destroy();
		});

		init();

		function init() { //初始化
			req('GET', 'area/type/all', {}, function(res) {
				// 请求成功执行代码
				if(res.code == 0) {
					let list = res.result;
					$scope.areaList = list;
				} else {
					alert(res.msg);
					console.log(res.result);
				}
			});

			req('GET', 'road/type/all', {}, function(res) {
				// 请求成功执行代码
				if(res.code == 0) {
					let list = res.result;
					$scope.roadList = list;
				} else {
					alert(res.msg);
					console.log(res.result);
				}
			});
		}

		$scope.save = function() {
			let title = $("#title").val();
			let number = $("#number").val();
			let areaList = $("#select2_sample1").val();
			let roadList = $("#select2_sample2").val();
			let id = $scope.modal.currentId;
			let content = UE.getEditor('editor').getContent();
			if(!title) {
				alert("标题不能为空");
				return;
			}
			if(!content) {
				alert("内容不能为空");
				return;
			}
			if(!areaList) {
				areaList = [];
			}
			if(!roadList) {
				roadList = [];
			}
			let save = {
				title: title,
				number: number,
				areaList: areaList,
				roadList: roadList,
				content: content
			}
			if(!sts) {
				req('POST', 'unit/save', save, function(res) {
					// 请求成功执行代码
					if(res.code == 0) {
						alert(res.msg);
						$state.go('unit',{},{reload:true});
					} else {
						alert(res.msg);
						console.log(res.result);
					}
				});
			} else {
				save.id = id;
				req('POST', 'unit/modify', save, function(res) {
					// 请求成功执行代码
					
					if(res.code == 0) {
						alert(res.msg);
						$state.go('unit',{},{reload:true});
					} else {
						alert(res.msg);
						console.log(res.result);
					}
				});
			}
		}

	});
});