// import { Image, Upload, message } from 'antd'
// import React from 'react'
// import UploadButton from './UploadButton'

// export default function UploadImage(
//     {
//         id,
//         fileList,
//         handleChange,
//         handlePreview,
//         handleRemove,
//         previewImage,
//         previewOpen,
//         setPreviewImage,
//         setPreviewOpen
//     }: {
//         id: any,
//         fileList?: any,
//         handleChange: any,
//         handlePreview: any,
//         handleRemove: any,
//         previewImage: any,
//         previewOpen: any,
//         setPreviewOpen: any,
//         setPreviewImage: any
//     }) {
//     return (
//         <>
//             <Upload
//                 id={id}
//                 listType="picture-card"
//                 fileList={fileList}
//                 onPreview={handlePreview}
//                 onRemove={handleRemove}
//             >
//                 <UploadButton />
//             </Upload>
//             {previewImage && (
//                 <Image
//                     wrapperStyle={{ display: 'none' }}
//                     preview={{
//                         visible: previewOpen,
//                         onVisibleChange: (visible) => setPreviewOpen(visible),
//                         afterOpenChange: (visible) => !visible && setPreviewImage(''),
//                     }}
//                     src={previewImage}
//                 />
//             )}
//         </>
//     )
// }
