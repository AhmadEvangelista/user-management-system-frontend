interface ButtonProps {
  className: string;
  text: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button type="submit" className={props.className}>
      {props.text}
    </button>
  );
};

export default Button;
