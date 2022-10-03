import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import DataTable from "./DataTable";
import { DatePicker } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import moment from "moment/moment";
import ReactLoading from "react-loading";
import CurrencyFormater from "./CurrencyFormater";
const ReservationTable = () => {
    const [headers, setHeaders] = useState([
        {
            title: "LISTINGS NICKNAME",
            name: { objName: "listing", key: "nickname" },
            sort: true,
        },
        { title: "CHECK IN", name: "checkIn", sort: true },
        { title: "CHECK OUT", name: "checkOut", sort: true },
        { title: "NIGHTS", name: "nightsCount", sort: true },
        {
            title: "GUESTS NAME",
            name: { objName: "guest", key: "fullName" },
            sort: true,
        },
        { title: "SOURCE", name: "source", sort: true },
        { title: "CREATION DATE", name: "created_at", sort: true },
        {
            title: "NET INCOME",
            name: { objName: "money", key: "netIncome" },
            sort: true,
        },
        { title: "CONF DATE", name: "confirmedAt", sort: true },
        {
            title: "ACCOMM FARE",
            name: { objName: "money", key: "fareAccommodation" },
            sort: true,
        },

        {
            title: "CLEAN FARE",
            name: { objName: "money", key: "fareCleaning" },
            sort: true,
        },
        {
            title: "TAX",
            name: { objName: "money", key: "totalTaxes" },
            sort: true,
        },
        {
            title: "ADJ",
            name: { objName: "money", key: "fareAccommodationAdjustment" },
            sort: true,
        },
        {
            title: "DISC",
            name: { objName: "money", key: "fareAccommodationDiscount" },
            sort: true,
        },
        {
            title: "CNCL FEE",
            name: { objName: "money", key: "fareAccommodation" },
            sort: true,
        },
        {
            title: "HOST FEE",
            name: { objName: "money", key: "hostServiceFee" },
            sort: true,
        },
        {
            title: "BALANCE DUE",
            name: { objName: "money", key: "balanceDue" },
            sort: true,
        },
        {
            title: "TOTAL PAID",
            name: { objName: "money", key: "totalPaid" },
            sort: true,
        },
    ]);

    const [reservations, setReservations] = useState([]);
    const [totalData, setTotalData] = useState([]);
    const [presentMonth, setPresentMonth] = useState(
        moment(new Date(), monthFormat)
    );
    const [loader, setLoader] = useState(false);
    const [allReservations, setAllReservations] = useState([]);
    const loaderStyle = { position: "absolute", top: "50%", left: "50%" };

    useEffect(() => {
        if (!presentMonth) {
            return;
        }
        setLoader(true);
        axios
            .get("http://127.0.0.1:8000/reservation-data", {
                params: { presentMonth },
            })
            .then((response) => {
                setReservations(response.data.reservations);
                setTotalData(response.data.totalData);
                setAllReservations(response.data);
                setLoader(false);
            });
    }, [presentMonth]);

    const sortedReservation = (sortedData) => {
        setReservations(sortedData);
    };

    const handleChange = (date, dateString) => {
        setPresentMonth(dateString);
    };
    const monthFormat = "YYYY-MM";

    return (
        <div className="container-fluid mt-5">
            {loader && (
                <div style={loaderStyle}>
                    <ReactLoading
                        type="spin"
                        color="gray"
                        height={150}
                        width={150}
                    />
                </div>
            )}

            <div className="row">
                <div className="mb-2">
                    <h6>Filter</h6>
                    <DatePicker
                        onChange={handleChange}
                        picker="month"
                        defaultValue={presentMonth}
                    />
                </div>
                {reservations.length > 0 && (
                    <div>
                        <div className="col-md-12">
                            <DataTable
                                headers={headers}
                                reservations={reservations}
                                totalData={totalData}
                                sortedReservation={sortedReservation}
                            />
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-6">
                                <p>Subtotal Aerie</p>
                                <h6>
                                    <CurrencyFormater
                                        value={
                                            allReservations.subtotal_by_listings
                                                .aerie
                                        }
                                    />
                                </h6>
                                <p>Subtotal 20260</p>
                                <h6>
                                    <CurrencyFormater
                                        value={
                                            allReservations
                                                .subtotal_by_listings[20260]
                                        }
                                    />
                                </h6>
                                <p>Subtotal 304</p>
                                <h6>
                                    <CurrencyFormater
                                        value={
                                            allReservations
                                                .subtotal_by_listings[304]
                                        }
                                    />
                                </h6>
                                <p>Total </p>
                                <h6>
                                    <CurrencyFormater
                                        value={allReservations.totalOfListing}
                                    />
                                </h6>
                            </div>
                            <div className="col-md-6">
                                <p>Aerie (non Airbnb revenue) </p>
                                <h6>
                                    <CurrencyFormater
                                        value={allReservations.non_airbnb}
                                    />
                                </h6>
                                <p>Aerie Sales Tax</p>
                                <h6>
                                    <CurrencyFormater
                                        value={allReservations.aerie_sales_tax}
                                    />
                                </h6>
                                <p>Aerie Surtax</p>
                                <h6>
                                    <CurrencyFormater
                                        value={allReservations.aerie_surtax}
                                    />
                                </h6>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ReservationTable;
// DOM element
if (document.getElementById("reservation-table")) {
    ReactDOM.render(
        <ReservationTable />,
        document.getElementById("reservation-table")
    );
}
