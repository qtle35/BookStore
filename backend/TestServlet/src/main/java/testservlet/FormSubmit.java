package testservlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.security.auth.message.callback.PrivateKeyCallback.Request;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/form-submit")
public class FormSubmit extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html;charset=UTF-8");
		PrintWriter printWriter = resp.getWriter();
		String ten = req.getParameter("name");
		String tuoi = req.getParameter("age");
		printWriter.println("<h1> day la API su dung GET <h1/>");
		printWriter.println("<h1> ten " + ten + " <h1/>");
		printWriter.println("<h1> tuoi " + tuoi + "<h1/>");
		printWriter.close();
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html;charset=UTF-8");
		PrintWriter printWriter = resp.getWriter();
		String bookcode = req.getParameter("bookcode");
		String title = req.getParameter("title");
		String author = req.getParameter("author");
		String category = req.getParameter("category");
		String approved = req.getParameter("approved");
		Connection connection = null;
		Statement statement = null;
		ResultSet resultSet = null;
		try {

			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysq://localhost:3306/jdbc_demo", "root", "1234");
			statement = connection.createStatement();
			printWriter.print("insert into book values (" + bookcode + ", N'" + title + "', '" + author + "', '"
					+ category + "', " + approved + ");");
			statement.execute("insert into book values (" + bookcode + ", N'" + title + "', '" + author + "', '"
					+ category + "', " + approved + ");");
			resultSet = statement.executeQuery("select * from book;");
			while (resultSet.next()) {
				int bookcodepr = resultSet.getInt("bookcode");
				String titlepr = resultSet.getString("title");
				String authorpr = resultSet.getString("author");
				String categorypr = resultSet.getString("category");
				int approvedpr = resultSet.getInt("approved");
				printWriter.println(
						"<br>" + bookcodepr + ", " + titlepr + ", " + authorpr + ", " + categorypr + ", " + approvedpr);
			}
//			req.setAttribute("title", title);
//			req.getRequestDispatcher("a.jsp").forward(req, resp);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
