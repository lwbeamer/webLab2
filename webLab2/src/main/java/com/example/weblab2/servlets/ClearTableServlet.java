package com.example.weblab2.servlets;

import com.example.weblab2.session.RecordList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ClearTableServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        RecordList records = (RecordList) request.getSession().getAttribute("records");
        if (records == null) records = new RecordList();
        records.getRecords().clear();
        request.getSession().setAttribute("records", records);

        getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }
}
