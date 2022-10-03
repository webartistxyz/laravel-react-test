import React, { useState } from "react";
import "./table.css";
import CurrencyFormater from "./CurrencyFormater";

function DataTable({ headers, reservations, sortedReservation, totalData }) {
    const [query, setQuery] = useState({
        sort_by: "id",
        order_by: "DESC",
    });

    const [orderBy, setOrderBy] = useState(false);

    const handleSort = (sortKey) => {
        setOrderBy((prev) => !prev);
        if (orderBy) {
            setQuery({
                sort_by: sortKey,
                order_by: "ASC",
            });
        }
        if (!orderBy) {
            setQuery({
                sort_by: sortKey,
                order_by: "DESC",
            });
        }
        sortReservations(sortKey);
    };

    const sortReservations = (sortKey) => {
        const sorted = [...reservations].sort((a, b) => {
            if (typeof sortKey === "object") {
                let aData = a[sortKey.objName][sortKey.key]
                    ? a[sortKey.objName][sortKey.key]
                    : 0;
                let bData = b[sortKey.objName][sortKey.key]
                    ? b[sortKey.objName][sortKey.key]
                    : 0;
                return (
                    aData.toString().localeCompare(bData.toString(), "en", {
                        numeric: true,
                    }) * (query.order_by === "ASC" ? 1 : -1)
                );
            } else {
                let aSort = a[sortKey] ? a[sortKey] : 0;
                let bSort = b[sortKey] ? b[sortKey] : 0;
                return (
                    aSort.toString().localeCompare(bSort.toString(), "en", {
                        numeric: true,
                    }) * (query.order_by === "ASC" ? 1 : -1)
                );
            }
        });

        sortedReservation(sorted);
    };

    return (
        <div className="table-responsive" style={{ height: "50vh" }}>
            <table className="table">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th scope="col" key={index}>
                                <div
                                    className="d-flex flex-row"
                                    style={{
                                        cursor: header.sort && "pointer",
                                    }}
                                    onClick={() => handleSort(header.name)}
                                >
                                    <span>{header.title}</span>
                                    {header.sort && (
                                        <div className="ms-2">
                                            {header.name != query.sort_by && (
                                                <i
                                                    style={{
                                                        color: "#d0e1e1",
                                                    }}
                                                    className="fa fa-sort"
                                                ></i>
                                            )}

                                            {header.name == query.sort_by &&
                                                query.order_by == "ASC" && (
                                                    <i
                                                        style={{
                                                            color: "#d0e1e1",
                                                        }}
                                                        className="fa fa-sort-amount-desc"
                                                    ></i>
                                                )}

                                            {header.name == query.sort_by &&
                                                query.order_by == "DESC" && (
                                                    <i
                                                        style={{
                                                            color: "#d0e1e1",
                                                        }}
                                                        className="fa fa-sort-amount-asc"
                                                    ></i>
                                                )}
                                        </div>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation, index) => (
                        <tr key={index}>
                            <td>{reservation.listing.nickname}</td>
                            <td>{reservation.checkIn}</td>
                            <td>{reservation.checkOut}</td>
                            <td>{reservation.nightsCount}</td>
                            <td>{reservation.guest.fullName}</td>
                            <td>{reservation.source}</td>
                            <td>{reservation.created_at}</td>
                            <td>
                                <CurrencyFormater
                                    value={reservation.money.netIncome}
                                />
                            </td>
                            <td>{reservation.confirmedAt}</td>
                            <td>
                                <CurrencyFormater
                                    value={reservation.money.fareAccommodation}
                                />
                            </td>
                            <td>
                                <CurrencyFormater
                                    value={reservation.money.fareCleaning}
                                />
                            </td>
                            <td>
                                <CurrencyFormater
                                    value={reservation.money.totalTaxes}
                                />
                            </td>
                            <td>
                                <CurrencyFormater
                                    value={
                                        reservation.money
                                            .fareAccommodationAdjustment
                                    }
                                />
                            </td>
                            <td>
                                <CurrencyFormater
                                    value={
                                        reservation.money
                                            .fareAccommodationDiscount
                                    }
                                />
                            </td>
                            <td></td>
                            <td>
                                <CurrencyFormater
                                    value={reservation.money.hostServiceFee}
                                />
                            </td>
                            <td>
                                <CurrencyFormater
                                    value={reservation.money.balanceDue}
                                />
                            </td>
                            <td>
                                <CurrencyFormater
                                    value={reservation.money.totalPaid}
                                />
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <CurrencyFormater
                                value={totalData.total_net_income}
                            />
                        </td>
                        <td></td>
                        <td>
                            <CurrencyFormater
                                value={totalData.total_accom_fare}
                            />
                        </td>
                        <td>
                            <CurrencyFormater
                                value={totalData.total_clean_fare}
                            />
                        </td>
                        <td>
                            <CurrencyFormater value={totalData.total_tax} />
                        </td>
                        <td>
                            <CurrencyFormater value={totalData.total_adj} />
                        </td>
                        <td>
                            <CurrencyFormater value={totalData.total_dsc} />
                        </td>
                        <td></td>
                        <td>
                            <CurrencyFormater
                                value={totalData.total_host_fee}
                            />
                        </td>
                        <td>
                            <CurrencyFormater
                                value={totalData.total_balance_due}
                            />
                        </td>
                        <td>
                            <CurrencyFormater value={totalData.total_paid} />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default DataTable;
