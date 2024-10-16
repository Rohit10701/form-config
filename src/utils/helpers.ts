import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { defaultStyles } from "./theme";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function applyTheme(theme) {
    return {
      form: {
        ...defaultStyles.form,
        backgroundColor: theme.backgroundColor,
      },
      field: defaultStyles.field,
      input: {
        ...defaultStyles.input,
        backgroundColor: theme.inputBackgroundColor,
        color: theme.inputTextColor,
        borderColor: theme.borderColor,
      },
      label: {
        ...defaultStyles.label,
        color: theme.labelColor,
      },
      error: {
        ...defaultStyles.error,
        color: theme.errorColor,
      },
    };
  }
  
// Updated getGridStyles function to support custom breakpoints
export const getGridStyles = (layout = {
  columns: 1,  // default columns for small screens
  gap: '16px',
  maxColumns: 1,
  breakpoints: {
    // Define breakpoints here
    600: 2, // 600px width and up will have 2 columns
    900: 3, // 900px width and up will have 3 columns
    1200: 4, // 1200px width and up will have 4 columns
  } as Record<string, number>,
}) => {
  const { columns, gap, maxColumns, breakpoints } = layout;

  const styles = {
    display: 'grid',
    gap: gap || '16px',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    width: '100%',
  };

  // Generate media queries dynamically based on breakpoints
  const responsiveStyles = Object.entries(breakpoints).reduce((acc, [breakpoint, cols]) => {
    acc[`@media (min-width: ${breakpoint}px)`] = {
      gridTemplateColumns: `repeat(${Math.min(cols, maxColumns)}, 1fr)`,
    };
    return acc;
  }, {});

  console.log({responsiveStyles})
  // Merge base styles with responsive styles
  return {
    ...styles,
    ...responsiveStyles,
  };
};

  
  