import fs from 'fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'c:/Users/Usuario/source/repos/contabilio/S_RC AVIR377202602FEBRERO 2026 (20260227164052) (1).PDF';

async function parsePDF() {
    try {
        const data = new Uint8Array(fs.readFileSync(pdfPath));
        const pdf = await getDocument({ data }).promise;
        let fullText = '';
        
        const numPages = pdf.numPages;
        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            
            const linesMap = new Map();
            
            textContent.items.forEach((item) => {
              if (!item.str || item.str.trim() === '') return;
              const y = Math.round(item.transform[5] / 2) * 2;
              if (!linesMap.has(y)) linesMap.set(y, []);
              linesMap.get(y).push({ text: item.str, x: item.transform[4] });
            });
            
            const sortedY = Array.from(linesMap.keys()).sort((a, b) => b - a);
            
            const pageText = sortedY.map(y => {
              const lineItems = linesMap.get(y).sort((a, b) => a.x - b.x);
              return lineItems.map(item => item.text).join('   ');
            }).join('\n');
            
            fullText += pageText + '\n\n';
        }
        
        console.log("--- START PDF TEXT ---");
        console.log(fullText);
        console.log("--- END PDF TEXT ---");
        
        const regexExtract = (text, patterns) => {
          for (const pattern of patterns) {
            const match = text.match(pattern);
            if (match && match[1]) {
              return match[1].trim();
            }
          }
          return null;
        };
        
        const numPattern = `([0-9]{1,3}(?:\\.[0-9]{3})*(?:,[0-9]{2})?)`;
        
        const sueldoMatches = [
           new RegExp(`SUELDOS B[AÁ]SICO\\s*(?:[0-9]+\\s*)+${numPattern}`, 'i'),
           new RegExp(`Sueldo B[aá]sico.*?${numPattern}`, 'i')
        ];
        const osMatches = [
           new RegExp(`OBRA SOCIAL.*?3%\\s*.*?\\s*${numPattern}`, 'i'),
           new RegExp(`Obra Social.*?${numPattern}`, 'i')
        ];
        const jubMatches = [
           new RegExp(`JUBILACI[OÓ]N.*?11%\\s*.*?\\s*${numPattern}`, 'i'),
           new RegExp(`Jubilaci[oó]n.*?${numPattern}`, 'i')
        ];
         const netoMatches = [
           new RegExp(`TOTAL NETO.*?${numPattern}`, 'i'),
           new RegExp(`Neto a Pagar.*?${numPattern}`, 'i')
        ];

        console.log("Sueldo:", regexExtract(fullText, sueldoMatches));
        console.log("Obra Social:", regexExtract(fullText, osMatches));
        console.log("Jubilacion:", regexExtract(fullText, jubMatches));
        console.log("Neto:", regexExtract(fullText, netoMatches));
        
    } catch (e) {
        console.error("Failed to parse PDF:", e);
    }
}

parsePDF();
