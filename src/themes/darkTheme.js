import {
    cyan500,
    cyan700,
    grey600,
    pinkA100, pinkA200, pinkA400,
    fullWhite,
} from 'material-ui/styles/colors';
import {fade, darken} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    borderRadius: 2,
    palette: {
        primary1Color: cyan500,
        primary2Color: cyan700,
        primary3Color: grey600,
        accent1Color: pinkA200,
        accent2Color: pinkA400,
        accent3Color: pinkA100,
        textColor: fullWhite,
        secondaryTextColor: fade(fullWhite, 0.7),
        alternateTextColor: '#303030',
        canvasColor: '#303030',
        secondaryCanvasColor: darken('#303030', 0.1),
        borderColor: fade(fullWhite, 0.3),
        disabledColor: fade(fullWhite, 0.3),
        pickerHeaderColor: fade(fullWhite, 0.12),
        clockCircleColor: fade(fullWhite, 0.12),
    },
};
