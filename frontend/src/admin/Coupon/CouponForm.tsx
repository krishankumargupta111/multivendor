
import { Box, Button, Grid, MenuItem, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import { useAppDispatch } from '../../redux/store';
import { createCoupon } from '../../redux/features/admin/CouponSlice';

interface CouponFormValue {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  expiryDate: Dayjs | null;
  minOrderValue: number;
}

function CouponForm() {
  const dispatch = useAppDispatch();

  const formik = useFormik<CouponFormValue>({
    initialValues: {
      code: '',
      discountType: 'percentage',
      discountValue: 0,
      expiryDate: null,
      minOrderValue: 0,
    },
    onSubmit: (values) => {
      
      const couponPayload = {
        code: values.code.trim().toUpperCase(),
        discountType: values.discountType,
        discountValue: Number(values.discountValue),
        minOrderValue: Number(values.minOrderValue || 0),
    
        expiryDate: values.expiryDate ? values.expiryDate.toISOString() : null,
        isActive: true,
      };

      console.log('Sending Coupon Payload:', couponPayload);

      dispatch(
        createCoupon({
          coupon: couponPayload,
          jwt: localStorage.getItem('jwt'),
        })
      );
    },
  });

  return (
    <div className='max-w-3xl'>
      <Box sx={{ mt: 3 }} component={'form'} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Code"
              name="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              helperText={formik.touched.code && formik.errors.code}
              error={formik.touched.code && Boolean(formik.errors.code)}
              required
            />
          </Grid>

          {/* Discount Type */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              select
              label="Discount Type"
              name="discountType"
              value={formik.values.discountType}
              onChange={formik.handleChange}
              required
            >
              <MenuItem value="percentage">Percentage (%)</MenuItem>
              <MenuItem value="fixed">Fixed Amount ($)</MenuItem>
            </TextField>
          </Grid>

          {/* Discount Value */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              label={
                formik.values.discountType === 'percentage'
                  ? 'Discount Percentage (%)'
                  : 'Discount Amount ($)'
              }
              name="discountValue"
              value={formik.values.discountValue}
              onChange={formik.handleChange}
              helperText={formik.touched.discountValue && formik.errors.discountValue}
              error={formik.touched.discountValue && Boolean(formik.errors.discountValue)}
              required
            />
          </Grid>

          {/* Expiry Date */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={formik.values.expiryDate}
                onChange={(value) => formik.setFieldValue('expiryDate', value)}
                sx={{ width: '100%' }}
                label="Expiry Date"
              />
            </LocalizationProvider>
          </Grid>

          {/* Minimum Order Value */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              type="number"
              label="Minimum Order Value"
              name="minOrderValue"
              value={formik.values.minOrderValue}
              onChange={formik.handleChange}
              helperText={formik.touched.minOrderValue && formik.errors.minOrderValue}
              error={formik.touched.minOrderValue && Boolean(formik.errors.minOrderValue)}
              required
            />
          </Grid>

        
          <Grid size={{ xs: 12 }}>
            <Button
              sx={{ py: '12px' }}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>

        </Grid>
      </Box>
    </div>
  );
}

export default CouponForm