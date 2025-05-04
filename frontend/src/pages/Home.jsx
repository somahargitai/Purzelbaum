const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      {/* Mobile menu button */}
      {/* <button className="block lg:hidden">Menu</button> */}

      {/* Desktop menu */}
      {/* <div className="hidden lg:flex">Desktop Menu</div> */}

      <div className="flex items-center">
        <span>Mobile : </span>
        <span className="block lg:hidden">Visible on mobile</span>
      </div>
      <div className="flex items-center">
        <span>1024px+ :</span>
        <span className="hidden min-[1024px]:block">
          Visible at 1024px and up
        </span>
      </div>
      <div className="flex items-center">
        <span>1280px+ :</span>
        <span className="hidden min-[1280px]:block">
          Visible at 1280px and up
        </span>
      </div>
    </div>
  );
};

export default Home;
