import * as React from 'react' ;

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Loading from 'react-loading-components';

import { 
    MintNowDiv,
    CircularDiv,
    TitleDiv,
    DescPara
} from './styled/MintNow.styled';

import { StyledButton } from 'src/shared/styled';

import swal from 'sweetalert';

import * as Wagmi from "wagmi";
import { ethers } from 'ethers';

import { marketplaceAddr } from 'src/web3/addr';
import marketplaceAbi from 'src/web3/abi/marketplace.json' ;

const MintNow = () => {
    const [loading, setLoading] = React.useState(false) ;
    const [totalSupply, setTotalSupply] = React.useState(0) ;

    const {data: signer} = Wagmi.useSigner() ;

    const nftInstance = Wagmi.useContract({
		address: marketplaceAddr,
		abi: marketplaceAbi,
		signerOrProvider: signer,
	});

    const handleMint = async () => {
        try {
            setLoading(true) ;
            let receipt = await nftInstance.mint(100) ;

            receipt.wait() ;

            getTotalSupply() ;
            setLoading(false) ;
        } catch(err) {
            console.log(err);
            setLoading(false) ;
        }
    }

    const getTotalSupply = async () => {
        let _totalSupply = await nftInstance.totalSupply() ;
        setTotalSupply(_totalSupply.toString()) ;
    }

    React.useEffect(() => {
        if(signer) {
            getTotalSupply() ;
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signer]) ;

    React.useEffect(() => {
        return () => {
        }
    }, []) ;

    return (
        <MintNowDiv>
            <TitleDiv>
                APTOS Mint Pass
            </TitleDiv>
            <CircularDiv>
                <CircularProgressbar 
                    value={Number(Number(totalSupply) / 10000).toFixed(3)} 
                    text={`${Number(Number(totalSupply) / 10000).toFixed(3)}%`} 
                    styles={buildStyles({
                        pathColor: "#FE3301",
                        trailColor: "#132135",
                        textColor: "#FE3301",
                    })}
                />
            </CircularDiv>
            <DescPara>
                {
                    !Number(totalSupply) ? "No NFT mints yet." : `${totalSupply}/10000 already minted`
                }
            </DescPara>
            <br/>
            <StyledButton variant='contained' onClick={() => handleMint()}
                fullWidth 
                disabled={ loading }
                startIcon={loading && <Loading type='oval' width={25} height={25}/>}
            >
                {loading ? '...Minting' : 'Mint Now'}
            </StyledButton>
        </MintNowDiv>
    )
}

export default MintNow ;