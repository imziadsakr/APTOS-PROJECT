import * as React from 'react';

import {  useSelector } from 'react-redux';
import useWalletData from 'src/shared/hooks/useWalletData';

import Loading from 'react-loading-components';

import {
    Table,
    TableHead,
    TableBody,
    TableFooter,
    TablePagination,
    TableRow,
    TableCell,
    InputAdornment
} from '@mui/material';

import { 
    NFTAsset, 
    NFTTableContainer,
    useStyles
} from './styled/NFTTable.styled';

import NFTInfo from './NFTInfo';

import { StyledTextField } from 'src/shared/styled';

import { SearchOutlined } from '@mui/icons-material';

import aptos_asset_list from 'src/shared/data/aptos_asset_list.json';
import { ipfs_origin } from 'src/utils/static';

import swal from 'sweetalert';

const NFTTable = (props) => {
    const headFields = [
        "",
        "Name",
        "Description",
        "Status"
    ] ;

    const {
        isConnected
    } = useWalletData() ;

    const classes = useStyles() ;

    const allCartList = useSelector(state => state.cart.allCartList) ;
    const allPurchasedList = useSelector(state => state.nft.allPurchasedList) ;

    const [search_id, setSearchId] = React.useState('');
    const [selectedNFT, setSelectedNFT] = React.useState({});
    const [openNFTInfo, setOpenNFTInfo] = React.useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpenNFTInfo = () => { setOpenNFTInfo(true) }
    const handleCloseNFTInfo = () => { setOpenNFTInfo(false) }

    const openViewNFTInfo = (nft) => {
        handleOpenNFTInfo();
        setSelectedNFT({
            ...nft,
            assetUrl : `${ipfs_origin}/${nft.asset}`
        });

    }
    return (
        <>
            <StyledTextField 
                placeholder='Enter NFT ID'
                value={search_id}
                onChange={(e) => setSearchId(e.target.value)}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <SearchOutlined />
                    </InputAdornment>,
                }}
            />
            <NFTTableContainer >
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                headFields.map((field, index) => {
                                    return (
                                        <TableCell key={index}>{ field }</TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            aptos_asset_list ? aptos_asset_list.filter(nft =>
                                nft.name.search(search_id) >= 0
                            ).slice(
                                page * rowsPerPage, page * rowsPerPage + rowsPerPage
                            ).map((nft, index) => (
                                <TableRow key={index}
                                >
                                    <TableCell
                                        sx={{width : '150px'}}
                                    >
                                        <NFTAsset src={`${ipfs_origin}/${nft.asset}`} />
                                    </TableCell>
                                    <TableCell>
                                        {nft.name}
                                    </TableCell>
                                    <TableCell>
                                        {nft.description}
                                    </TableCell>
                                    { 
                                        allCartList?.findIndex(nft => 
                                            nft.nft_id === index + page * rowsPerPage
                                        ) >= 0
                                        ? <TableCell>
                                            Pending On Cart...
                                        </TableCell>
                                        : (
                                            allPurchasedList?.findIndex(nft =>
                                                nft.nft_id === index + page * rowsPerPage
                                            ) >= 0 ? <TableCell>
                                                Purchased
                                            </TableCell> : <TableCell>
                                                <button onClick={() => 
                                                    openViewNFTInfo(nft)
                                                }>View In Detail</button>
                                            </TableCell>
                                        )
                                    }
                                </TableRow>
                            )) : <TableRow>
                                <TableCell colSpan={4} sx={{textAlign : 'center !important'}}>
                                    <Loading type='oval' width={30} height={30} />
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                labelRowsPerPage={"NFTs per page"}
                                count={10000}
                                SelectProps={{
                                    MenuProps : {
                                        classes : {
                                            paper :  classes.paper
                                        }
                                    }
                                }}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />    
                        </TableRow>
                    </TableFooter>
                </Table>
            </NFTTableContainer>
            <NFTInfo 
                open={openNFTInfo}
                handleClose={handleCloseNFTInfo}
                nftInfo={selectedNFT}
            />
        </>
    )
}


export default NFTTable;