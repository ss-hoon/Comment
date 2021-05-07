/* 전역 변수 부분 */
var curPage = 1; // 현재 페이지

/* AJAX 통신 -> 댓글의 전체 목록 select + Paging */
function getAllList(page){

	/* 페이징 버튼 처리 */
	getPaging(page);

	$.ajax({
		url : "/select?curPage=" + page,
		type : "GET",
		contentType : "application/json; charset=UTF-8",
		dataType : "json",
		success : function(data){		
					
			var commentTag = "";
			
			/* 요청해서 받은 댓글 목록을 통해 동적 태그 생성 */
			$(data).each(function(){
				
				commentTag += "<hr>";
				commentTag += "<div class='commentElement'>";
				commentTag += "<li data-commentIdx='" + this.idx + "'>";
				commentTag += "<p class='commentText'>" + this.contents + "</p>";
				commentTag += "<p class='commentWriter'>" + this.userId + "</p>";
				commentTag += "<p class='commentCreatedDate'>" + this.createdDate + "</p>";
				commentTag += "<p class='commentParent' style='display:none'>" + this.parent + "</p>";
				commentTag += "<p class='commentDepth' style='display:none'>" + this.depth + "</p>";
				commentTag += "<p class='commentOrder' style='display:none'>" + this.order + "</p>";
				commentTag += "<button class='btn btn-xs btn-success' id='btnModifyModal' data-toggle='modal' data-target='#modifyModal'>수정</button>";
				commentTag += "&nbsp;";
				commentTag += "<button class='btn btn-xs btn-primary' id='btnInsertModal' data-toggle='modal' data-target='#insertModal'>답글</button>";
				commentTag += "<button class='btn btn-xs btn-default pull-right' id='btnDisplayNestedComment' >댓글 더보기</button>";
				commentTag += "</li>";
				commentTag += "<div class='nestedCommentList' style='display:block'></div>"
				commentTag += "</div>";
				
			});
			
			/* 만든 태그를 해당 위치에 삽입 */
			$(".commentList #comments").html(commentTag);
			
		},
		error : function(){
			alert("통신 오류");
		}
	});
}

/* 페이징 버튼 처리 */
function getPaging(page){
	$.ajax({
		url : "/paging?curPage=" + page,
		type : "GET",
		contentType : "application/json; charset=UTF-8",
		dataType : "json",
		success : function(data){		
					
			var pagingTag = "";
			
			/* 페이징 버튼 생성 */
			$(data).each(function(){
				
				pagingTag += "<div class='paging text-center'>";
				pagingTag += "<ul class='pagination'>";
				
				/* << 버튼(앞 페이지 이동 버튼) */
				/* 현재 페이지가 첫번째 페이지인 경우에는 버튼을 사용할 수 없도록 함 */
				if(this.curPage <= 1) {
					pagingTag += "<li class='disabled'>";
					pagingTag += "<span aria-hidden='true'>&laquo;</span>";
					pagingTag += "</li>";
				} else {
					pagingTag += "<li>";
					pagingTag += "<a class='page-link' onclick='curPage--;getAllList(" + (page - 1) + ")' aria-label='Previous'>";
					pagingTag += "<span aria-hidden='true'>&laquo;</span>";
					pagingTag += "</a>";
					pagingTag += "</li>";
				}
				
				/* 페이지 버튼 */
				/* 해당 버튼이 현재 페이지인 경우에는 active 시켜 현재 어디 페이지인지 알 수 있도록 함 */
				for(var idx = this.startPage; idx <= this.endPage; idx ++){
					
					if(idx == this.curPage){
						pagingTag += "<li class='page-item active'>";
					} else {
						pagingTag += "<li class='page-item'>";						
					}
					
					pagingTag += "<a class='page-link' onclick='curPage=" + idx + ";getAllList("+ idx + ")'>" + idx;
					pagingTag += "</a>";
					pagingTag += "</li>";

				}
				
				
				/* >> 버튼(뒷 페이지 이동 버튼) */
				/* 현재 페이지가 마지막 페이지인 경우에는 버튼을 사용할 수 없도록 함 */
				if(this.curPage >= this.totalPage) {
					pagingTag += "<li class='disabled'>";
					pagingTag += "<span aria-hidden='true'>&raquo;</span>";
					pagingTag += "</li>";
				} else {
					pagingTag += "<li>";
					pagingTag += "<a class='page-link' onclick='curPage++;getAllList(" + (page + 1) + ")' aria-label='Next'>";
					pagingTag += "<span aria-hidden='true'>&raquo;</span>";
					pagingTag += "</a>";
					pagingTag += "</li>";
				}
				
				pagingTag += "</ul>";
				pagingTag += "</div>";
			
			});
			
			/* 만든 태그를 해당 위치에 삽입 */
			$(".commentList .pagingArea").html(pagingTag);
			
		},
		error : function(){
			alert("통신 오류");
		}
	});
}

/* AJAX 통신 -> 해당 그룹의 대댓글 전체 select */
function getNestedCommentList(position, parent){
	$.ajax({
		url : "/selectNestedComment",
		type : "GET",
		contentType : "application/json; charset=UTF-8",
		data : {"parent" : parent},
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
				tag += "<button class='btn btn-xs btn-success' id='btnModifyModal' data-toggle='modal' data-target='#modifyModal'>수정</button>";
				tag += "&nbsp;";
				tag += "<button class='btn btn-xs btn-primary' id='btnInsertModal' data-toggle='modal' data-target='#insertModal'>답글</button>";
				tag += "</li>";
				tag += "</div>";
				
			});
			
			/* 만든 태그를 해당 위치에 삽입 */
			$(position).html(tag);
			
		},
		error : function(){
			alert("통신 오류");
		}
	})
}

/* 대댓글 접기 */
function emptyNestedCommentList(position){
	
	var tag = "";
	
	/* 만든 태그를 해당 위치에 삽입 */
	$(position).html(tag);
}

$(document).ready(function(){

	/* 초기 댓글 목록 select */
	getAllList(1);
	getPaging(1);
	
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
					getAllList(curPage);
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
		$("#commentInsertModalText").val("");
		$("#commentInsertModalWriter").val("");
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
					getAllList(curPage);
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
					getAllList(curPage);
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
					getAllList(curPage);
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
	
	/* 댓글 더보기 버튼을 눌렀을 때의 이벤트 */
	$("#comments").on("click", ".commentElement li #btnDisplayNestedComment", function(){
		
		var position = $(this).parent().parent().find(".nestedCommentList");
		var parent = $(this).parent().find(".commentParent").text();
		var buttonName = $(this).parent().find("#btnDisplayNestedComment").text();
		
		/* 대댓글 접기 기능 */
		if(buttonName == "댓글 더보기"){
			getNestedCommentList(position, parent);
			$(this).parent().find("#btnDisplayNestedComment").text("댓글 숨기기");
		} else {
			emptyNestedCommentList(position);
			$(this).parent().find("#btnDisplayNestedComment").text("댓글 더보기");
		}
	});
});