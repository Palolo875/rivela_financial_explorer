import React from "react";
import { cn } from "../../utils/cn";
import Icon from "../AppIcon";

const Input = React.forwardRef(({
    className,
    type = "text",
    label,
    description,
    error,
    required = false,
    id,
    variant = "glass", // 'glass', 'glass-intense', 'subtle'
    size = "default", // 'sm', 'default', 'lg'
    icon,
    iconPosition = "left",
    ...props
}, ref) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Size classes
    const sizeClasses = {
        sm: "h-8 px-3 py-1 text-sm",
        default: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-5 py-3 text-base"
    };

    // Variant classes
    const variantClasses = {
        glass: "input-glass",
        'glass-intense': "glass-intense rounded-lg px-4 py-3 w-full text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-glass",
        subtle: "glass-subtle border border-glass-border rounded-lg px-4 py-3 w-full text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-glass"
    };

    // Base input classes with glassmorphism
    const baseInputClasses = cn(
        "w-full font-body transition-all duration-glass",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:cursor-not-allowed disabled:opacity-50",
        sizeClasses[size],
        variantClasses[variant],
        error && "border-error/50 focus:ring-error/20 focus:border-error",
        icon && iconPosition === "left" && "pl-10",
        icon && iconPosition === "right" && "pr-10"
    );

    // Label classes
    const labelClasses = cn(
        "text-sm font-medium font-heading leading-none transition-colors duration-glass",
        error ? "text-error" : "text-text-primary"
    );

    // Checkbox-specific styles with glassmorphism
    if (type === "checkbox") {
        return (
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <input
                        type="checkbox"
                        className={cn(
                            "h-5 w-5 rounded-md glass border border-glass-border-hover",
                            "text-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0",
                            "transition-all duration-glass cursor-pointer",
                            "checked:bg-gradient-accent checked:border-primary",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            className
                        )}
                        ref={ref}
                        id={inputId}
                        {...props}
                    />
                    {/* Custom checkmark */}
                    <Icon 
                        name="Check" 
                        size={12} 
                        className="absolute top-0.5 left-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-glass pointer-events-none"
                    />
                </div>
                {label && (
                    <label htmlFor={inputId} className={cn(labelClasses, "cursor-pointer")}>
                        {label}
                        {required && <span className="text-error ml-1">*</span>}
                    </label>
                )}
            </div>
        );
    }

    // Radio button-specific styles with glassmorphism
    if (type === "radio") {
        return (
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <input
                        type="radio"
                        className={cn(
                            "h-5 w-5 rounded-full glass border border-glass-border-hover",
                            "text-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0",
                            "transition-all duration-glass cursor-pointer",
                            "checked:bg-gradient-accent checked:border-primary",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            className
                        )}
                        ref={ref}
                        id={inputId}
                        {...props}
                    />
                    {/* Custom radio dot */}
                    <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-glass pointer-events-none" />
                </div>
                {label && (
                    <label htmlFor={inputId} className={cn(labelClasses, "cursor-pointer")}>
                        {label}
                        {required && <span className="text-error ml-1">*</span>}
                    </label>
                )}
            </div>
        );
    }

    // For regular inputs with wrapper structure
    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={inputId} className={labelClasses}>
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {icon && iconPosition === "left" && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                        <Icon 
                            name={icon} 
                            size={16} 
                            className="text-text-secondary transition-colors duration-glass"
                        />
                    </div>
                )}

                <input
                    type={type}
                    className={cn(baseInputClasses, className)}
                    ref={ref}
                    id={inputId}
                    {...props}
                />

                {icon && iconPosition === "right" && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
                        <Icon 
                            name={icon} 
                            size={16} 
                            className="text-text-secondary transition-colors duration-glass"
                        />
                    </div>
                )}
            </div>

            {description && !error && (
                <p className="text-xs text-text-secondary leading-relaxed">
                    {description}
                </p>
            )}

            {error && (
                <p className="text-xs text-error leading-relaxed flex items-center space-x-1">
                    <Icon name="AlertCircle" size={12} />
                    <span>{error}</span>
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";

// Specialized input components
export const GlassInput = React.forwardRef((props, ref) => (
    <Input variant="glass" ref={ref} {...props} />
));

export const SearchInput = React.forwardRef(({ placeholder = "Rechercher...", ...props }, ref) => (
    <Input 
        variant="glass"
        icon="Search"
        iconPosition="left"
        placeholder={placeholder}
        ref={ref} 
        {...props} 
    />
));

export const PasswordInput = React.forwardRef(({ showPassword = false, onTogglePassword, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(showPassword);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        if (onTogglePassword) onTogglePassword(!isVisible);
    };

    return (
        <div className="relative">
            <Input
                type={isVisible ? "text" : "password"}
                icon="Lock"
                iconPosition="left"
                variant="glass"
                ref={ref}
                {...props}
            />
            <button
                type="button"
                onClick={toggleVisibility}
                className="absolute right-3 top-8 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors duration-glass"
            >
                <Icon 
                    name={isVisible ? "EyeOff" : "Eye"} 
                    size={16} 
                />
            </button>
        </div>
    );
});

export const NumberInput = React.forwardRef(({ 
    min, 
    max, 
    step = 1, 
    currency = false, 
    percentage = false,
    ...props 
}, ref) => {
    const formatValue = (value) => {
        if (!value) return value;
        if (currency) return `${value} €`;
        if (percentage) return `${value} %`;
        return value;
    };

    return (
        <Input
            type="number"
            min={min}
            max={max}
            step={step}
            variant="glass"
            icon={currency ? "Euro" : percentage ? "Percent" : "Hash"}
            iconPosition="left"
            ref={ref}
            {...props}
        />
    );
});

// Named exports
GlassInput.displayName = "GlassInput";
SearchInput.displayName = "SearchInput";
PasswordInput.displayName = "PasswordInput";
NumberInput.displayName = "NumberInput";

export default Input;