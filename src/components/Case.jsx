import React from "react";
import Navbar from "./Navbar";

export default function Case({ children }) {
    return (
        <div className="bg-gray-900 drak:bg-gray-900 min-h-screen">
        <Navbar />
        <section>{children}</section>
        </div>
    );
}