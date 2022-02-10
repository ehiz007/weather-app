import Head from "next/head";
import { useState } from "react";
import moment from "moment";

export default function Home() {
  const [address, setAddress] = useState("");
  const [temperature, setTemperature] = useState("---");
  const [location, setLocation] = useState("no location");
  const [time, setTime] = useState("-- --");
  const [img, setImg] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (address === "" || null || address.length < 2) {
      setLoading(false);

      return setError("Please enter a valid location !!!");
    }
    setError(false);
    fetch(`/api/weather?address=${address}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.temperature) {
          setTemperature(response.temperature);
          setLocation(response.location);
          setImg(response.icons);
          setSummary(response.summary);
          setTime(response.time);
          setLoading(false);
          setAddress("");
        } else {
          setError(true);
          setLoading(false);
          throw new Error("error");
        }
      })
      .catch((e) => {
        setError(true);
      });
  };

  return (
    <div className=" p-2">
      <Head>
        <title>Weather App</title>
        <meta name="description" content="weather app" />
        <link rel="icon" href="/rain.png" />
      </Head>
      {/* Header */}
      <div className="py-4">
        <div className="flex items-center justify-center">
          <img className="h-14 w-14" src="/rain.png" />
          <h1 className="text-3xl text-center flex font-Quin">
            <span className="text-blue-600">Weather</span> App
          </h1>
        </div>
      </div>

      <main className="max-w-xl mx-auto mt-3  px-4 py-3">
        <div className="flex items-center justify-center text-center">
          <p className="text-red-600 -mt-2">{error}</p>
        </div>
        {/* Search Form */}
        <form className=" max-w-2xl  p-2 mx-auto" onSubmit={submit}>
          <div className="flex w-10/12 mx-auto p-2 text-center border-b-2 hover:border-blue-500">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="text-center outline-none flex-1"
              placeholder="Enter location name / lat / long"
            />
            <button>
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 50 50"
              >
                <path d="M 21 3 C 11.654545 3 4 10.654545 4 20 C 4 29.345455 11.654545 37 21 37 C 24.701287 37 28.127393 35.786719 30.927734 33.755859 L 44.085938 46.914062 L 46.914062 44.085938 L 33.875 31.046875 C 36.43682 28.068316 38 24.210207 38 20 C 38 10.654545 30.345455 3 21 3 z M 21 5 C 29.254545 5 36 11.745455 36 20 C 36 28.254545 29.254545 35 21 35 C 12.745455 35 6 28.254545 6 20 C 6 11.745455 12.745455 5 21 5 z"></path>
              </svg>
            </button>
          </div>
        </form>
        {/* Display section */}
        <div className="px-2">
          {loading && (
            <p className="text-center flex items-center justify-center space-x-3">
              <span>Loading</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </span>
            </p>
          )}
        </div>
        <div className="container bg-black rounded text-white py-9 px-6 md:px-12 mt-10 shadow-2xl">
          {/* Time */}
          <div className="flex justify-between items-center ">
            <h1 className="text-2xl">Today</h1>
            <h1 className="text-base flex flex-col">
              <span>
                {time !== "-- --"
                  ? moment(time).format("ddd, D MMM")
                  : moment().format("ddd, D MMM")}
              </span>
              <span>
                {time !== "-- --"
                  ? moment(time).format("h:mm a")
                  : moment().format("h:mm a")}
              </span>
            </h1>
          </div>
          {/* Weather information */}
          <div className="flex justify-evenly items-center mt-5 ">
            <div className="relative">
              <h1 className="font-bold text-6xl ">{temperature}</h1>
              <span className="absolute top-0 -right-4 text-xl">℃</span>
            </div>
            <div className="items-center">
              {img !== "" ? (
                <img src={img} className="w-14 h-14" />
              ) : (
                <img src="/clouds.svg" className="w-20 h-20" />
              )}
            </div>
          </div>
          {/* Weather summary */}
          <div className="mt-10 flex items-center">
            <p className="text-base">{summary}</p>
          </div>
          {/* Location information */}
          <div className="mt-10 flex items-center">
            <img src="/location.svg" className="h-14 w-14" />
            <p className="text-yellow-500">{location}</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute lg:relative mt-5 bottom-0 w-full">
        <div className="flex items-center px-10 py-6 justify-center max-w-5xl mx-auto border-t border-black ">
          <a
            href="https://twitter.com/ehiz_briel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex items-center hover:scale-110 ease-in-out transform duration-100">
              Designed by
              <svg
                className="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#03A9F4"
                  d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
                ></path>
              </svg>
              ehiz_briel
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}
