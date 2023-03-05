import tagStyled from 'styled-components';

export const ContentMain = tagStyled.div`
    height : calc(100% - ${props => props.theme.layout.header}px);
    width  : 100%;

    box-sizing: border-box;

    padding : 20px 2%;

    overflow-y : auto;
`