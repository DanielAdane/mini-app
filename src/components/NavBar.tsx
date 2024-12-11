const NavBar = () => {
  return (
    <div className="nav">
      <div className="nav_logo">
        <img src="logo-img.svg" alt="logo1" className="nav_logo-img1" />
        <img src="logo-text.svg" alt="logo2" className="nav_logo-img2" />
      </div>

      <div className="nav_search">
        <img src="search.svg" alt="logo2" />
        <input type="text" name="" id="" placeholder="Search usernames" />
      </div>
    </div>
  );
};

export default NavBar;
