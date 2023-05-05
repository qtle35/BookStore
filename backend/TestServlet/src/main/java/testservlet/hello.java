package testservlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = { "/hello" })
public class hello extends HttpServlet {
	public static boolean check(String s) {
		return s.equals(new StringBuilder(s).reverse().toString());

	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html;charset = UTF-8");
		PrintWriter printWriter = resp.getWriter();
		int square = Integer.parseInt(req.getParameter("quyet"));
		printWriter.println(square * square);
		String s = req.getParameter("q");
		if (check(s)) {
			printWriter.println("ok");
		} else {
			printWriter.println("k phai");
		}
		printWriter.close();
	}
}
