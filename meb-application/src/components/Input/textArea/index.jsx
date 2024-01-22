import classNames from "classnames";
import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types"

export default function TextArea({ label, name, placeholder, className, ...props }) {
    const inputClasses = classNames(
        "  w-full text-lg m-2 h-20 px-5 bg-my_input_bg border text-black border-my_border_color rounded-lg  focus:outline-1 focus:outline-primary/50 ",
        className
      );
    return (
        <div className="w-full">
            {label && <div className="mb-2.5 ps-3  text-lg text-text_primary/80">{label} :</div>}
            <Field 
            as="textarea" 
            name={name} 
            placeholder={placeholder} 
            className={inputClasses}/>
            <ErrorMessage component="small" name={name} className="text-xs text-red-500 dark:text-red-400 mt-1 block" />
        </div>
    )
}

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    props: PropTypes.object
}