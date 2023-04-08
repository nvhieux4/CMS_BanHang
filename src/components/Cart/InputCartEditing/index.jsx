import { InputAdornment, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CONSTANT } from 'common/constant';
import { useDispatch } from 'react-redux';
import { changeProductCart } from 'state/cartSlice';
import { useGridApiContext } from '@mui/x-data-grid';
import { useTheme } from '@emotion/react';

export default function InputCartEditing({
    id,
    unit,
    quantity,
    total,
    isSale = true,
    idRow,
    valueRow,
    fieldRow
}) {
    const dispatch = useDispatch();

    const theme = useTheme();

    const apiRef = useGridApiContext();

    const handleChangeQuantity = (action) => {
        if (quantity === 1 && CONSTANT.SUBTRACT === action) return;
        if (total <= quantity && CONSTANT.ADD === action) return;
        dispatch(
            changeProductCart({
                _id: id,
                action
            })
        );
        if (!isSale) {
            if (CONSTANT.SUBTRACT === action) {
                apiRef.current.setEditCellValue({
                    id: idRow,
                    field: fieldRow,
                    value: valueRow - 1
                });
            }
            if (CONSTANT.ADD === action) {
                apiRef.current.setEditCellValue({
                    id: idRow,
                    field: fieldRow,
                    value: valueRow + 1
                });
            }
        }
    };

    return (
        <div>
            <TextField
                label={isSale ? 'Số lượng' : ''}
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
                    width: isSale ? '100px' : '100%',
                    backgroundColor: theme.palette.primary.main,
                    height: '100%'
                }}
            />
            {!isSale && unit}
        </div>
    );
}
