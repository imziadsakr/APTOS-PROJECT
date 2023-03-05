import tagStyled from 'styled-components';

export const NFTSlideMain = tagStyled.div`
    width : 100%;
    height : 250px;

    display : flex;
    justify-content : center;
    
    & .swiper {
        width: 100%;
        height: 100%;
    }
      
    & .swiper-slide {
        position : relative;

        border : 10px solid black;
        border-radius : 10px;

        box-sizing : border-box;

        overflow : hidden;

        cursor : pointer ;

        display: flex;
        justify-content: center;
        align-items: center;

        :hover {
            & .image {
                transform: scale(1.2);
            }
        }
    }
`

export const NFTName =  tagStyled.div`
    position : absolute ;

    width : 100%;
    height : 100%;

    display : flex;
    justify-content: flex-start;
    align-items : flex-end;

    padding: 10px;

    left : 0px;
    top : 0px;

    color : white;
    font-weight : bold;
    font-size : 20px;

    background: linear-gradient(rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%);
`

export const NFTItem = tagStyled.div`
    width : 100%;
    height : 100%;
    
    background-position : center;
    background-size : cover;

    transition : 0.3s;
`