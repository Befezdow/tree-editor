export const colors = {
    border: 'gray',
    backgroundMain: 'white',
    backgroundHovered: '#f8f8f8',
    backgroundActive: '#e9e9e9',
    danger: 'darkred',
    text: 'black',
};

export const buttonReset = `
    cursor: pointer;
    user-select: none;
    
    &:-moz-focusring {
        outline: none;
    }
    
    &::-moz-focus-inner {
        border: 0;
        padding: 0;
    }
    
    color: ${colors.text};
    background-color: ${colors.backgroundMain};
    padding: 5px;
    border: 1px ${colors.border} solid;
    border-radius: 5px;
    
    &:disabled {
        color: ${colors.border};
    }
    
    &:hover:not(:disabled) {
        background-color: ${colors.backgroundHovered};
    }
    
    &:active:not(:disabled) {
        background-color: ${colors.backgroundActive};
    }
`;
