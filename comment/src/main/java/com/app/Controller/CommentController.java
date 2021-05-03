package com.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.app.Domain.Comment;
import com.app.Service.CommentService;

import lombok.extern.slf4j.Slf4j;

/* 댓글 관련 Controller */
@Controller
@RequestMapping("")
@Slf4j
public class CommentController {

	@Autowired
	private CommentService commentService;

	/* main 화면으로 이동 */
	@RequestMapping("")
	public String main() {
		log.info("location : ''");
		return "main";
	}

	/* 댓글 목록 검색 */
	@GetMapping("/select")
	@ResponseBody
	public List<Comment> selectComment() {
		log.info("location : '/select'");

		List<Comment> retCommentList = commentService.selectComment();
		log.info("Comment : {}", retCommentList);

		return retCommentList;
	}

	/* 댓글 추가 */
	@PostMapping("/insert")
	@ResponseBody
	public int insertComment(@RequestBody Comment comment) {
		log.info("location : '/insert'");

		/* insert에 성공하면 1 */
		/* insert에 실패하면 0 */
		int response = commentService.insertComment(comment);

		if (response != 0) {
			log.info("댓글 추가 성공");
		} else {
			log.info("댓글 추가 실패");
		}

		return response;
	}

	/* 댓글 수정 */
	@PutMapping("/update")
	@ResponseBody
	public int updateComment(@RequestBody Comment comment) {
		log.info("location : '/update'");

		/* update에 성공하면 1 */
		/* update에 실패하면 0 */
		int response = commentService.updateComment(comment);

		if (response != 0) {
			log.info("댓글 수정 성공");
		} else {
			log.info("댓글 수정 실패");
		}

		return response;
	}

	/* 댓글 삭제 */
	@DeleteMapping("/delete/{idx}")
	@ResponseBody
	public int deleteComment(@PathVariable int idx) {
		log.info("location : '/delete'");

		/* delete에 성공하면 1 */
		/* delete에 실패하면 0 */
		int response = commentService.deleteComment(idx);

		if (response != 0) {
			log.info("댓글 삭제 성공");
		} else {
			log.info("댓글 삭제 실패");
		}

		return response;
	}
}
