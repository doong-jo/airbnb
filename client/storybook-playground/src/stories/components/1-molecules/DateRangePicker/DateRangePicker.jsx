import React, { useState } from "react";
import PropTypes from "prop-types";
import momentPropTypes from "react-moment-proptypes";
import moment from "moment";

import { DateRangePicker } from "react-dates";
import isInclusivelyAfterDay from "./utils/isInclusivelyAfterDay";

const propTypes = {
    autoFocus: PropTypes.bool,
    autoFocusEndDate: PropTypes.bool,
    initialStartDate: momentPropTypes.momentObj,
    initialEndDate: momentPropTypes.momentObj
};

const defaultProps = {
    startDateId: "startDate",
    startDatePlaceholderText: "Start Date",
    endDateId: "endDate",
    endDatePlaceholderText: "End Date",
    numberOfMonths: 2,
    minimumNights: 1,
    isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
    displayFormat: () => moment.localeData().longDateFormat("L"),
    monthFormat: "MMMM YYYY"
};

function DateRangePickerWrapper(props) {
    let focusedInputValue = null;
    if (props.autoFocus) {
        focusedInputValue = "startDate";
    } else if (props.autoFocusEndDate) {
        focusedInputValue = "endDate";
    }

    const [focusedInput, setFocusedInput] = useState(focusedInputValue);
    const [startDate, setStartDate] = useState(props.initialStartDate);
    const [endDate, steEndDate] = useState(props.initialEndDate);

    function onDatesChange({ startDate, endDate }) {
        setStartDate(startDate);
        steEndDate(endDate);
    }

    function onFocusChange(focusedInput) {
        setFocusedInput(focusedInput);
    }

    return (
        <div>
            <DateRangePicker
                {...props}
                onDatesChange={onDatesChange}
                onFocusChange={onFocusChange}
                focusedInput={focusedInput}
                startDate={startDate}
                endDate={endDate}
            />
        </div>
    );
}

DateRangePickerWrapper.propTypes = propTypes;
DateRangePickerWrapper.defaultProps = defaultProps;

export default DateRangePickerWrapper;
