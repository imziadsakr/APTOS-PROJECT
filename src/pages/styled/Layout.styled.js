import tagStyled from 'styled-components';

import BackgroundImage from 'src/assets/background.png';

export const LayoutMain = tagStyled.div`
    background-image: url(${BackgroundImage});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;

    position : relative;
`

export const BackdropOverlay = tagStyled.div`
    position : absolute ;
    left : 0px;
    top : 0px;

    width : 100%;
    height : 100%;

    background : #00000085;
`