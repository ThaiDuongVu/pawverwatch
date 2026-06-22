import Title from "./title";

const Header = () => {
  return (
    <div className="text-center">
      <h2>Welcome to <Title />!</h2>
      <p>Quickly turn any pet into your favorite <strong>Overwatch®</strong> heroes
        <br />
        (No AI slop)
      </p>
    </div>
  )
};

export default Header;