$(function (){
    const X_MIN = -3;
    const X_MAX = 5;
    const Y_VALUES = [-3,-2,-1,0,1,2,3,4,5];

    let numValueX = undefined
    let numValueY= undefined
    let numValueR = undefined
    let canvas = $('#canvas');

    // alert("X: "+document.querySelector('.areas').getBoundingClientRect().x+" "+document.querySelector('#canvas').getBoundingClientRect().x);
    // alert("Y: "+document.querySelector('.areas').getBoundingClientRect().y+" "+document.querySelector('#canvas').getBoundingClientRect().y);

    function isNumber(s){
        if (s === 0) return true;
        return (!isNaN(parseFloat(s)) && s);
    }

    function checkX(){
        let value = $('#x-textinput').val();
        let fieldValueX = value.trim();
        fieldValueX = value.replace(',', '.');
        numValueX = parseFloat(fieldValueX)
        if (numValueX === +fieldValueX && isNumber(numValueX)){
            if (numValueX>X_MIN && numValueX<X_MAX){
                $('#x-textinput').removeClass('text-error')
                return true;
            } else{
                $('#x-textinput').addClass('text-error')
                return false;
            }
        } else{
            $('#x-textinput').addClass('text-error')
            return false;
        }
    }
    function checkY(){
        if (numValueY === undefined){
            $('.y-buttons input').addClass('button-error')
            $('.y-buttons input').removeClass('button-clicked')
            return false;
        } else {
            $('.y-buttons input').removeClass('button-error')
            return true;
        }
    }

    $('.y-buttons input').click(function (){
        numValueY = $(this).val();
        $('.y-buttons input').removeClass('button-clicked')
        $(this).addClass('button-clicked')
        drawFromForm();
    });


    function checkR(){
        if ($('.r-radio').is(':checked')){
            $('.rbox-label').removeClass('radio-error')
            return true;
        } else {
            $('.rbox-label').addClass('radio-error')
            return false;
        }
    }

    $('.r-radio').on('click', function(event){
        numValueR = $(this).val();

        let svgGraph = document.querySelector('.areas').getSVGDocument();
        svgGraph.querySelector('.coordinate-text_minus-Rx').textContent = (-numValueR).toString();
        svgGraph.querySelector('.coordinate-text_minus-Ry').textContent = (-numValueR).toString();
        svgGraph.querySelector('.coordinate-text_minus-half-Rx').textContent = (-numValueR/2).toString();
        svgGraph.querySelector('.coordinate-text_minus-half-Ry').textContent = (-numValueR/2).toString();
        svgGraph.querySelector('.coordinate-text_plus-Rx').textContent = (numValueR).toString();
        svgGraph.querySelector('.coordinate-text_plus-Ry').textContent = (numValueR).toString();
        svgGraph.querySelector('.coordinate-text_plus-half-Rx').textContent = (numValueR/2).toString();
        svgGraph.querySelector('.coordinate-text_plus-half-Ry').textContent = (numValueR/2).toString();

        drawFromForm();
    });



    canvas.on('click',function (event){
        if (!checkR()) return;

        let svgGraph = document.querySelector('.areas').getSVGDocument();

        let halfCanvas = $('#canvas').attr("width")/2;

        let doubleDivisionRange = svgGraph.querySelector('#x-division3').getAttribute("x1")-
            svgGraph.querySelector('#x-division2').getAttribute("x1");

        numValueX = (event.offsetX - halfCanvas)/doubleDivisionRange * numValueR;
        if (numValueX<X_MIN) numValueX = X_MIN + 0.00000000001;
        if (numValueX>X_MAX) numValueX = X_MAX - 0.00000000001;

        let yCanvasValue = (-event.offsetY + halfCanvas)/doubleDivisionRange * numValueR;
        let min = Infinity;


        for (let i = 0; i < Y_VALUES.length; i++){
            if (Math.abs(yCanvasValue-Y_VALUES[i])< min){
                min = Math.abs(yCanvasValue-Y_VALUES[i]);
                numValueY = Y_VALUES[i];
            }
        }

        drawPoint(numValueX/numValueR*doubleDivisionRange+halfCanvas, -(numValueY/numValueR*doubleDivisionRange-halfCanvas));

        $("#x-textinput").removeClass('text-error');
        $('.y-buttons input').removeClass('button-error');

        $("#x-textinput").val(numValueX.toString().substring(0,10));
        $('.y-buttons input').removeClass('button-clicked');
        switch (numValueY) {
            case -3:
                $('#y-button-1').addClass('button-clicked');
                break
            case -2:
                $('#y-button-2').addClass('button-clicked');
                break;
            case -1:
                $('#y-button-3').addClass('button-clicked');
                break;
            case 0:
                $('#y-button-4').addClass('button-clicked');
                break;
            case 1:
                $('#y-button-5').addClass('button-clicked');
                break;
            case 2:
                $('#y-button-6').addClass('button-clicked');
                break;
            case 3:
                $('#y-button-7').addClass('button-clicked');
                break;
            case 4:
                $('#y-button-8').addClass('button-clicked');
                break;
            case 5:
                $('#y-button-9').addClass('button-clicked');
                break;
        }
    });

    function drawFromForm(){

        let svgGraph = document.querySelector('.areas').getSVGDocument();

        let halfCanvas = $('#canvas').attr("width")/2;

        let doubleDivisionRange = svgGraph.querySelector('#x-division3').getAttribute("x1")-
            svgGraph.querySelector('#x-division2').getAttribute("x1");

        if (checkX() & checkY() & checkR()){
            drawPoint(
                numValueX / numValueR * doubleDivisionRange + halfCanvas,
                -(numValueY / numValueR * doubleDivisionRange -halfCanvas)
            )
        } else {
            clearCanvas();
        }
    }

    function drawPoint(x,y) {
        clearCanvas();
        let ctx = canvas[0].getContext("2d");
        ctx.beginPath();
        ctx.arc(x,y,2,0,Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    function clearCanvas() {
        canvas[0].getContext('2d').clearRect(0, 0, canvas.width(), canvas.height());
    }

    $('#x-textinput').on('input', () =>{drawFromForm()});


    $('#submit-button').on('click', function(event){

        if(!(checkX() && checkY() && checkR())) {
            event.preventDefault();
        } else{
            $('.hidden_y').val(numValueY.toString());
            $('.hidden_timezone').val(new Date().getTimezoneOffset());
            let s = $('.hidden_record').val()+1;
            $('.hidden_record').val(s);
        }
    });


    $('#reset-button').on('click', function(event){
        numValueX = undefined;
        numValueY = undefined;
        numValueR = undefined;
        $('#x-textinput').removeClass('text-error')
        $('.y-buttons input').removeClass('button-error')
        $('.rbox-label').removeClass('checkbox-error')
        $('.y-buttons input').removeClass('button-clicked')

        let svgGraph = document.querySelector('.areas').getSVGDocument();
        svgGraph.querySelector('.coordinate-text_minus-Rx').textContent = '-R'
        svgGraph.querySelector('.coordinate-text_minus-Ry').textContent = '-R';
        svgGraph.querySelector('.coordinate-text_minus-half-Rx').textContent = '-R/2';
        svgGraph.querySelector('.coordinate-text_minus-half-Ry').textContent = '-R/2';
        svgGraph.querySelector('.coordinate-text_plus-Rx').textContent = 'R';
        svgGraph.querySelector('.coordinate-text_plus-Ry').textContent = 'R';
        svgGraph.querySelector('.coordinate-text_plus-half-Rx').textContent = 'R/2';
        svgGraph.querySelector('.coordinate-text_plus-half-Ry').textContent = 'R/2';
        clearCanvas();

        $('.hidden_clear').val('true');
    });
});





