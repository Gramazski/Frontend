/**
 * Created by gs on 19.03.2017.
 */
var commonModule = (function () {
    var setAnimate, flag = 0;

    function my_animat()
    {
        var animate_conteiner = $('#animate-conteiner'),
            t = 0,
            H = 128, // Высота кадра и самого контейнера
            sprH = 3840, // Высота спрайта
            speed = 25; // Скорость анимации

        if(flag == 0)
        {
            flag = 1;

            setAnimate = setInterval(function(){

                t += H;
                if(t == sprH) t = 0;
                animate_conteiner.css({'background-position':'0 -'+t+'px'});

            }, speed);
        }
    }


    function stop_animat()
    {

        if(flag == 1)
        {
            flag = 0;
            clearInterval(setAnimate);
        }
    }


    $(function(){

        my_animat();


        // Запуск анимации
        $('#btn-start').click(function(e) {
            my_animat();
        });


        // Остантовка анимации
        $('#btn-stop').click(function(e) {
            stop_animat();
        });

    });
    return {

        closeMessageModal : function () {
            $('.close').click();
        },
        setActiveInMessageList : function () {
            $('#inMessages').addClass("active");
            $('#outMessages').removeClass("active");
        },
        setActiveOutMessageList : function () {
            $('#outMessages').addClass("active");
            $('#inMessages').removeClass("active");
        },
        updateMessagesList : function () {
            if ($('#inMessages').hasClass("active")){
                $('#inMessages').click();
            }
            else {
                $('#outMessages').click();
            }
        },
        updateChat : function () {
            $('#gameId').click();
        },
        resetFormIn : function (formName) {
            $(formName)[0].reset();
        },
        getFieldPos : function () {
            var fieldPos = {};
            var target = document.getElementById('imgField');
            fieldPos.width = target.width;
            fieldPos.height = target.height;

            return fieldPos;
        },
        setBet : function (x, y, width, type) {
            var parent = document.getElementById('imgTable');
            var target = document.createElement("img");
            target.src ="craps/bet.jpg";
            target.id = type;
            target.ngClick = "removeBet(" + type + ")";
            target.style.position = "absolute";
            target.style.left = x + 'px';
            target.style.top =y + 'px';
            target.style.width = width + 'px';

            parent.appendChild(target);
        },
        removeBet : function (type) {
            var parent = document.getElementById('imgTable');
            var target = document.getElementById(type);

            parent.removeChild(target);
        },
        setAreaWidth : function (areas, bets) {
            var field = document.getElementById('imgField');
            var i;
            for (i = 0; i < areas.length; i++){
                var newCoords = [];
                for (var y = 0; y < areas[i].coordsSt.length; y++){
                    if (y % 2 == 0){
                        newCoords[y] = Math.round( areas[i].coordsSt[y] * field.width);
                    }
                    else {
                        newCoords[y] = Math.round( areas[i].coordsSt[y] * field.height);
                    }
                }

                areas[i].coords = newCoords;
                areas[i].width = areas[i].widthSt * field.width;
            }

            for (i = 0; i < bets.length; i++){
                var target = document.getElementById(bets[i].type);
                target.style.left = bets[i].position.x * field.width + 'px';
                target.style.top =bets[i].position.y * field.height + 'px';
                target.style.width = bets[i].position.width * field.width + 'px';
            }
        }
    }
})();