import { IContent } from "@nteract/core";

export function createNotebookModel(filepath: string, content?: string): IContent<'notebook'> {

    const name = filepath;
    const writable = true;
    const created = "";
    const last_modified = "";

    return {
        name,
        path: filepath,
        type: "notebook",
        writable,
        created,
        last_modified,
        mimetype: "application/x-ipynb+json",
        content: content ? JSON.parse(content) : null,
        format: "json"
    }
}