<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form action="books" method = "post">
		Bookcode: <input type="number" name="bookcode"></br>
		Title: <input type="text" name="title"></br>
		AUthor: <input type="text" name="author"></br>
		Category: <input type="text" name="category"></br>
		Approved: <input type="number" name="approved"></br>
		<input type="submit" value="Add book">
	</form>
</body>
</html>