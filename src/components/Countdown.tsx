"use client";
import React from "react";
import Countdown from "react-countdown";

// const endDate = new Date("2023-07-25");

export default function Countdowns() {
  return (
    <Countdown
      className="font-bold text-5xl text-yellow-300"
      date={Date.now() + 10000000}
    />
  );
}
