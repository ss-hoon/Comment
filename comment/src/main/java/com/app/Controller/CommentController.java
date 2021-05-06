package com.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.app.Domain.Comment;
import com.app.Domain.Paging;
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
	
	/* 페이징 화면 출력 */
	@RequestMapping("/paging")
	@ResponseBody
	public Paging paging(Paging page) {
		log.info("location : '/paging'");
		
		Paging paging = commentService.getPaging(page);
		log.info("paging : {}", paging);
		
		return paging;
	}

	/* 기본 댓글 목록 검색 */
	@GetMapping("/select")
	@ResponseBody
	public List<Comment> selectComment(Paging page) {
		log.info("location : '/select'");

		Paging paging = commentService.getPaging(page);
		log.info("paging : {}", paging);
	
		List<Comment> commentList = commentService.selectComment();
		log.info("Comment : {}", commentList);
		
		return commentList;
	}
	
	/* 대댓글 목록 검색 */
	@GetMapping("/selectNestedComment")
	@ResponseBody
	public List<Comment> selectNestedComment(int parent){
		log.info("location : 'selectNestedComment'");
		
		List<Comment> commentList = commentService.selectNestedComment(parent);
		log.info("Nested Comment : {}", commentList);
		
		return commentList;
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

	/* 대댓글 추가 */
	@PostMapping("/nestedCommentInsert")
	@ResponseBody
	public int insertNestedComment(@RequestBody Comment comment) {
		log.info("location : '/nestedCommentInsert'");

		/* order를 움직여야 하는지 확인 */
		int flag = commentService.existOrder(comment);

		/* order를 움직여야 한다면 order를 찾아서 해당 위치보다 뒤에 있는 row를 하나씩 뒤로 민다 */
		/* order를 움직이지 않아도 된다면 맨 마지막 order를 반환 */
		if (flag != 0) {
			int order = commentService.getOrder(comment);
			comment.setOrder(order);
			commentService.updateOrder(comment);
		} else {
			int order = commentService.lastOrder(comment.getParent());
			comment.setOrder(order);
		}
		
		/* order 위치에 대댓글 추가 */
		int response = commentService.nestedInsertComment(comment);

		if (response == 1) {
			log.info("대댓글 삽입 성공");
		} else {
			log.info("대댓글 삽입 실패");
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
