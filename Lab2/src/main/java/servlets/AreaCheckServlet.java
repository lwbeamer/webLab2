package servlets;

import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

//@WebServlet(name = "helloServlet", value = "/hello-servlet")
public class AreaCheckServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

//        String xStringValue = request.getParameter("xvalue").replace(',','.');
//        String yStringValue = request.getParameter("yvalye");
//        String rStringValue = request.getParameter("rvalue");

        response.setContentType("text/html");
        PrintWriter writer = response.getWriter();
        // получаем параметр id
        //String id = request.getParameter("id");

        try {
            writer.println("<h2>Чел тыыыы</h2>");
        } finally {
            writer.close();
        }
    }
}
