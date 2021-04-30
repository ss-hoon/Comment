$(document).ready(function(){
	
	/* 초기 댓글 목록 select */
	$.ajax({
		url : "/select",
			type : "POST",
			contentType : "application/json; charset=UTF-8",
			dataType : "json",
			success : function(data){		
						
				/* 요청해서 받은 댓글 목록을 통해 동적으로 HTML 생성 */
				var tag = "";
				$(data).each(function(){
					tag += "<hr>";
					tag += "<li data-commentIdx='" + this.idx + "' class='commentList'>"
					tag += "<p class='commentText'>" + this.contents + "</p>";
					tag += "<p class='commentWriter'>" + this.userId + "</p>";
					tag += "<p>" + this.createdDate + "</p>";
					tag += "<button class='btn btn-xs btn-success' data-toggle='modal' data-target='#modifyModal'>수정</button>"
					tag += "</li>"; 
					tag += "<hr>";
				});
				
				$("#comments").html(tag);
				
				/* Modal 창 로드 */
				$("#modalArea").load("/modal");
				
			},
			error : function(){
				alert("통신 오류");
			}
	});
	
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
		
		/* param 객체를 JSON 문자열로 변환하여 AJAX 통신 */
		$.ajax({
			url : "/insert",
			type : "POST",
			contentType : "application/json; charset=UTF-8",
			data : JSON.stringify(param),
			dataType : "json",
			success : function(data){
				console.log(data);
				if(data == 1){
					alert("작성 성공");
					location.href = "";
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
	$("#comments").on("click", ".commentList button", function(){
		var comment = $(this).parent();
		
		var commentIdx = comment.attr("data-commentIdx");
		var commentText = comment.find(".commentText").text();
		var commentWriter = comment.find(".commentWriter").text();
		
		$("#commentIdx").val(commentIdx);
		$("#commentText").val(commentText);
		$("#commentWriter").val(commentWriter);
	});
});