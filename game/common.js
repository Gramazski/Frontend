/**
 * Created by gs on 19.03.2017.
 */
var commonModule = (function () {
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
        setBet : function (x, y, width) {
            var field = document.getElementById('imgField');
            var target = document.getElementById('imgBet');
            target.style.left = x + 'px';
            target.style.top =y + 'px';
            target.style.width = width + 'px';
        },
        setAreaWidth : function (areas, prev) {
            var field = document.getElementById('imgField');
            for (var i = 0; i < areas.length; i++){
                var newCoords = [];
                for (var y = 0; y < prev[i].coords.length; y++){
                    if (y % 2 == 0){
                        newCoords[y] = Math.round( prev[i].coords[y] * field.width);
                    }
                    else {
                        newCoords[y] = Math.round( prev[i].coords[y] * field.height);
                    }

                }

                areas[i].coords = newCoords;
                areas[i].width = prev[i].width * field.width;
            }
        }
    }
})();