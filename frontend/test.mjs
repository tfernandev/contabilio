import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';

const pdfPath = 'c:/Users/Usuario/source/repos/contabilio/S_RC AVIR377202602FEBRERO 2026 (20260227164052) (1).PDF';

async function parsePDF() {
    try {
        const data = new Uint8Array(fs.readFileSync(pdfPath));
        const pdf = await pdfjsLib.getDocument({ data }).promise;
        let fullText = '';
        const numPages = pdf.numPages;
        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const text = content.items.map((item) => item.str).join(' ');
            fullText += text + '\n';
        }
        console.log("--- START PDF TEXT ---");
        console.log(fullText);
        console.log("--- END PDF TEXT ---");
    } catch (e) {
        console.error("Failed to parse PDF:", e);
    }
}

parsePDF();
