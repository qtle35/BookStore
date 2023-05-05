import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/TH1")
public class th1 extends HttpServlet {
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html; charset=UTF-8");
		PrintWriter printWriter = resp.getWriter();
		String ten = req.getParameter("name");
		int tuoi =Integer.parseInt(req.getParameter("age")) ;
		if(tuoi<14) printWriter.print("<h1>bạn " +ten+  " dưới độ tuổi lao động<h1/>");
		else if(tuoi>=65) printWriter.print("<h1>bạn " +ten+ " ngoài độ tuổi lao động<h1/>");
		else printWriter.print("<h1>bạn " +ten+ " đang trong độ tuổi lao động<h1/>");
		String user = req.getParameter("user");
		String pass = req.getParameter("pass");
		if(user.equals("root")&&pass.equals("root")) {
			printWriter.print("em k biet lam");
		}
	}
}
