package com.app.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.app.Domain.Comment;

@Controller
@RequestMapping("")
public class CommentController {
	
	// 초기 댓글 화면
	@RequestMapping("")
	public String main() {
		return "main";
	}
	
	@RequestMapping("/insert")
	@ResponseBody
	public Comment insertComment(@RequestBody Comment comment) {
		
	}
}
