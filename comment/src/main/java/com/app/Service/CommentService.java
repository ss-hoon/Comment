package com.app.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Domain.Comment;
import com.app.Domain.Paging;
import com.app.Mapper.CommentMapper;

/* 댓글 관련 Service */
@Service
public class CommentService {
	
	@Autowired
	private CommentMapper commentMapper;
	
	/* 페이징 만드는 작업 */
	public Paging getPaging(Paging page) {
		
		/* 기본 게시글 전체 수 */
		int totalComment = commentMapper.getTotalCommentCnt();
		
		return new Paging(totalComment, page);
	}
	
	/* 기본 댓글 목록 검색 */
	public List<Comment> selectComment() {
		return commentMapper.selectComment();
	}
	
	/* 대댓글 목록 검색 */
	public List<Comment> selectNestedComment(int parent){
		return commentMapper.selectNestedComment(parent);
	}

	/* 댓글 추가 */
	public int insertComment(Comment comment) {
		return commentMapper.insertComment(comment);
	}
	
	/* order를 움직여야 하는지 확인 */
	public int existOrder(Comment comment) {
		return commentMapper.existOrder(comment);
	}
	
	/* order를 움직이지 않는 경우 해당 parent의 맨마지막 order 반환 */
	public int lastOrder(int parent) {
		return commentMapper.lastOrder(parent);
	}
	
	/* order를 움직여야 하는 경우 그 위치의 order 반환 */
	public int getOrder(Comment comment) {
		return commentMapper.getOrder(comment);
	}
	
	/* 삽입할 곳 뒤에 있는 row의 order를 하나씩 뒤로 미는 작업 */
	public int updateOrder(Comment comment) {
		return commentMapper.updateOrder(comment);
	}
	
	/* 해당 위치에 대댓글 추가 */
	public int nestedInsertComment(Comment comment) {
		return commentMapper.nestedInsertComment(comment);
	}
	
	/* 댓글 수정 */
	public int updateComment(Comment comment) {
		return commentMapper.updateComment(comment);
	}
	
	/* 댓글 삭제 */
	public int deleteComment(int idx) {
		return commentMapper.deleteComment(idx);
	}
}
