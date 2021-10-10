package servlets;

import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "ControllerServlet", value = "/controller-servlet")
public class ControllerServlet extends HttpServlet {
    private String message;

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
//        if (request.getParameter("xvalue") != null && request.getParameter("yvalue") != null &&
//                request.getParameter("rvalue") != null) {
//            getServletContext().getNamedDispatcher("AreaCheckServlet").forward(request, response);
//        } else
//            getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        getServletContext().getNamedDispatcher("AreaCheckServlet").forward(request, response);
    }
}