const Button = ({ 
    type = 'submit', 
    className,
    color,
    ...props 
}) => {
    // Define base class names
    const baseClassNames = `${className} inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs capitalize tracking-widest focus:outline-none focus:ring disabled:opacity-25 transition ease-in-out duration-150`;

    // Define dynamic class names based on color prop
    let dynamicClassNames = 'bg-gray-800 text-white'; // Default colors
    let hoverClass = 'hover:bg-gray-500';
    let activeClass = 'active:bg-gray-700';
    let focusClass = 'focus:bg-gray-900';
    if (color === 'secondary') {
        dynamicClassNames = 'bg-yellow-600 text-white'; // Yellow button
        hoverClass = `hover:bg-yellow-500`;
        activeClass = `active:bg-yellow-700`;
        focusClass = `focus:border-yellow-900 focus:ring ring-gray-300`;
    } else if (color === 'error') {
        dynamicClassNames = 'bg-red-700 text-white';
        hoverClass = `hover:bg-red-500`;
        activeClass = `active:bg-red-800`;
        focusClass = `focus:border-red-900 focus:ring ring-gray-300`;
    }       

    return (
        <button
            type={type}
            className={`${baseClassNames} ${dynamicClassNames} ${hoverClass} ${activeClass} ${focusClass}`}
            {...props}
        />
    );
};

export default Button;
