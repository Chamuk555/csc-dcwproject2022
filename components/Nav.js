import { Link, animateScroll as scroll } from "react-scroll";
import Linkto from "next/link";

const Nav = () => {
  return (
    <>
      <div className="!z-30 bg-black shadow-sm shadow-inherit sticky top-0 min-w-screen w-full h-[50px] flex justify-center px-5">
        <div className="max-w-7xl w-full flex justify-between p-1 items-center">
          <div>
            <img
              src="/assets/logo-w.svg"
              alt="logo"
              className="object-cover h-full w-16"
            />
          </div>
          <div className="hidden md:flex w-auto gap-4  text-white">
            <Link
              activeClass="active"
              to="head"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <p className="cursor-pointer">หน้าแรก</p>
            </Link>

            <Link
              activeClass="active"
              to="section1"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <p className="cursor-pointer">สารบัญแมว</p>
            </Link>

            <Link
              activeClass="active"
              to="section2"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <p className="cursor-pointer">บทความ</p>
            </Link>

            <Link
              activeClass="active"
              to="section3"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <p className="cursor-pointer">รูปภาพ</p>
            </Link>

            <Link
              activeClass="active"
              to="section4"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <p className="cursor-pointer">โรงพยาบาลแมว</p>
            </Link>
          </div>
          <div className="flex text-white">
            <Linkto href="/login">
              <button className="border-2 border-white px-2 py-1 hover:bg-white hover:text-black">
                ลงชื่อเข้าใช้
              </button>
            </Linkto>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
