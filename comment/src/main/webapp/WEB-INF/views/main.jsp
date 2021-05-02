<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<!-- JSTL 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		
		<!-- 제이쿼리와 부트스트랩 설정 -->
		<jsp:include page="/WEB-INF/views/header.jsp" />
		
		<!-- JavaScript 로드 -->
		<script src="/js/main.js" type="text/javascript"></script>
		
		<!-- CSS 적용 -->
		<link rel="stylesheet" href="/css/mainStyle.css">
		
		<title>댓글</title>
	</head>
	<body>
		<!-- 수정 Modal 창 -->
		<div id="modifyModalArea"></div>
		
		<!-- 대댓글 작성 Modal 창 -->
		<div id="insertModalArea"></div>
	
		<!-- 제목 -->
		<h1>댓글 목록</h1>
		<hr>
		
		<div class="container">
		
			<!-- 기본 댓글 내용 작성 -->
			<div class="NormalCommentWriteContentsInput">
				<div class="form-group">
				    <label for="commentContents">Comment</label>
				    <input type="text" class="form-control" id="commentContents" placeholder="댓글을 입력하세요">
			  	</div>
			</div>
			
			<!-- 기본 댓글 작성자 작성 -->
			<div class="NormalCommentWriterInput">
				<div class="form-group">
				    <label for="commentWriter">Writer</label>
				    <input type="text" class="form-control" id="commentWriter" placeholder="작성자를 입력하세요">
			  	</div>
			</div>
			
			<!-- 위의 두 input의 submit 버튼 -->
			<div class="btnNormalCommentWrite">
				<button type="button" id="btnWrite" class="btn btn-default">댓글 작성</button>
			</div>
			
			<!-- 댓글 목록 -->
			<div class="commentList">
			
				<!-- AJAX로 비동기 통신하여 데이터를 받아오는 부분 -->
				<ul id="comments">
				
				</ul>
			</div>
			
		</div>
	</body>
</html>