import React from "react";
import CurrencyFormat from "react-currency-format";

const CurrencyFormater = ({ value }) => {
    return (
        <CurrencyFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
        />
    );
};

export default CurrencyFormater;
