import React from 'react'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
export default function Star({ rating }: any) {
    let index = 0
    const stars = Array.from({ length: 5 }, () =>
        <StarBorderRoundedIcon
            key={index++}
            color='disabled'
            fontSize='small' />);

    for (let i = 0; i < rating; i++) {
        stars[i] = <StarRoundedIcon sx={{ color: '#ffa700' }} fontSize='small' />;
    }
    return (
        <div>{stars}</div>
    )
}