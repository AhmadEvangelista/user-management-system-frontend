interface LabelProps {
  htmlFor: string;
  className: string;
  text: string;
}

const Label = (prop: LabelProps) => {
  return (
    <label htmlFor={prop.htmlFor} className={prop.className}>
      {prop.text}
    </label>
  );
};

export default Label;
