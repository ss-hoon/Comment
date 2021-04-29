package com.app.Domain;

import java.time.LocalDate;

import lombok.Data;

/* comment 테이블 컬럼 */
@Data
public class Comment {
	private int idx;
	private String contents;
	private int parent;
	private int depth;
	private int order;
	private String userId;
	private LocalDate createdDate;
	private LocalDate updatedDate;
	private char deleted;
}
