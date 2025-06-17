import { NextRequest, NextResponse } from 'next/server';

function generateFlights(from: string, to: string, date: string) {
  const queryDate = new Date(date);
  const formatDate = (d: Date) => `${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getDate().toString().padStart(2,'0')}`;
  const formatTime = (hours: number, minutes: number = 0) => `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`;
  
  // 生成到达时间（加上飞行时长）
  const getArrivalTime = (depHour: number, depMin: number, durationHours: number) => {
    const arrivalDate = new Date(queryDate);
    arrivalDate.setHours(depHour + durationHours, depMin);
    
    // 如果跨天了，显示第二天日期
    if (arrivalDate.getDate() !== queryDate.getDate()) {
      return `${formatDate(arrivalDate)} ${formatTime(arrivalDate.getHours(), arrivalDate.getMinutes())}`;
    } else {
      return `${formatDate(queryDate)} ${formatTime(arrivalDate.getHours(), arrivalDate.getMinutes())}`;
    }
  };

  return [
    {
      flight: 'ZH9890',
      airline: 'Shenzhen Airlines',
      departure: `${formatDate(queryDate)} ${formatTime(14, 0)}`,
      arrival: getArrivalTime(14, 0, 4),
      duration: '4h',
      price: '¥1154',
      seats: 55,
    },
    {
      flight: 'ZH6157',
      airline: 'Shenzhen Airlines',
      departure: `${formatDate(queryDate)} ${formatTime(19, 0)}`,
      arrival: getArrivalTime(19, 0, 4),
      duration: '4h',
      price: '¥2299',
      seats: 55,
    },
    {
      flight: 'CA7967',
      airline: 'Air China',
      departure: `${formatDate(queryDate)} ${formatTime(8, 30)}`,
      arrival: getArrivalTime(8, 30, 3),
      duration: '3h',
      price: '¥942',
      seats: 72,
    },
    {
      flight: '3U2496',
      airline: 'Sichuan Airlines',
      departure: `${formatDate(queryDate)} ${formatTime(22, 0)}`,
      arrival: getArrivalTime(22, 0, 4),
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