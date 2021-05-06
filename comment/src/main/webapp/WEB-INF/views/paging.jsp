<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="paging text-center">
	<ul class="pagination">
		
		<c:if test="${paging.curPage ge 1}">
			<li>
				<a class="page-link" href="#" aria-label="Previous">
			    	<span aria-hidden="true">&laquo;</span>
			    </a>
			</li>
		</c:if>
		
	    <li class="page-item"><a class="page-link" href="#">1</a></li>
	    <li class="page-item"><a class="page-link" href="#">2</a></li>
	    <li class="page-item"><a class="page-link" href="#">3</a></li>
	    
	    <c:if test="${paging.curPage lt paging.totalPage}">
			<li>
				<a class="page-link" href="#" aria-label="Previous">
			    	<span aria-hidden="true">&raquo;</span>
			    </a>
			</li>
		</c:if>
  </ul>
</div>