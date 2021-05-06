package com.app.Domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Paging {
	
	/* 한 페이지 당 게시글 수 */
	private int pageSize;
	
	/* 한 화면 당 페이지 수 */
	private int blockSize;
	
	/* 총 기본 댓글 수 */
	private int totalComment;
	
	/* 총 페이지 수 */
	private int totalPage;
	
	/* 현재 페이지 */
	private int curPage;
	
	/* 화면 상 시작 페이지 */
	private int startPage;
	
	/* 화면 상 마지막 페이지 */
	private int endPage;
	
	/* 현재 페이지의 시작 댓글 번호 */
	private int startNo;
	
	/* 현재 페이지의 마지막 댓글 번호 */
	private int endNo;
	
	/* Paging 생성자 */
	public Paging(int totalComment, Paging page) {
		setTotalComment(totalComment);
		setCurPage(page.curPage);
		
		makePaging();
	}
	
	/* Paging 상세 정보 생성 */
	private void makePaging() {
		
		if(totalComment == 0) return;
		
		/* Default 설정 */
		if(curPage == 0)	setCurPage(1);
		if(pageSize == 0)	setPageSize(4);
		if(blockSize == 0)	setBlockSize(5);
		
		/* 총 페이지 수 계산 */
		totalPage = totalComment / pageSize;
		if(totalComment % pageSize != 0)	totalPage++;
		
		/* 현재 페이지 보정 */
		if(totalPage < curPage)	curPage = totalPage;
		
		/* 화면에 보여질 게시글의 시작 페이지와 끝 페이지 */
		startPage = ((curPage - 1) / blockSize) * blockSize + 1;
		endPage = startPage + blockSize - 1;
		
		/* 계산된 끝 페이지 번호가 총 페이지 수보다 클 때 보정 */
		if(totalPage < endPage)	endPage = totalPage;
		
		/* 화면에 보여질 게시글의 시작번호와 끝번호 */
		startNo = (curPage - 1) * pageSize + 1;
		endNo = curPage * pageSize;
		
	}
}
