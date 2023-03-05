import * as React from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

import { NFTSlideMain } from './styled/NFTSlide.styled';

import { ipfs_origin } from 'src/utils/static';

import { NFTName, NFTItem } from './styled/NFTSlide.styled';

import Loading from 'react-loading-components';

import aptos_asset_list from 'src/shared/data/aptos_asset_list.json' ;

import * as Wagmi from "wagmi";

import { marketplaceAddr } from 'src/web3/addr';
import marketplaceAbi from 'src/web3/abi/marketplace.json' ;

const NFTSlide = () => {
    const [totalSupply, setTotalSupply] = React.useState(0) ;

    const {data: signer} = Wagmi.useSigner() ;

    const nftInstance = Wagmi.useContract({
		address: marketplaceAddr,
		abi: marketplaceAbi,
		signerOrProvider: signer,
	});

    const getTotalSupply = async () => {
        let amount = await nftInstance.totalSupply() ;

        setTotalSupply(Number(amount.toString())) ;
    }

    React.useEffect(() => {
        if(signer) {
            getTotalSupply();
        } else setTotalSupply(10);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signer]);

    return (
        <NFTSlideMain>
            {
                aptos_asset_list ? <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1440: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    navigation={true}
                    modules={[Navigation, Autoplay]}
                >
                    {
                        aptos_asset_list.slice(totalSupply - 10, totalSupply).map((nft, index) => (
                            <SwiperSlide key={index}
                            >
                                <NFTItem 
                                    style={{backgroundImage : `url(${`${ipfs_origin}/${nft.asset}`})`}}
                                    className='image'
                                />
                                <NFTName>
                                    {nft.name}
                                </NFTName>
                            </SwiperSlide>
                        ))
                    }
                </Swiper> : <Loading type='oval' width={40} height={40} />
            }
        </NFTSlideMain>
    )
}

export default NFTSlide ;