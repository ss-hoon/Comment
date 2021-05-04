package com.app.Mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.app.Domain.Comment;

/* 댓글 관련 Mapper 인터페이스 */
@Mapper
public interface CommentMapper {
	
	/* 기본 댓글 목록 검색 */
	List<Comment> selectComment();
	
	/* 대댓글 목록 검색 */
	List<Comment> selectNestedComment(int parent);
	
	/* 댓글 추가 */
	int insertComment(Comment comment);
	
	/* order를 움직여야 하는지 확인 */
	int existOrder(Comment comment);
	
	/* order를 움직이지 않는 경우 해당 parent의 맨마지막 order 반환 */
	int lastOrder(int parent);
	
	/* order를 움직여야 하는 경우 그 위치의 order 반환 */
	int getOrder(Comment comment);
	
	/* 삽입할 곳 뒤에 있는 row의 order를 하나씩 뒤로 미는 작업 */
	int updateOrder(Comment comment);
	
	/* 해당 위치에 대댓글 추가 */
	int nestedInsertComment(Comment comment);
	
	/* 댓글 수정 */
	int updateComment(Comment comment);
	
	/* 댓글 삭제 */
	int deleteComment(int idx);
}
