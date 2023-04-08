import React, { useState } from 'react';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery,
    Stack,
    Chip
} from '@mui/material';
import { useGetProductsQuery } from 'state/api';
import FlexBetween from 'components/FlexBetween';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Cart from 'components/Cart';
import { CONSTANT, convertStringSeparation } from 'common/constant';
import { useDispatch } from 'react-redux';
import { addProductToCart } from 'state/cartSlice';
import Header from 'layout/Header';

const Product = ({ product }) => {
    const { _id, name, description, price, rating, category, supply, stat } = product;
    const theme = useTheme();
    const dispatch = useDispatch();

    const handleAddProductToCart = () => {
        dispatch(addProductToCart(product));
    };
    return (
        <Card
            sx={{
                backgroundImage: 'none',
                backgroundColor: theme.palette.background.alt,
                borderRadius: '0.55rem'
            }}>
            <CardContent>
                <Box
                    component="img"
                    alt="profile"
                    src="https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/September2022/ao-khoac-for-winter-den-3.jpg"
                    height="200px"
                    width="100%"
                    borderRadius="5px"
                    sx={{ objectFit: 'cover' }}
                />
                <Typography variant="h5" component="div" sx={{ padding: '0.5rem' }}>
                    {name}
                </Typography>
                <FlexBetween>
                    <Typography
                        // sx={{ mt: '0.5rem' }}
                        color={theme.palette.secondary[500]}
                        variant="h5">
                        {convertStringSeparation(price)}
                        <sup>đ</sup>
                    </Typography>
                    <Typography variant="h5" color={theme.palette.secondary[500]}>
                        Sản phẩm còn 200
                    </Typography>
                </FlexBetween>
            </CardContent>
            <CardActions>
                <Button
                    variant="primary"
                    size="small"
                    sx={{ width: '100%' }}
                    onClick={handleAddProductToCart}>
                    <AddShoppingCartIcon />
                </Button>
            </CardActions>
        </Card>
    );
};

const Products = () => {
    const { data = [], isLoading } = useGetProductsQuery();
    const isNonMobile = useMediaQuery('(min-width: 1000px)');
    const [isSale, setIsSale] = useState(true);

    const handleClick = (isSale) => {
        setIsSale(isSale);
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="PRODUCTS" subtitle="See your list of products." />
            <FlexBetween>
                <Stack direction="row" spacing={1}>
                    <Chip
                        color={isSale ? 'success' : 'default'}
                        label="Bán lẻ"
                        onClick={() => handleClick(true)}
                    />
                    <Chip
                        color={!isSale ? 'success' : 'default'}
                        label="Bán buôn"
                        onClick={() => handleClick(false)}
                    />
                </Stack>
                <Cart isSale={isSale} />
            </FlexBetween>

            {data || !isLoading ? (
                <Box
                    mt="20px"
                    display="grid"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    justifyContent="space-between"
                    rowGap="20px"
                    columnGap="1.33%"
                    sx={{
                        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                    }}>
                    {data.map((product) => (
                        <Product
                            key={product._id}
                            product={product}
                            //onHandleAddProductToCart={handleAddProduct}
                        />
                    ))}
                </Box>
            ) : (
                <>Loading...</>
            )}
        </Box>
    );
};

export default Products;
