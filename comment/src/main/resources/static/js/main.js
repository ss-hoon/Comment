$(document).ready(function(){
	
	/* 댓글 작성 버튼을 눌렀을 때의 이벤트 */
	$("#btnWrite").click(function(){
		
		/* 빈칸 검사 */
		if($("#commentContents").val() == '' || $("#commentWriter").val() == ''){
			alert("댓글 또는 작성자를 1자 이상 작성해주세요");
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
					location.href = "/";
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