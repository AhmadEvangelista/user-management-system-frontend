import { Field } from "formik";

interface TextfieldProps {
  id: string;
  name: string;
  placeholder: string;
  type: string;
  className: string;
  required: boolean;
}

const Textfield = (props: TextfieldProps) => {
  return (
    <Field
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      type={props.type}
      className={props.className}
      required={props.required}
    />
  );
};

export default Textfield;
