import React from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function DropDown({ label, variant, className, name, options, onChange, title, readOnly, placeholder, ...props }) {
  const inputClasses = classNames(
    'w-full flex inline-block m-2',
    {
      'bg-my_input_bg w-full h-10 border border-my_border_color rounded-lg  focus:outline-1 focus:outline-primary/50 px-3 ': variant === 'primary',
      'w-full h-16 px-3 outline-0 border-y border-my_border_color focus:border-y focus:border-primary/50  active:border-y active:border-primary/50 ': variant === 'secondary',
    },
    className
  );

  return (
    <div className="w-full">
      {label && <div className="mb-1 ps-3 text-lg text-text_primary/80">{label} :</div>}
      <Field
        as="select"
        name={name}
        placeholder={placeholder}
        className={inputClasses}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
      >
        <option value="" disabled={true}>
          {placeholder || 'Select...'}
        </option>
        {options &&
          options.map((option, key) => (
            <option key={key} disabled={readOnly} value={option?.value}>
              {option?.label}
            </option>
          ))}
      </Field>
      <ErrorMessage component="small" name={name} className="text-xs text-red-500 dark:text-red-400 mt-1 block" />
    </div>
  );
}

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  props: PropTypes.object,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), label: PropTypes.string })),
  onChange: PropTypes.func,
};

DropDown.defaultProps = {
  variant: 'primary',
  readOnly: false,
  type: 'select',
};

/**
 
const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
];
<Formik
      initialValues={{
        ad:"",
        soyad:"",
        opt1:""

      }}
        onSubmit={values => {
          handleSubmit(values)
        }}>
{({ setFieldValue,}) => (
        <Form>
          <Input label="adınız" name="ad" />
          <Input label="soyadınız" name="soyad" />
          <DropDown 
                options={options} 
                label="metinnssn" 
                name="opt1" 
                onChange={(selectedValue) => {
                                // Değer değiştiğinde burada yapılacak işlemleri gerçekleştirin.
                                console.log("Seçilen değer:", selectedValue);
                                setFieldValue("opt1", selectedValue);
                            }}/>
          <TextArea label="acıklama" name="ack" />
          <Button type="submit"variant="Green" onClick={() =>console.log("Button clicked")}> Gönder</Button>
        </Form>
)}
      </Formik>
 */