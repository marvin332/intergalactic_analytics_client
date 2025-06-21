export {};
declare global {
     interface Window {
          showSaveFilePicker(options?: SaveFilePickerOptions): Promise<FileSystemFileHandle>;
     }

     interface FileSystemFileHandle {
          // дополняем только теми методами, которых не было
          createWritable(): Promise<FileSystemWritableFileStream>;
     }
}

// interface FileSystemFileHandle {
//      createWritable(): Promise<FileSystemWritableFileStream>;
// }

interface FileSystemWritableFileStream extends WritableStream {
     write(data: BufferSource | Blob | string): Promise<void>;
     close(): Promise<void>;
}

interface SaveFilePickerOptions {
     suggestedName?: string;
     types?: Array<{
          description?: string;
          accept: Record<string, string[]>;
     }>;
}
