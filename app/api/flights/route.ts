import { NextRequest, NextResponse } from 'next/server';

function generateFlights(from: string, to: string, date: string) {
  // Return example data, can be dynamic
  return [
    {
      flight: 'ZH9890',
      airline: 'Shenzhen Airlines',
      departure: '06/15 14:00',
      arrival: '06/15 18:00',
      duration: '4h',
      price: '¥1154',
      seats: 55,
    },
    {
      flight: 'ZH6157',
      airline: 'Shenzhen Airlines',
      departure: '06/15 19:00',
      arrival: '06/15 23:00',
      duration: '4h',
      price: '¥2299',
      seats: 55,
    },
    {
      flight: 'CA7967',
      airline: 'Air China',
      departure: '06/16 00:00',
      arrival: '06/16 03:00',
      duration: '3h',
      price: '¥942',
      seats: 72,
    },
    {
      flight: '3U2496',
      airline: 'Sichuan Airlines',
      departure: '06/16 00:00',
      arrival: '06/16 04:00',
      duration: '4h',
      price: '¥1969',
      seats: 96,
    },
  ];
}

export async function POST(req: NextRequest) {
  const { from, to, date } = await req.json();
  const flights = generateFlights(from, to, date);
  const markdownHeader = `| Flight No. | Airline | Departure Time | Arrival Time | Duration | Price | Seats Left |\n|:-----------|:-------------------|:---------------|:-------------|:---------|:-------|:-----------|`;
  const markdownRows = flights.map(f =>
    `| ${f.flight} | ${f.airline} | ${f.departure} | ${f.arrival} | ${f.duration} | ${f.price} | ${f.seats} |`
  ).join('\n');
  const markdown = `${markdownHeader}\n${markdownRows}`;
  return NextResponse.json({
    raw: flights,
    markdown,
    type: 'markdown',
    desc: `Here are the available flights from ${from} to ${to} on ${date}.`
  });
} 