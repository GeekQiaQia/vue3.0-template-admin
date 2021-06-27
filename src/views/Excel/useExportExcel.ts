/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/**
 * @description
 * https://www.npmjs.com/package/xlsx#writing-examples
 *
*/


import { saveAs } from 'file-saver'
import XLSX from 'xlsx'

interface jsonTypes {
    multiHeader:any[]
    header:any[]
    data: any[][]
    filename:string
    merges:[]
    autoWidth:boolean
    bookType:XLSX.BookType
}
declare type ws={
    [key: string]: any;
}
declare type cellType={
    [key: string]: any;
}
declare type dateType=string | number | Date
/**
 * @description 生成excel array
*/
function generateArray(table: HTMLElement | null) {
    console.log(table);
  const out = [];
  const rows = table?.querySelectorAll('tr') as NodeListOf<HTMLTableRowElement>;
  const ranges = [];
  for (let R = 0; R < rows.length; ++R) {
    const outRow = [];
    const row = rows[R];
    const columns = row.querySelectorAll('td');
    for (let C = 0; C < columns.length; ++C) {
      const cell:HTMLTableDataCellElement = columns[C];
      let colspan:string|number|null = cell.getAttribute('colspan');
      let rowspan:string|number|null = cell.getAttribute('rowspan');
      let cellValue:string|number = cell.innerText;
      if (typeof cellValue === 'number' && cellValue === Number(cellValue)) cellValue = Number(cellValue);

      // Skip ranges
      ranges.forEach((range) => {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (let i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
        }
      });

      // Handle Row Span
      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        ranges.push({
          s: {
            r: R,
            c: outRow.length
          },
          e: {
            r: R + (rowspan as number) - 1,
            c: outRow.length + (colspan as number) - 1
          }
        });
      };

      // Handle Value
      outRow.push(cellValue !== "" ? cellValue : null);

      // Handle Colspan
      if (colspan)
        for (let k = 0; k < (colspan as number) - 1; ++k) outRow.push(null);
    }
    out.push(outRow);
  }
  return [out, ranges];
};

function datenum(date: dateType, date1904?: undefined) {
  if (date1904) date = Number(date)+ 1462;
  const epoch = Date.parse(String(date));
  return (epoch - Date.parse(String(new Date(Date.UTC(1899, 11, 30))))) / (24 * 60 * 60 * 1000);
}

/**
 * @description sheet  General Structures
 * - 单元格地址对象存储为{c: C, r: R}，其中C和R是0索引的列和行号，
 * 例如，单元格地址B5由对象{c:1, r:4}表示。
 * - 单元格范围对象存储为{s: S, e: E}，其中S是range范围内的第一个单元格，E是最后一个单元格。
 * 范围range是包含的。例如，范围A3:B7用对象{s:{c:0, r:2}， e:{c:1, r:6}}表示
 *
*/
function sheetFromArrayOfArrays(data: string | any[], opts?: undefined) {
  const worksheet:ws = {};
  const range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      const cell:cellType = {
        v: data[R][C],
      };
      if (cell.v !== null) {
        const cellRef = XLSX.utils.encode_cell({
            c: C,
            r: R
          });

          if (typeof cell.v === 'number') cell.t = 'n';
          else if (typeof cell.v === 'boolean') cell.t = 'b';
          else if (cell.v instanceof Date) {
            cell.t = 'n';
            const z=XLSX.SSF.parse_date_code(14)
            cell.z =z ;
            cell.v = datenum(cell.v);
          } else cell.t = 's';

          worksheet[cellRef] = cell;
      }

    }
  }
  if (range.s.c < 10000000) worksheet['!ref'] = XLSX.utils.encode_range(range);
  return worksheet;
}

/**
 * @description Workbook 类声明
*/
class Workbook implements XLSX.WorkBook {
    public SheetNames:any[];

    public Sheets:any;

    constructor(nameParams=[],sheetsParams={}){
        this.SheetNames=nameParams
        this.Sheets=sheetsParams
    }

}

/**
 * @description 将string 转化为arrayBuffer
 * 0x代表16进制数,0xff表示的数二进制1111 1111 占一个字节.和其进行&操作的数,最低8位,不会发生变化.
*/
function s2ab(s: string) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

/**
 * @description 将表格导出为Excel
*/
export function exportTableToExcel(id: string) {
    const table=document.getElementById(id)
  const excelArray = generateArray(table);
  const ranges = excelArray[1];

  /* original data */
  const data = excelArray[0];
  const wsName = "SheetJS";

  const wb = new Workbook();
  const worksheet = sheetFromArrayOfArrays(data);

  /* add ranges to worksheet */
  // ws['!cols'] = ['apple', 'banan'];
  worksheet['!merges'] = ranges;

  /* add worksheet to workbook */
  wb.SheetNames.push(wsName);
  wb.Sheets[wsName] = worksheet;

  const wbOutput = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });

  saveAs(new Blob([s2ab(wbOutput)], {
    type: "application/octet-stream"
  }), "test.xlsx")
}

/**
 * @description 将json对象导出到Excel
*/
export function exportJsonToExcel(params:jsonTypes) {
  /* original data */
  const filename = params?.filename??'defaultExcel'
  const bookType=params?.bookType??'xlsx';
  const multiHeader=params?.multiHeader??[]
  const merges=params?.merges??[]
  const autoWidth=params.autoWidth??true
  const data = [...params.data]
  data.unshift(params.header);

  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i])
  }

  const wsName = "SheetJS";
  const wb = new Workbook();
  const worksheet = sheetFromArrayOfArrays(data);

  if (merges.length > 0) {
    if (!worksheet['!merges']) worksheet['!merges'] = [];
    merges.forEach(item => {
        worksheet['!merges'].push(XLSX.utils.decode_range(item))
    })
  }

  if (autoWidth) {
    /* 设置worksheet每列的最大宽度 */
    const colWidth = data.map((row: ({ toString: () => { (): any; new(): any; charCodeAt: { (arg0: number): number; new(): any; }; length: number; }; } | null)[]) => row.map((val: { toString: () => { (): any; new(): any; charCodeAt: { (arg0: number): number; new(): any; }; length: number; }; } | null) => {
      /* 先判断是否为null/undefined */
      if (val == null) {
        return {
          'wch': 10
        };
      }
      /* 再判断是否为中文 */
      if (val.toString().charCodeAt(0) > 255) {
        return {
          'wch': val.toString().length * 2
        };
      }
        return {
          'wch': val.toString().length
        };

    }))
    /* 以第一行为初始值 */
    const result = colWidth[0];
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j].wch < colWidth[i][j].wch) {
          result[j].wch = colWidth[i][j].wch;
        }
      }
    }
    worksheet['!cols'] = result;
  }

  /* add worksheet to workbook */
  wb.SheetNames.push(wsName);
  wb.Sheets[wsName] = worksheet;

  /** Attempts to write the workbook data */
  const wbData = XLSX.write(wb, {
    bookType,
    bookSST: false,
    type: 'binary'
  });
  // save Blob data
  saveAs(new Blob([s2ab(wbData)], {
    type: "application/octet-stream"
  }), `${filename}.${bookType}`);
}

export default {exportTableToExcel,exportJsonToExcel}
