import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const URL = `http://localhost/api/hospital`;
const Hospital = () => {
  const [hospitals, setHospitals] = useState([]);

  const router = useRouter();

  useEffect(() => {
    getHospital();
  }, []);

  const getHospital = async () => {
    return await axios.get(URL).then((res) => {
      if (res.data) {
        setHospitals(res.data);
      }
    });
  };

  return (
    <>
      <Head>
        <title>Hospital - by Chamook</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/assets/logo-b.svg" />
      </Head>
      <div className="w-full min-h-screen h-full bg-black flex justify-center p-5 relative overflow-hidden">
        <div className="max-w-7xl w-full p-1 z-10">
          <div className="w-full flex justify-between">
            <button
              onClick={() => router.push("/")}
              className="bg-transparent  text-white inline-flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2 -ml-1 rotate-180"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="apple"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 512"
              >
                <path
                  fill="currentColor"
                  d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
                />
              </svg>
              กลับหน้าแรก
            </button>
            <Link href="/login">
              <button className="border-2 border-white text-white px-2 py-1 hover:bg-white hover:text-black">
                ลงชื่อเข้าใช้
              </button>
            </Link>
          </div>

          <section className="w-full flex flex-col justify-center items-center gap-5 p-3">
            <p className="text-white font-normal text-2xl">
              โรงพยาบาลสัตว์ ภูเก็ต
            </p>
            <div className="min-h-[300px] h-full w-full border-2 border-white max-w-5xl hover:bg-white hover:text-black text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
                <div className="w-full h-full p-5 flex items-center justify-center">
                  <img
                    src="/assets/hospital/126.jpg"
                    alt="hospital"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="w-full h-full p-5 gap-2 flex flex-col justify-center">
                  <p className="text-xl">โรงพยาบาลสัตว์แม่หลวนภูเก็ต</p>
                  <p className="text-base">
                    รักษา​สัตว์พิเศษ​ สุนัข​แมว​ เคสฉุกเฉิน ผ่าตัดกระดูก​
                    ถ่ายเลือด​​ ผสมเทียม
                  </p>
                  <p className="text-sm inline-flex">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="h-7 w-7 mr-4"
                    />
                    18/20 ถนนแม่หลวน ตำบลตลาดเหนือ อำเภอเมือง จังหวัดภูเก็ต
                    เทศบาลนครภูเก็ต, จังหวัดภูเก็ต 83000
                  </p>
                  <p className="text-sm inline-flex">
                    <FontAwesomeIcon icon={faPhone} className="h-5 w-5 mr-4" />
                    095 278 0789
                  </p>
                  <Link href="/hospital">
                    <div className="py-5">
                      <button className="border-2 p-2 w-48    ">
                        ติดต่อโรงพยาบาล
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            {hospitals.map((item) => (
              <div
                key={item.id}
                className="min-h-[300px] h-full w-full border-2 border-white max-w-5xl hover:bg-white hover:text-black text-white"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
                  <div className="w-full h-full p-5 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt="hospital"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="w-full h-full p-5 gap-2 flex flex-col justify-center">
                    <p className="text-xl">{item.name}</p>
                    <p className="text-base">{item.description}</p>
                    <p className="text-sm inline-flex">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="h-7 w-7 mr-4"
                      />
                      {item.location}
                    </p>
                    <p className="text-sm inline-flex">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="h-5 w-5 mr-4"
                      />

                      {item.phone}
                    </p>
                    <Link href={item.slug}>
                      <div className="py-5">
                        <button className="border-2 p-2 w-48    ">
                          ติดต่อโรงพยาบาล
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hospital;
