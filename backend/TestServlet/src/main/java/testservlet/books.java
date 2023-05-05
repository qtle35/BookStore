package testservlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/books")
public class books extends HttpServlet {
//	@Override
//	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//		resp.setContentType("text/html; charset=UTF-8");
//		PrintWriter printWriter = resp.getWriter();
//		Connection connection = null;
//		Statement statement = null;
//		ResultSet resultSet = null;
//		try {
//			
//			Class.forName("com.mysql.cj.jdbc.Driver");
//			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "1234");
//			statement = connection.createStatement();
//			statement.execute("insert into book values (3,'Mân Đàn','Trương Quốc Việt','Quỷ',2023)");
//			resultSet = statement.executeQuery("select * from book;");
//			while(resultSet.next()) {
//				int bookcode = resultSet.getInt("bookcode");
//				String title = resultSet.getString("title");
//				String author = resultSet.getString("author");
//				String category = resultSet.getString("category");
//				int approved = resultSet.getInt("approved");
//				printWriter.println("<br>"+bookcode+", "+title+", "+author+", "+category+", "+approved);
//			}
//		}
//		catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html");
		Connection connection = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "1234");
			PreparedStatement st = connection.prepareStatement("insert into book values(?, ?, ?, ?, ?)");
			st.setInt(1, Integer.valueOf(req.getParameter("bookcode")));
			st.setString(2, req.getParameter("title"));
			st.setString(3, req.getParameter("author"));
			st.setString(4, req.getParameter("category"));
			st.setInt(5, Integer.valueOf(req.getParameter("approved")));
			st.executeUpdate();
			st.close();
			connection.close();
			resp.sendRedirect("books");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
