package com.app.Mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.app.Domain.Comment;

/* 댓글 관련 Mapper 인터페이스 */
@Mapper
public interface CommentMapper {
	
	/* 댓글 목록 검색 */
	List<Comment> selectComment();
	
	/* 댓글 추가 */
	int insertComment(Comment comment);
	
	/* 댓글 수정 */
	int updateComment(Comment comment);
	
	/* 댓글 삭제 */
	int deleteComment(int idx);
}
