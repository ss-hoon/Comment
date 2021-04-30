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
			        <label for="commentModifyIdx">댓글 번호</label>
			        <input class="form-control" id="commentModifyIdx" name="commentModifyIdx" readonly>
			    </div>
			    
			    <!-- 댓글 내용 input -->
			    <div class="form-group">
			        <label for="commentModifyText">댓글 내용</label>
			        <input class="form-control" id="commentModifyText" name="commentModifyText" placeholder="댓글 내용을 입력해주세요">
			    </div>
			    
			    <!-- 댓글 작성자 input -->
			    <div class="form-group">
			        <label for="commentModifyWriter">댓글 작성자</label>
			        <input class="form-control" id="commentModifyWriter" name="commentModifyWriter" readonly>
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