import Title from "./title";
import Icon from "./icon";

const Header = () => {
  return (
    <div className="text-center">
      <h2>Welcome to <Title />!<Icon size={40} /></h2>
      <p>
        Quickly turn any pet into your favorite <strong>Overwatch®</strong> heroes
        <br />
        (No AI slop)
      </p>
    </div>
  )
};

export default Header;