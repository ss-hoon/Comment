<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<div class="modal fade" id="modifyModal" role="dialog">
	<div class="modal-dialog">
	
		<!-- Modal 전체 내용 -->
		<div class="modal-content">

			<!-- Modal Header -->
			<div class="modal-header">
    			<button type="button" class="close" data-dismiss="modal">&times;</button>
			    <h4 class="modal-title">댓글 수정창</h4>
			</div>

			<!-- Modal Body -->
			<div class="modal-body">
				
				<!-- 댓글 번호 input -->
			    <div class="form-group">
			        <label for="commentIdx">댓글 번호</label>
			        <input class="form-control" id="commentIdx" name="commentIdx" readonly>
			    </div>
			    
			    <!-- 댓글 내용 input -->
			    <div class="form-group">
			        <label for="commentText">댓글 내용</label>
			        <input class="form-control" id="commentText" name="commentText" placeholder="댓글 내용을 입력해주세요">
			    </div>
			    
			    <!-- 댓글 작성자 input -->
			    <div class="form-group">
			        <label for="commentWriter">댓글 작성자</label>
			        <input class="form-control" id="commentWriter" name="commentWriter" readonly>
			    </div>
			    
	    	</div>
	
			<!-- Modal Footer -->
			<div class="modal-footer">
			    <button type="button" class="btn btn-default pull-left" data-dismiss="modal">닫기</button>
			    <button type="button" class="btn btn-success btnModalModify">수정</button>
			    <button type="button" class="btn btn-danger btnModalDelete">삭제</button>
			</div>
		
		</div>
	</div>
</div>