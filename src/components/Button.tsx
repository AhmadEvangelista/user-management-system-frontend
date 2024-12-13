interface ButtonProps {
  className: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: ButtonProps) => {
  return (
    <button type="submit" className={props.className} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;
