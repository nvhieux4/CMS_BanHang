import { InputAdornment, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CONSTANT } from 'common/constant';
import { useDispatch } from 'react-redux';
import { changeProductCart } from 'state/cartSlice';
import { useTheme } from '@emotion/react';

export default function InputCart({ id, unit, quantity, total }) {
    const dispatch = useDispatch();

    const handleChangeQuantity = (action) => {
        if (quantity === 1 && CONSTANT.SUBTRACT === action) return;
        if (total <= quantity && CONSTANT.ADD === action) return;
        dispatch(
            changeProductCart({
                _id: id,
                action
            })
        );
    };

    return (
        <div>
            <TextField
                label={'Số lượng'}
                variant="standard"
                id="outlined-start-adornment"
                InputProps={{
                    startAdornment: (
                        <InputAdornment
                            sx={{ cursor: quantity === 1 ? 'not-allowed' : 'pointer' }}
                            position="start"
                            onClick={() => handleChangeQuantity(CONSTANT.SUBTRACT)}>
                            <RemoveIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment
                            position="end"
                            sx={{ cursor: total <= quantity ? 'not-allowed' : 'pointer' }}
                            onClick={() => handleChangeQuantity(CONSTANT.ADD)}>
                            <AddIcon />
                        </InputAdornment>
                    )
                }}
                value={quantity}
                sx={{
                    width: '100px'
                }}
            />
            {unit}
        </div>
    );
}
