<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<div class="modal fade" id="insertModal" role="dialog">
	<div class="modal-dialog">
	
		<!-- Modal 전체 내용 -->
		<div class="modal-content">

			<!-- Modal Header -->
			<div class="modal-header">
    			<button type="button" class="close" data-dismiss="modal">&times;</button>
			    <h4 class="modal-title">답글 작성창</h4>
			</div>

			<!-- Modal Body -->
			<div class="modal-body">
				<div>
					<input type="hidden" id="commentInsertModalParent" name="commentInsertModalParent"/>
					<input type="hidden" id="commentInsertModalDepth" name="commentInsertModalDepth"/>
					<input type="hidden" id="commentInsertModalOrder" name="commentInsertModalOrder"/>
				</div>
			    
			    <!-- 댓글 내용 input -->
			    <div class="form-group">
			        <label for="commentInsertModalText">댓글 내용</label>
			        <input class="form-control" id="commentInsertModalText" name="commentInsertModalText" placeholder="댓글 내용을 입력해주세요"/>
			    </div>
			    
			    <!-- 댓글 작성자 input -->
			    <div class="form-group">
			        <label for="commentInsertModalWriter">댓글 작성자</label>
			        <input class="form-control" id="commentInsertModalWriter" name="commentInsertModalWriter" placeholder="작성자를 입력해주세요"/>
			    </div>
			    
	    	</div>
	
			<!-- Modal Footer -->
			<div class="modal-footer">
			    <button type="button" class="btn btn-default pull-left" data-dismiss="modal">닫기</button>
			    <button type="button" class="btn btn-success btnInsertModalWrite">작성</button>
			</div>
		
		</div>
	</div>
</div>