import { Transform } from 'stream'
import type { TransformCallback, TransformOptions } from 'stream'

interface ParserOptions extends TransformOptions {
  includeEmptyFields?: boolean
  trimFields?: boolean
}

export class Parser extends Transform {
  headers: string[]
  tail: string
  includeEmptyFields: boolean
  trimFields: boolean

  constructor(options: ParserOptions = {}) {
    super({ objectMode: true, highWaterMark: 16, ...options })
    this.tail = ''
    this.headers = []
    this.includeEmptyFields = options.includeEmptyFields ?? false
    this.trimFields = options.trimFields ?? false
  }

  parseRows(data: string): string[] {
    const rows = data.split('\n')
    return rows.filter(r => r.trim() !== '')
  }

  parseCells(row: string): string[] {
    const cells: string[] = []
    let inQuote = false
    let currentCell = ''

    for (let i = 0; i < row.length; i++) {
      const char = row[i]
      const nextChar = row[i + 1]

      if (char === '"' && !inQuote) {
        inQuote = true
        continue
      }

      if (char === '"' && inQuote) {
        // Handle escaped quotes (two double quotes together)
        if (nextChar === '"') {
          currentCell += '"'
          i++ // Skip the next quote
        } else {
          inQuote = false
        }
        continue
      }

      if (char === ',' && !inQuote) {
        cells.push(this.trimFields ? currentCell.trim() : currentCell)
        currentCell = ''
        continue
      }

      currentCell += char
    }

    // Don't forget the last cell
    cells.push(this.trimFields ? currentCell.trim() : currentCell)

    return cells
  }

  cellsMapper(cells: string[]): Record<string, string> | null {
    if (this.headers.length === 0) {
      return null
    }

    // Create a record with all headers initialized to empty strings
    const obj: Record<string, string> = {}

    // Process each cell according to the available headers
    for (let i = 0; i < Math.max(this.headers.length, cells.length); i++) {
      const header = this.headers[i]
      const cell = cells[i] || ''

      // Skip empty cells if includeEmptyFields is false
      if (!this.includeEmptyFields && cell === '') {
        continue
      }

      // Only add fields with valid headers
      if (header) {
        obj[header] = cell
      }
    }

    return obj
  }

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    done: TransformCallback
  ): void {
    try {
      const data = this.tail + chunk.toString()
      const rows = this.parseRows(data)

      // Handle the case of empty input
      if (rows.length === 0) {
        this.tail = ''
        return done()
      }

      if (this.headers.length === 0 && rows.length > 0) {
        const headerRow = rows.shift()
        if (headerRow) {
          this.headers = this.parseCells(headerRow)
        }
      }

      // Save the last row as tail (might be incomplete)
      // but only if we have more than one row
      this.tail = rows.length > 0 ? rows.pop()! : ''

      // Process all complete rows
      for (const row of rows) {
        try {
          const cells = this.parseCells(row)
          const obj = this.cellsMapper(cells)
          if (obj) this.push(obj)
        } catch (err) {
          this.emit('error', new Error(`Error processing row: ${row}, ${err}`))
        }
      }

      done()
    } catch (err) {
      done(new Error(`Transform error: ${err}`))
    }
  }

  _flush(done: TransformCallback): void {
    try {
      if (this.tail && this.tail.trim() !== '') {
        // Process the remaining data in tail as a single row
        const cells = this.parseCells(this.tail)
        const obj = this.cellsMapper(cells)
        if (obj) this.push(obj)
      }
      done()
    } catch (err) {
      done(new Error(`Flush error: ${err}`))
    }
  }
}
