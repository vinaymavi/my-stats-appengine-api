/**
 * File to check duration selection and pass selected duration to modules.
 * Will trigger on event on every duration change.
 */
"use strict";
var myDur = (function () {
    var myDur = {};
    var startDate,
        endDate;
    var EVENT_DURATION_CHANGE = jQuery.Event(myConfig.EVENT_DURATION_CHANGE_NAME);

    function addDatePicker() {
        if ($(".date-picker").length > 0) {
            $("#date-picker-1").datepicker({});
            $("#date-picker-2").datepicker({});
            $(".date-picker").on("click", function (event) {
                event.preventDefault();
                event.stopImmediatePropagation();
                event.stopPropagation();
            })
        }
    }

    function checkAndUpdateDuration(days) {
        endDate = moment().add(1, 'days').utc().format(myConfig.API_DATE_FORMAT);
        startDate = moment().subtract(days - 1, 'days').utc().format(myConfig.API_DATE_FORMAT);
        EVENT_DURATION_CHANGE.startDate = startDate;
        EVENT_DURATION_CHANGE.endDate = endDate;
        jQuery('body').trigger(EVENT_DURATION_CHANGE);
    }

    function init() {

        /**
         * TODO will consider after 3 months.
         *addDatePicker();
         */

        jQuery('.time-selection-controls button[data-days]').on('click', function () {
            console.log(this);
            var _button = jQuery(this);
            _button.siblings().removeClass('btn-primary');
            _button.siblings().addClass('btn-outline-primary');
            _button.removeClass("btn-outline-primary");
            _button.addClass("btn-primary");
            checkAndUpdateDuration(_button.data('days'));
        });
    }

    myDur.init = init;
    jQuery('body').on(myConfig.EVENT_APPLICATION_LOADED_NAME, function () {
        if (jQuery('#my-chart,.reporting').length > 0) {
            init();
        }
    });
    return myDur;
}());
