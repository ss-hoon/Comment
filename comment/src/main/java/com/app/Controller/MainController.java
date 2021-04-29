package com.app.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("")
public class MainController {
	
	// 초기 댓글 화면
	@RequestMapping("")
	public String main() {
		return "main";
	}
}
