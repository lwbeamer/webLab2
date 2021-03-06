package com.example.weblab2.servlets;

import com.example.weblab2.session.Record;
import com.example.weblab2.session.RecordList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;


public class AreaCheckServlet extends HttpServlet {



    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {


        long startTime = System.nanoTime();

        String xStringValue = request.getParameter("xvalue").replace(',','.');
        String yStringValue = request.getParameter("yvalue");
        String rStringValue = request.getParameter("rvalue");


        Boolean isValid = (checkX(xStringValue) && checkY(yStringValue) && checkR(rStringValue));


        if (isValid) {
            double xValue = Double.parseDouble(xStringValue);
            double yValue = Double.parseDouble(yStringValue);
            double rValue = Double.parseDouble(rStringValue);
            boolean isHit = isHitRectangle(xValue, yValue, rValue) || isHitCircle(xValue, yValue, rValue) || isHitTriangle(xValue, yValue, rValue);


            OffsetDateTime currentTimeObject = OffsetDateTime.now(ZoneOffset.UTC);
            String currentTime;
            try {
                currentTimeObject = currentTimeObject.minusMinutes(Long.parseLong(request.getParameter("timezone")));
                currentTime = currentTimeObject.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
            } catch (Exception exception) {
                currentTime = "HH:mm:ss";
            }

            String executionTime = String.valueOf(System.nanoTime() - startTime);
            executionTime +=" ns";

            HttpSession session = request.getSession();
            RecordList records = (RecordList) session.getAttribute("records");
            if (records == null) records = new RecordList();
            records.getRecords().add(new Record(xValue,yValue,rValue,currentTime,executionTime,isHit));
            session.setAttribute("records",records);
        }

        response.sendRedirect(request.getContextPath()+"/index.jsp");
    }

    private boolean checkX(String xString){
        try {
            Double xValue = Double.parseDouble(xString);
            if ((xValue > -3) && (xValue < 5)) return true;
            return false;
        } catch (NumberFormatException e){
            return false;
        }
    }

    private boolean checkY(String yString){
        try {
            int[] yValues = {-3,-2,-1,0,1,2,3,4,5};
            int yValue = Integer.parseInt(yString);
            for (int i = 0; i < yValues.length; i++){
                if (yValues[i] == yValue){
                    return true;
                }
            }
            return false;
        } catch (NumberFormatException e){
            return false;
        }
    }

    private boolean checkR(String rString){
        try {
            double[] rValues = {1,1.5,2,2.5,3};
            double rValue = Double.parseDouble(rString);
            for (int i = 0; i < rValues.length; i++){
                if (rValues[i] == rValue){
                    return true;
                }
            }
            return false;
        } catch (NumberFormatException e){
            return false;
        }
    }

    private boolean isHitTriangle(double xValue, double yValue, double rValue) {
        return xValue <= 0 && yValue >= 0 && yValue <= xValue*2 + rValue;
    }

    private boolean isHitRectangle(double xValue, double yValue, double rValue) {
        return xValue >= 0 && yValue >= 0 && xValue <= rValue && yValue <= rValue/2;
    }

    private boolean isHitCircle(double xValue, double yValue, double rValue) {
        return xValue >= 0 && yValue <= 0 && Math.sqrt(xValue*xValue + yValue*yValue) <= rValue/2;
    }
}
