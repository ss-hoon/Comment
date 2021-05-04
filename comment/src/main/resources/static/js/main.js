/* AJAX 통신 -> 댓글의 전체 목록 select */
function getAllList(){
	$.ajax({
		url : "/select",
		type : "GET",
		contentType : "application/json; charset=UTF-8",
		dataType : "json",
		success : function(data){		
					
			/* 요청해서 받은 댓글 목록을 통해 동적 태그 생성 */
			var tag = "";
			$(data).each(function(){
				
				var space = this.depth * 20;
				
				tag += "<hr>";
				tag += "<div class='commentElement' style='margin-left: " + space + "px'>";
				tag += "<li data-commentIdx='" + this.idx + "'>";
				tag += "<p class='commentText'>" + this.contents + "</p>";
				tag += "<p class='commentWriter'>" + this.userId + "</p>";
				tag += "<p class='commentCreatedDate'>" + this.createdDate + "</p>";
				tag += "<p class='commentParent' style='display:none'>" + this.parent + "</p>";
				tag += "<p class='commentDepth' style='display:none'>" + this.depth + "</p>";
				tag += "<p class='commentOrder' style='display:none'>" + this.order + "</p>";
				tag += "<button class='btn btn-xs btn-success' id='btnModifyModal' data-toggle='modal' data-target='#modifyModal'>수정</button>"
				tag += "&nbsp;"
				tag += "<button class='btn btn-xs btn-primary' id='btnInsertModal' data-toggle='modal' data-target='#insertModal'>답글</button>"
				tag += "</li>";
				tag += "</div>";
				
			});
			
			/* 만든 태그를 해당 div에 삽입 */
			$("#comments").html(tag);
			
		},
		error : function(){
			alert("통신 오류");
		}
	});
}

$(document).ready(function(){
	
	/* 초기 댓글 목록 select */
	getAllList();
	
	/* 댓글 작성 버튼을 눌렀을 때의 이벤트 */
	$("#btnWrite").click(function(){
		
		/* 빈칸 검사 */
		if($("#commentContents").val() == '' || $("#commentWriter").val() == ''){
			alert("Comment 또는 Writer를 1자 이상 작성해주세요");
			return;
		}
		
		/* 작성한 댓글과 작성자로 객체 생성 */
		var param = {
			"contents" : $("#commentContents").val(),
			"userId" : $("#commentWriter").val()
		};
		
		/* param 객체를 JSON 문자열로 변환하여 AJAX 통신 -> insert 성공 여부 판단 */
		$.ajax({
			url : "/insert",
			type : "POST",
			contentType : "application/json; charset=UTF-8",
			data : JSON.stringify(param),
			dataType : "json",
			success : function(data){
				if(data == 1){
					alert("작성 성공");
					getAllList();
				} else {
					alert("작성 실패");
				}
			},
			error : function(){
				alert("통신 오류");
			}
		});
	});
	
	/* 수정 버튼을 눌렀을 때의 이벤트 */
	$("#comments").on("click", ".commentElement li #btnModifyModal", function(){
		
		/* 클릭한 수정 버튼이 속한 li 요소를 가리킴 */
		var comment = $(this).parent();
		
		var commentIdx = comment.attr("data-commentIdx");
		var commentText = comment.find(".commentText").text();
		var commentWriter = comment.find(".commentWriter").text();
		
		$("#commentModifyModalIdx").val(commentIdx);
		$("#commentModifyModalText").val(commentText);
		$("#commentModifyModalWriter").val(commentWriter);
	});
	
	/* 답글 버튼을 눌렀을 때의 이벤트 */
	$("#comments").on("click", ".commentElement li #btnInsertModal", function(){
		
		/* 클릭한 답글 버튼이 속한 li 요소를 가리킴 */
		var comment = $(this).parent();
		
		var commentIdx = comment.attr("data-commentIdx");
		var commentParent = comment.find(".commentParent").text();
		var commentDepth = comment.find(".commentDepth").text();
		var commentOrder = comment.find(".commentOrder").text();
				
		$("#commentInsertModalIdx").val(commentIdx);
		$("#commentInsertModalParent").val(commentParent);
		$("#commentInsertModalDepth").val(commentDepth);
		$("#commentInsertModalOrder").val(commentOrder);
		
	});
	
	/* 수정 Modal 페이지 내 수정 버튼을 눌렀을 때의 이벤트 */
	$("#modifyModalArea").on("click", ".btnModifyModalModify", function(){
		
		/* comment == .modal-body */
		var comment = $(this).parent().prev();
		
		/* 수정한 댓글내용으로 객체 생성 (idx는 기본키) */
		var param = {
			"idx" : comment.find("#commentModifyModalIdx").val(),
			"contents" : comment.find("#commentModifyModalText").val()
		}
		
		/* param 객체를 JSON 문자열로 변환하여 AJAX 통신 -> update 성공 여부 판단 */
		$.ajax({
			url : "/update",
			type : "PUT",
			contentType : "application/json; charset=UTF-8",
			data : JSON.stringify(param),
			dataType : "json",
			success : function(data){
				if(data == 1){
					alert("수정 성공");
					$("#modifyModal").modal("hide"); // Modal 닫기
					getAllList();
				} else {
					alert("수정 실패");
				}
			},
			error : function(){
				alert("통신 오류");
			}
		});
	});
	
	/* 수정 Modal 페이지 내 삭제 버튼을 눌렀을 때의 이벤트 */
	$("#modifyModalArea").on("click", ".btnModifyModalDelete", function(){

		/* URL 뒤에 삭제할 게시글의 idx를 삽입하여 AJAX 통신 -> delete 성공 여부 판단 */
		$.ajax({
			url : "/delete/" + $("#commentModifyModalIdx").val(),
			type : "DELETE",
			contentType : "application/json; charset=UTF-8",
			dataType : "json",
			success : function(data){
				if(data == 1){
					alert("삭제 성공");
					getAllList();
					$("#modifyModal").modal("hide"); // Modal 닫기
				} else {
					alert("삭제 실패");
				}
			},
			error : function(){
				alert("통신 오류");
			}
		});
	});
	
	/* 대댓글 작성 Modal 페이지 내 작성 버튼을 눌렀을 때의 이벤트 */
	$("#insertModalArea").on("click", ".btnInsertModalWrite", function(){
				
		/* parent, depth, order는 부모 댓글의 속성 그대로 */
		var param = {
			"contents" : $("#commentInsertModalText").val(),
			"userId" : $("#commentInsertModalWriter").val(),
			"parent" : $("#commentInsertModalParent").val(),
			"depth" : $("#commentInsertModalDepth").val(),
			"order" : $("#commentInsertModalOrder").val()
		}

		/* param 객체를 JSON 문자열로 변환하여 AJAX 통신 -> delete 성공 여부 판단 */
		$.ajax({
			url : "/nestedCommentInsert",
			type : "POST",
			contentType : "application/json; charset=UTF-8",
			data : JSON.stringify(param),
			dataType : "json",
			success : function(data){
				if(data == 1){
					alert("작성 성공");
					getAllList();
					$("#insertModal").modal("hide"); // Modal 닫기
					
				} else {
					alert("작성 실패");
				}
			},
			error : function(){
				alert("통신 오류");
			}
		});
	});
});