import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import withAuth from "../components/Auth";
import useSWR, { mutate } from "swr";
import AdminNav from "../components/AdminNav";

const URL = `http://localhost/api/hospital`;
const fetcher = (url) => axios.get(url).then((res) => res.data);

const AdminHospital = ({ token }) => {
  const router = useRouter();

  const [hospital, setHospital] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [slug, setSlug] = useState("");

  const { data, error } = useSWR(URL, fetcher);
  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        Loading...
      </div>
    );
  }

  const addHospitall = async (
    name,
    description,
    location,
    phone,
    image,
    slug
  ) => {
    await axios.post(URL, { name, description, location, phone, image, slug });
    mutate(URL);
  };

  const getHospital = async (id) => {
    return await axios.get(`${URL}/${id}`).then((res) => {
      if (res.data) {
        setHospital(res.data);
        setName(res.data.name);
        setDescription(res.data.description);
        setLocation(res.data.location);
        setPhone(res.data.phone);
        setImage(res.data.image);
        setSlug(res.data.slug);
      }
    });
  };

  const deleteHospital = async (id) => {
    await axios.delete(`${URL}/${id}`);
    mutate(URL);
  };

  const updateHospital = async (id) => {
    await axios.put(`${URL}/${id}`, {
      name,
      description,
      location,
      phone,
      image,
      slug,
    });
    mutate(URL);
  };

  return (
    <>
      <Head>
        <title>Management - by Chamook</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/assets/logo-b.svg" />
      </Head>
      <AdminNav />
      <div className="w-full min-h-screen h-full bg-black flex justify-center p-5 relative overflow-hidden">
        <div className="max-w-7xl w-full p-1 z-10">
          <section className="w-full flex flex-col justify-center items-center gap-5 p-3">
            <p className="text-white font-normal text-2xl">?????????????????????????????????????????????</p>
          </section>

          <section className="bg-white rounded-lg my-2 w-full h-full">
            <div className="p-10 grid grid-cols-2 gap-3 w-full max-h-96 h-full">
              <div className="w-full h-full overflow-hidden">
                <img
                  src={hospital.image}
                  alt="profile"
                  className="object-contain w-full h-full object-center"
                />
              </div>
              <div>
                <div className="inline-flex w-full items-end mb-2 ">
                  <p className="w-1/5"> ??????????????????????????????????????? </p>

                  <input
                    className="appearance-none bg-transparent border-b border-teal-500  text-black    py-1 px-2 leading-tight focus:outline-none font-light w-96"
                    type="text"
                    id="name"
                    defaultValue={hospital.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="inline-flex  items-end w-full mb-2 ">
                  <p className="w-1/5"> ???????????????????????? </p>

                  <textarea
                    className="appearance-none bg-transparent border-b border-teal-500  text-black  py-1 px-2 leading-tight focus:outline-none  h-full font-light w-96"
                    type="text"
                    id="description"
                    defaultValue={hospital.description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="inline-flex w-full items-end mb-2 ">
                  <p className="w-1/5"> ????????????????????? </p>

                  <input
                    className="appearance-none bg-transparent border-b border-teal-500  text-black   py-1 px-2 leading-tight focus:outline-none font-light w-96"
                    type="text"
                    id="location"
                    defaultValue={hospital.location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="inline-flex w-full items-end mb-2 ">
                  <p className="w-1/5"> ???????????????????????? </p>

                  <input
                    className="appearance-none bg-transparent border-b border-teal-500  text-black   py-1 px-2 leading-tight focus:outline-none font-light w-96"
                    type="text"
                    id="location"
                    defaultValue={hospital.phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="inline-flex w-full items-end mb-2 ">
                  <p className="w-1/5"> Url ?????????????????? </p>

                  <input
                    className="appearance-none bg-transparent border-b border-teal-500  text-black   py-1 px-2 leading-tight focus:outline-none font-light w-96"
                    type="text"
                    id="location"
                    defaultValue={hospital.image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>

                <div className="inline-flex w-full items-end mb-2 ">
                  <p className="w-1/5"> ???????????????????????? </p>

                  <input
                    className="appearance-none bg-transparent border-b border-teal-500  text-black   py-1 px-2 leading-tight focus:outline-none font-light w-96"
                    type="text"
                    id="location"
                    defaultValue={hospital.slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>

                <div className="inline-flex w-full justify-center my-2 gap-3">
                  <button
                    onClick={() => updateHospital(hospital.id)}
                    className="bg-yellow-500 px-5 py-2 w-48 rounded-md text-white"
                  >
                    ?????????????????????????????????????????????
                  </button>
                  <button
                    onClick={() =>
                      addHospitall(
                        name,
                        description,
                        location,
                        phone,
                        image,
                        slug
                      )
                    }
                    className="bg-green-600 px-5 py-2 w-48 rounded-md text-white"
                  >
                    ?????????????????????????????????????????????????????????
                  </button>
                </div>
              </div>
            </div>
            <div className="p-10">
              <table className="table-auto w-full border-collapse border">
                <thead>
                  <tr>
                    <th className="border font-medium w-1/6">????????????????????????</th>
                    <th className="border font-medium w-2/6">???????????????????????????????????????</th>

                    <th className="border font-medium w-1/6">????????????????????????????????????</th>
                    <th className="border font-medium w-2/6">??????????????????</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center border">{index + 1}</td>
                      <td className="text-center border">{item.name}</td>
                      <td className="text-center border">
                        <Link href={item.slug}>
                          <button className="bg-blue-400 px-5 py-2 w-fit rounded-md text-white ">
                            ???????????????????????????????????????????????????
                          </button>
                        </Link>
                      </td>
                      <td className="border ">
                        <div className="inline-flex justify-center w-full gap-3 m-2">
                          <button
                            onClick={() => deleteHospital(item.id)}
                            className="bg-red-500 px-5 py-2 w-24 rounded-md text-white"
                          >
                            ??????
                          </button>
                          <button
                            onClick={() => getHospital(item.id)}
                            className="bg-yellow-500 px-5 py-2 w-24 rounded-md text-white"
                          >
                            ???????????????
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withAuth(AdminHospital);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
