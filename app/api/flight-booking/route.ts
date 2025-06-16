import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { flightNo, name, contact } = await req.json();

  // Fail if any field is missing
  if (!flightNo || !name || !contact) {
    const raw = { status: "failed", reason: "Missing required fields" };
    const markdown = `| Field  | Value              |\n|:-------|:-------------------|\n| Status | failed             |\n| Reason | Missing required fields |`;
    return NextResponse.json({
      raw,
      markdown,
      type: "markdown",
      desc: "Sorry, your booking failed due to: Missing required fields. Please check your input."
    });
  }

  // Success
  const bookingId = "BK" + Date.now();
  const raw = {
    bookingId,
    flightNo,
    name,
    contact,
    status: "success"
  };
  const markdown = `| Field      | Value           |\n|:-----------|:----------------|\n| Booking ID | ${bookingId}    |\n| Flight No. | ${flightNo}     |\n| Name       | ${name}         |\n| Contact    | ${contact}      |\n| Status     | success         |`;
  return NextResponse.json({
    raw,
    markdown,
    type: "markdown",
    desc: `Your booking was successful!\n- Booking ID: ${bookingId}\n- Flight No.: ${flightNo}\n- Name: ${name}\n- Contact: ${contact}\n\nPlease keep your booking ID for check-in and inquiries.`
  });
} 