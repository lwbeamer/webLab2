<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:useBean id="records" class="com.example.weblab2.session.RecordList" scope="session" />

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="img/icon.ico">
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Nunito&family=Roboto:wght@300&display=swap" rel="stylesheet">
    <title>Web-Lab #2</title>

</head>
<body>
<table id='main-table' >
    <tr>
        <td id='header' colspan="2">
            <span class='left-aligned'>Осипов Василий Васильевич</span>
            <span class='right-aligned'>Вариант 10323<br>Группа P3210</span>
        </td>
    </tr>
    <tr>
        <td 	id='result-table-square' rowspan="2">
            <div class = 'result-header'>
                <h2 class = 'result-header-title'>Таблица</h2>
            </div>
            <div class = 'result-content'>
                <table id = 'result-content-table'>
                    <tr id='table-header'>
                        <th class='coords'>X</th>
                        <th class='coords'>Y</th>
                        <th class='coords'>R</th>
                        <th>Текущее время</th>
                        <th>Время выполнения</th>
                        <th>Результат</th>
                    </tr>
                    <c:forEach var="record" items="${records.records}">
                        <tr>
                            <td>${record.xValue}</td>
                            <td>${record.yValue}</td>
                            <td>${record.rValue}</td>
                            <td>${record.currentTime}</td>
                            <td>${record.executionTime}</td>
                            <td>${record.hitResult}</td>
                        </tr>
                    </c:forEach>

                </table>
            </div>
        </td>
        <td id = 'graph-table-square'>
            <div class = 'graph-header'>
                <h2 class = 'graph-header-title'>График</h2>
            </div>
            <div class = 'image-container'>
<%--                <img src='img/areas.svg' class = 'graph-image'>--%>
                <object class="areas" type="image/svg+xml" data="img/areas.svg">
<%--                    <img src="img/areas.png" width="220" height="220" alt="График">--%>
                </object>
                <canvas id = 'canvas' width="220" height="220">Интерактивный элемент не поддерживается</canvas>
            </div>
        </td>
    </tr>
    <tr>
        <td id = 'values-table-square'>
            <div class = values-header>
                <h2 class = 'values-header-title'>Значения</h2>
            </div>
            <div class = 'values-container'>
                <form id ='input-form' action = "" method='POST'>
                    <table id = 'input-table'>
                        <tr>
                            <td class='input-label'>
                                <h3>X: </h3>
                            </td>
                            <td class='input-value'>
                                <input id='x-textinput' type='text' name='xvalue' autocomplete='off' placeholder='Число от -3 до 5...' maxlength='12'>
                            </td>
                        </tr>
                        <tr>
                            <td class = 'input-label' id = 'y-input-label'>
                                <h3>Y: </h3>
                            </td>
                            <td class='input-value'>
                                <div class = 'y-buttons'>
                                    <input id = 'y-button-1' type='button' name='yvalue1' value='-3'>
                                    <input id = 'y-button-2' type='button' name='yvalue2' value='-2'>
                                    <input id = 'y-button-3' type='button' name='yvalue3' value='-1'>
                                    <input id = 'y-button-4' type='button' name='yvalue4' value='0'>
                                    <input id = 'y-button-5' type='button' name='yvalue5' value='1'>
                                    <input id = 'y-button-6' type='button' name='yvalue6' value='2'>
                                    <input id = 'y-button-7' type='button' name='yvalue7' value='3'>
                                    <input id = 'y-button-8' type='button' name='yvalue8' value='4'>
                                    <input id = 'y-button-9' type='button' name='yvalue9' value='5'>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class = 'input-label'>
                                <h3>R: </h3>
                            </td>
                            <td class='input-value'>
                                <div class='radio-block'>
                                    <label class='rbox-label left-moved' for='r-radio1'>1</label>
                                    <input class='r-radio' id='r-radio1' type='radio' name='rvalue' value='1'>
                                </div>
                                <div class='radio-block'>
                                    <label class='rbox-label' for='r-radio2'>1.5</label>
                                    <input class='r-radio' id='r-radio2' type='radio' name='rvalue' value='1.5'>
                                </div>
                                <div class='radio-block'>
                                    <label class='rbox-label left-moved' for='r-radio3'>2</label>
                                    <input class='r-radio' id='r-radio3' type='radio' name='rvalue' value='2'>
                                </div>
                                <div class='radio-block'>
                                    <label class='rbox-label' for='r-radio4'>2.5</label>
                                    <input class='r-radio' id='r-radio4' type='radio' name='rvalue' value='2.5'>
                                </div>
                                <div class='radio-block'>
                                    <label class='rbox-label left-moved' for='r-radio5'>3</label>
                                    <input class='r-radio' id='r-radio5' type='radio' name='rvalue' value='3'>
                                </div>

                                <input class="hidden_y" type="hidden" name="yvalue" value="">
                                <input class="hidden_timezone" type="hidden" name="timezone" value="">
                                <input class="hidden_clear" type="hidden" name="clear" value="">
                                <input class="hidden_record" type="hidden" name="reccount" value="0">
                            </td>
                        </tr>
                        <tr>
                            <td colspan='2'>
                                <div class='sub-res-buttons'>
                                    <input id='submit-button'type="submit" value="Принять">
                                    <input type="reset" value="Сброс">
                                </div>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </td>
    </tr>
</table>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src = 'js/app.js'></script>
</body>
</html>