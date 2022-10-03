<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ReservationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $presentData = explode('-', $request->presentMonth);
        $year = filter_var($presentData[0], FILTER_SANITIZE_NUMBER_INT);
        $month = filter_var($presentData[1], FILTER_SANITIZE_NUMBER_INT);
        $reservations =  Reservation::whereYear('created_at', '=', $year)->whereMonth('created_at', '=', $month)->get();

        $totalData = [
            'total_net_income' => $reservations->sum(fn ($reservation) => optional($reservation->money)->netIncome),
            'total_accom_fare' => $reservations->sum(fn ($reservation) => optional($reservation->money)->fareAccommodation),
            'total_clean_fare' => $reservations->sum(fn ($reservation) => optional($reservation->money)->fareCleaning),
            'total_tax' => $reservations->sum(fn ($reservation) => optional($reservation->money)->totalTaxes),
            'total_adj' => $reservations->sum(fn ($reservation) => optional($reservation->money)->fareAccommodationAdjustment),
            'total_dsc' => $reservations->sum(fn ($reservation) => optional($reservation->money)->fareAccommodationDiscount),
            'total_host_fee' => $reservations->sum(fn ($reservation) => optional($reservation->money)->hostServiceFee),
            'total_balance_due' => $reservations->sum(fn ($reservation) => optional($reservation->money)->balanceDue),
            'total_paid' => $reservations->sum(fn ($reservation) => optional($reservation->money)->totalPaid)
        ];

        $subtotalByListings = [
            'aerie' => $reservations->sum(function ($reservation) {
                if (Str::contains(optional($reservation->listing)->nickname, 'Aerie')) {
                    return optional($reservation->money)->netIncome;
                }
            }),
            '20260' => $reservations->sum(function ($reservation) {
                if (Str::contains(optional($reservation->listing)->nickname, '20260')) {
                    return optional($reservation->money)->netIncome;
                }
            }),
            '304' => $reservations->sum(function ($reservation) {
                if (Str::contains(optional($reservation->listing)->nickname, '304')) {
                    return optional($reservation->money)->netIncome;
                }
            })
        ];
        $nonAirbnb = $reservations->sum(function ($reservation) {
            if (Str::contains(optional($reservation->listing)->nickname, 'Aerie') && $reservation->source !== 'airbnb2') {
                return optional($reservation->money)->netIncome;
            }
        });

        return [
            'reservations' => $reservations->toArray(), 'totalData' => $totalData, 'subtotal_by_listings' => $subtotalByListings,
            'totalOfListing' => collect($subtotalByListings)->sum(), 'non_airbnb' => $nonAirbnb, 'aerie_sales_tax' => ($nonAirbnb * .07), 'aerie_surtax' => ($nonAirbnb * .01)
        ];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function show(Reservation $reservation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reservation $reservation)
    {
        //
    }
}
