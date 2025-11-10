import { PdfData, VerbosityLevel } from 'pdfdataextract';
import { readFileSync } from 'fs';

const fileData = readFileSync('"C:/Users/nguye/Downloads/chall/chall.pdf"');

// Cách 1: Sử dụng PdfData (đơn giản)
PdfData.extract(fileData, {
    pages: 10, // số trang tối đa cần đọc
    sort: true, // sắp xếp text theo tọa độ
    verbosity: VerbosityLevel.ERRORS,
    get: {
        pages: true,
        text: true,
        fingerprint: true,
        outline: true,
        metadata: true,
        info: true,
        permissions: true,
    },
}).then((data) => {
    console.log('Số trang:', data.pages);
    console.log('Metadata:', data.metadata);
    console.log('Thông tin:', data.info);
    
    // In text từng trang
    data.text.forEach((pageText, index) => {
        console.log(`--- Trang ${index + 1} ---`);
        console.log(pageText);
    });
}).catch((error) => {
    console.error('Lỗi:', error);
});