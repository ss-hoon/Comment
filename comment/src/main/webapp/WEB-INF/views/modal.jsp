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
			        <label for="commentModifyModalIdx">댓글 번호</label>
			        <input class="form-control" id="commentModifyModalIdx" name="commentModifyModalIdx" readonly>
			    </div>
			    
			    <!-- 댓글 내용 input -->
			    <div class="form-group">
			        <label for="commentModifyModalText">댓글 내용</label>
			        <input class="form-control" id="commentModifyModalText" name="commentModifyModalText" placeholder="댓글 내용을 입력해주세요">
			    </div>
			    
			    <!-- 댓글 작성자 input -->
			    <div class="form-group">
			        <label for="commentModifyModalWriter">댓글 작성자</label>
			        <input class="form-control" id="commentModifyModalWriter" name="commentModifyModalWriter" readonly>
			    </div>
			    
	    	</div>
	
			<!-- Modal Footer -->
			<div class="modal-footer">
			    <button type="button" class="btn btn-default pull-left" data-dismiss="modal">닫기</button>
			    <button type="button" class="btn btn-success btnModifyModalModify">수정</button>
			    <button type="button" class="btn btn-danger btnModifyModalDelete">삭제</button>
			</div>
		
		</div>
	</div>
</div>