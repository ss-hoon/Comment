package com.app.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Domain.Comment;
import com.app.Mapper.CommentMapper;

/* 댓글 관련 Service */
@Service
public class CommentService {
	
	@Autowired
	private CommentMapper commentMapper;
	
	/* 댓글 목록 검색 */
	public List<Comment> selectComment() {
		return commentMapper.selectComment();
	}

	/* 댓글 추가 */
	public int insertComment(Comment comment) {
		return commentMapper.insertComment(comment);
	}
}
