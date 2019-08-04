export class EditorService {
    constructor() { }

    public getSelectedText(textarea: HTMLElement): string {
        const selection: Selection = window.getSelection();
        const startContainer: Node = selection.getRangeAt(0).startContainer.parentElement;
        const endContainer: Node = selection.getRangeAt(0).endContainer.parentElement;
        const textareaChildren: Node[] = Array.from(textarea.querySelector('.editable-textarea').children);
        const startIndex: number = textareaChildren.findIndex(node => node.isSameNode(startContainer));
        const endIndex: number = textareaChildren.findIndex(node => node.isSameNode(endContainer));

        return textareaChildren
            .slice(startIndex, endIndex + 1)
            .map(node => node.textContent)
            .join('');
    }

    public getSelectedElements(textarea: HTMLElement): Node[] {
        const selection: Selection = window.getSelection();
        const startContainer: Node = selection.getRangeAt(0).startContainer.parentElement;
        const endContainer: Node = selection.getRangeAt(0).endContainer.parentElement;
        const textareaChildren: Node[] = Array.from(textarea.querySelector('.editable-textarea').children);
        const startIndex: number = textareaChildren.findIndex(node => node.isSameNode(startContainer));
        const endIndex: number = textareaChildren.findIndex(node => node.isSameNode(endContainer));

        return textareaChildren.slice(startIndex, endIndex + 1);
    }
}
