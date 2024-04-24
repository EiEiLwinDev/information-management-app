const Button = ({ 
    type = 'submit', 
    className,
    color = 'gray',
     ...props 
}) => (
    <button
        type={type}
        className={`${className} 
        inline-flex 
        items-center 
        px-4 
        py-2 
        bg-${color}-800 
        border 
        border-transparent 
        rounded-md 
        font-semibold 
        text-xs 
        text-white 
        capitalize 
        tracking-widest 
        hover:bg-${color}-700 
        active:bg-${color}-900 
        focus:outline-none 
        focus:border-${color}-900 
        focus:ring ring-gray-300 
        disabled:opacity-25 
        transition 
        ease-in-out 
        duration-150`}
        {...props}
    />
)

export default Button
