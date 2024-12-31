import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [term, setTerm] = useState("Jakarta");
  const [data, setData] = useState({});
  const jadwalSholat = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  useEffect(() => {
    fetch(`http://api.aladhan.com/v1/timingsByAddress?address=${term}`)
      .then((res) => res.json())
      .then((res) => setData(res.data));
  }, [term]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('./assets/bgpoto.jpg')] bg-cover bg-center text-white px-4">
      {/* Header */}
      <div className="w-full max-w-[800px] text-center mb-8">
        <h1 className="text-4xl font-extrabold  text-cyan-700 drop-shadow-lg">
          Jadwal Sholat Harian
        </h1>
        <p className="mt-2 text-lg text-cyan-700">Cari berdasarkan kota Anda</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTerm(input);
          setInput("");
        }}
        className="flex flex-col items-center gap-3 w-full max-w-[400px] mb-10"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Masukkan Kota Anda"
          className="w-full py-3 px-5 rounded-full text-[16px] text-gray-700 outline-none focus:shadow-lg focus:bg-white/90 focus:text-black"
        />
        <button
          type="submit"
          className="w-[150px] py-2 bg-gradient-to-r from-red-950 to-red-500 text-white font-bold rounded-full shadow-md hover:scale-105 transition duration-300"
        >
          Cari
        </button>
      </form>

      {/* Jadwal Sholat */}
      <div className="w-full max-w-[400px] bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-5">
        <h2 className="text-center font-bold text-lg mb-4  text-cyan-700">
          Jadwal Sholat di {term}
        </h2>
        <ul>
          {data &&
            jadwalSholat.map((p, index) => (
              <li
                key={p}
                className={`flex justify-between items-center p-3 rounded-lg transition duration-300 ${
                  index % 2 === 0
                    ? "bg-gradient-to-r from-[#5e4334] to-slate-500"
                    : "bg-gradient-to-r from-slate-500 to[#5e4334]"
                } text-white hover:scale-105 mb-2`}
              >
                <span className="font-medium">{p}</span>
                <span className="font-extrabold">
                  {data?.timings?.[`${p}`] || "N/A"}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
