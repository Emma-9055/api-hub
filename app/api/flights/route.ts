import { NextRequest, NextResponse } from 'next/server';

function generateFlights(from: string, to: string, date: string) {
  const airlines = ['中国国航', '东方航空', '南方航空', '海南航空'];
  const flights = [];
  for (let i = 0; i < 3; i++) {
    const depHour = 8 + i * 2;
    const arrHour = depHour + 2;
    flights.push({
      flight: `CA10${i}`,
      airline: airlines[i % airlines.length],
      from,
      to,
      departure: `${date}T${depHour.toString().padStart(2, '0')}:00:00`,
      arrival: `${date}T${arrHour.toString().padStart(2, '0')}:00:00`,
    });
  }
  return flights;
}

export async function POST(req: NextRequest) {
  const { from, to, date } = await req.json();
  const flights = generateFlights(from, to, date);
  const markdownRows = flights.map(f => `| 航班号 | ${f.flight} |\n| 航司 | ${f.airline} |\n| 出发地 | ${f.from} |\n| 目的地 | ${f.to} |\n| 起飞时间 | ${f.departure} |\n| 到达时间 | ${f.arrival} |`).join('\n---\n');
  const markdown = `| 字段 | 信息 |\n|:-----|:-----|\n${markdownRows}`;
  return NextResponse.json({
    raw: flights,
    markdown,
    type: 'markdown',
    desc: `以下是${from}到${to}，${date}的航班信息，供参考。`
  });
} 