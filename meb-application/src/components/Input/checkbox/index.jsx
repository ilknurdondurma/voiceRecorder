import classNames from "classnames";
import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types"

export default function CheckBox({ label, className,name,value, onChange,title,readOnly, ...props }) {

  const inputClasses = classNames(
    "p-1",
    className
  );
    return (
        <div className="w-full"> {/**3lu kolonlar halinde goster*/}
          <span className="flex">
          <Field
              type="checkbox"
              className={inputClasses}
              name={name}
            />
            <p className={inputClasses}>{label}</p>
          </span>
          <ErrorMessage component="small" name={name} className="text-xs text-red-500 dark:text-red-400 mt-1 block" />
        </div>
    )
}

CheckBox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value:PropTypes.string,
    props: PropTypes.object,
    className: PropTypes.string,
}
CheckBox.defaultProps = {
  readOnly: false,
  type: "select",
};
/**
  const coptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];
 <Formik
      initialValues={{
        ad:"",
        soyad:"",
        opt1:"",
        opt2:""

      }}
        onSubmit={values => {
          handleSubmit(values)
        }}>
{({ setFieldValue,}) => (
        <Form>
          <Input label="adınız" name="ad" />
          <Input label="soyadınız" name="soyad" />
          <SelectBox 
                options={options} 
                label="metinnssn" 
                name="opt1" 
                onChange={(selectedValue) => {
                                // Değer değiştiğinde burada yapılacak işlemleri gerçekleştirin.
                                console.log("Seçilen değer:", selectedValue);
                                setFieldValue("opt1", selectedValue);
                            }}/>
            <SelectBox 
                options={options2} 
                variant="secondary"
                label="adsdsdsd" 
                name="opt2" 
                onChange={(selectedValue) => {
                                // Değer değiştiğinde burada yapılacak işlemleri gerçekleştirin.
                                console.log("Seçilen değer:", selectedValue);
                                setFieldValue("opt2", selectedValue);
                            }}/>
          <TextArea label="acıklama" name="ack" />
          <CheckBox name="chck" options={coptions} />
          <Button type="submit"variant="Green" onClick={() =>console.log("Button clicked")}> Gönder</Button>
        </Form>
)}
      </Formik>
 */