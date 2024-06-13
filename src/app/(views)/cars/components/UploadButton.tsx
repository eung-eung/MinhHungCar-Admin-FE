import React from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
export default function UploadButton() {
    return (
        <button style={{ border: 0, background: 'none' }} type="button">
            <AddRoundedIcon />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    )
}
