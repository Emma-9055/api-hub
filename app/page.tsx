import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">API Feature List</h1>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <a
          href="/flight-test"
          className="w-full px-4 py-3 rounded bg-blue-600 text-white text-center font-semibold shadow hover:bg-blue-700 transition"
        >
          Flight Search Test
        </a>
        {/* Add more API entries here in the future */}
      </div>
    </div>
  );
}
