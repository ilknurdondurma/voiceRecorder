import classNames from "classnames";
import PropTypes from "prop-types"
import { createElement } from "react";
import { BsSendFill } from "react-icons/bs";
export default function Button({ variant,size,children,as,className,onClick, ...props }) {
  return createElement(as, {
    ...props,
    className: classNames (
        "inline-flex items-center justify-center rounded ",
         {
            "bg-primary   text-white   shadow-indigo-500/50   " : variant === 'Primary',
            "bg-secondary text-white   shadow-indigo-500/50   ": variant ==='Secondary',

            "bg-white text-black   shadow-sm shadow-primary   " : variant === 'PrimaryOutline',
            "bg-transparent text-secondary border border-1 shadow-sm shadow-secondary hover:shadow-secondary hover:shadow-md": variant ==='SecondaryOutline',

            "bg-green-400   text-white   shadow-indigo-500/50": variant === 'GreenButton',
            "bg-yellow-400   text-white   shadow-indigo-500/50": variant === 'YellowButton',

            

            "px-6 font-medium h-buttons-large text-lg": size === 'large',
            "px-5 font-medium h-buttons-normal  text-md": size === 'normal',
            "px-4 font-medium h-buttons-small  text-sm ": size === 'small',
            "px-3 font-normal h-buttons-xsmall  text-xs ": size === 'xsmall',
            [className]: !!className 
        }),
        onClick: () => onClick && onClick(),
  }, 
    <span className='flex items-center'>{children}</span>
  )
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  variant: PropTypes.oneOf(['Primary','PrimaryOutline', 'Secondary', 'SecondaryOutline', 'GreenButton','YellowButton']),
  size: PropTypes.oneOf(['xsmall','normal', 'small', 'large']),
  as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  props: PropTypes.object,
  className: PropTypes.string
}

Button.defaultProps = {
  as: 'button',
  variant: 'Green',
  size: 'normal',
}
/**  ÖRNEK KULLANIM
 * 
 * <div  className='px-5'>
              <Button
                size="large" variant="PurpleOutline"
                onClick={() => console.log("Button clicked")}
                children="Subscribe" >               
            </Button> 
            </div>
          <div className='px-5'> 
              <Button
                size="normal" variant="TransparentButton"
                onClick={() => console.log("Button clicked")}>
                  <IoIosAddCircle className="mx-2" />Subscribe             
            </Button>
          </div>
 */