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
            <p>หน้าแรก</p>
            <p>สารบัญแมว</p>
            <p>บทความ</p>
            <p>รูปภาพ</p>
            <p>โรงพยาบาลแมว</p>
          </div>
          <div className="flex text-white">
            <p className="border-2 border-white px-2 py-1">ลงชื่อเข้าใช้</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
