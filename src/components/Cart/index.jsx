import React, { useRef, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    Badge,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Popover,
    Typography
} from '@mui/material';
import { useTheme } from '@emotion/react';
import FlexBetween from 'components/FlexBetween';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import InputCart from './InputCart';
import { changeDeleteProductToCart } from 'state/cartSlice';
import Modal from 'components/Modal';
import { DataGrid } from '@mui/x-data-grid';
import InputCartEditing from './InputCartEditing';

export default function Cart({ isSale }) {
    const theme = useTheme();
    const dataCart = useSelector((state) => state.dataCart);
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const columns = [
        {
            field: 'name',
            headerName: 'Tên sản phẩm',
            flex: 1
        },
        {
            field: 'quantity',
            headerName: 'Số lượng',
            flex: 1,
            renderEditCell: ({ row, id, value, field, ...res }) => {
                return (
                    <InputCartEditing
                        id={row._id}
                        unit={row.unit}
                        quantity={row.quantity}
                        total={row.total}
                        isSale={isSale}
                        idRow={id}
                        valueRow={value}
                        fieldRow={field}
                    />
                );
            },
            editable: true
            //renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        },
        {
            field: 'unit',
            headerName: 'Đơn vị',
            flex: 0.5,
            sortable: false
            //renderCell: (params) => params.value.length
        },
        {
            field: 'price',
            headerName: 'Giá',
            flex: 1
        },
        {
            field: 'note',
            headerName: 'Ghi chú',
            flex: 1
            //renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        }
    ];

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'popover-with-anchor' : undefined;
    let totalProduct = dataCart.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.pice,
        0
    );

    const handleClick = (event) => {
        if (isSale) {
            setAnchorEl(event.currentTarget);
        } else {
            modalRef.current.showModal();
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCart = () => {
        setAnchorEl(null);
    };

    const onHandleDeleteProduct = (id) => {
        dispatch(changeDeleteProductToCart(id));
    };

    console.log(dataCart);

    return (
        <>
            <Badge
                color="secondary"
                badgeContent={dataCart.length}
                invisible={dataCart.length === 0}>
                <ShoppingCartIcon
                    size="large"
                    fontSize="large"
                    sx={{ cursor: 'pointer', height: '35px' }}
                    aria-describedby={id}
                    variant="contained"
                    onClick={handleClick}
                />
            </Badge>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                disableScrollLock={true}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                container={document.app}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}>
                <Box
                    component={'div'}
                    sx={{
                        backgroundColor: theme.palette.background.alt
                    }}>
                    {dataCart.length > 0 ? (
                        <>
                            {dataCart.map((item) => (
                                <Card
                                    key={item._id}
                                    sx={{
                                        backgroundImage: 'none',
                                        backgroundColor: theme.palette.background.alt,
                                        borderRadius: '0.55rem',
                                        display: 'flex',
                                        marginBottom: '8px'
                                    }}>
                                    <CardContent>
                                        <FlexBetween>
                                            <Box
                                                component="img"
                                                alt="profile"
                                                src={item.image}
                                                height="70px"
                                                width="90px"
                                                borderRadius="5px"
                                                sx={{ objectFit: 'cover' }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h5"
                                                    component="div"
                                                    sx={{ maxWidth: '280px', padding: '8px' }}>
                                                    {item.name}
                                                </Typography>
                                                <FlexBetween
                                                    sx={{
                                                        alignItems: 'end'
                                                    }}>
                                                    <Typography
                                                        variant="h5"
                                                        component="div"
                                                        sx={{ ml: '10px' }}>
                                                        {item.pice}
                                                        <sup>đ</sup>
                                                    </Typography>
                                                    <InputCart
                                                        id={item._id}
                                                        unit={item.unit}
                                                        quantity={item.quantity}
                                                        total={item.total}
                                                    />
                                                </FlexBetween>
                                            </div>
                                        </FlexBetween>
                                    </CardContent>
                                    <CardActions sx={{ padding: 0 }}>
                                        <Button
                                            variant="primary"
                                            size="small"
                                            sx={{ width: '100%' }}
                                            onClick={() => onHandleDeleteProduct(item._id)}>
                                            <CloseIcon />
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))}
                            <FlexBetween
                                sx={{
                                    padding: '10px'
                                }}>
                                <Typography variant="h5" component="div" sx={{ ml: '70px' }}>
                                    Tổng:{' '}
                                    <span style={{ color: 'red' }}>
                                        {totalProduct} <sup>đ</sup>
                                    </span>
                                </Typography>

                                <Button variant="contained" color="success" onClick={handleCart}>
                                    Xác nhận
                                </Button>
                            </FlexBetween>
                        </>
                    ) : (
                        <div
                            style={{
                                width: '350px',
                                height: '300px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <div
                                style={{
                                    textAlign: 'center'
                                }}>
                                <Box
                                    component={'img'}
                                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9bdd8040b334d31946f49e36beaf32db.png"
                                    sx={{
                                        display: 'inline-block',
                                        width: '6.25rem',
                                        height: ' 6.25rem'
                                    }}
                                />

                                <Typography variant="h5" component="div" sx={{ padding: '0.5rem' }}>
                                    Chưa có sản phẩm
                                </Typography>
                            </div>
                        </div>
                    )}
                </Box>
            </Popover>
            <Modal ref={modalRef} title="Danh sách sản phẩm">
                <Box
                    height="50vh"
                    sx={{
                        /* '& .MuiDataGrid-root': {
                            border: 'none'
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: 'none'
                        }, */
                        '& .MuiDataGrid-cell--editing': {
                            backgroundColor: `${theme.palette.primary.main} !important`,
                            color: theme.palette.secondary[100],
                            borderBottom: 'none'
                        }
                        /*  '& .MuiDataGrid-virtualScroller': {
                            backgroundColor: theme.palette.primary.light
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: theme.palette.background.alt,
                            color: theme.palette.secondary[100],
                            borderTop: 'none'
                        },
                        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                            color: `${theme.palette.secondary[200]} !important`
                        } */
                    }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={dataCart || []}
                        columns={columns}
                        // rowCount={(data && data.total) || 0}
                        // rowsPerPageOptions={[20, 50, 100]}

                        hideFooterPagination
                        hideFooterSelectedRowCount
                        hideFooter
                        // page={page}
                        // pageSize={pageSize}
                        // paginationMode="server"
                        // sortingMode="server"
                        // onPageChange={(newPage) => setPage(newPage)}
                        // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        // onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                        // components={{ Toolbar: DataGridCustomToolbar }}
                        // componentsProps={{
                        //     toolbar: { searchInput, setSearchInput, setSearch }
                        // }}
                    />
                </Box>
            </Modal>
        </>
    );
}
