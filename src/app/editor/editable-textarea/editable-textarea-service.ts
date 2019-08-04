import { Injectable, Renderer2 } from '@angular/core';

export type ProcessNodeReturnType = ChildNode | ChildNode[] | HTMLElement | HTMLElement[];

@Injectable()
export class EditableTextareaService {
    constructor(private renderer: Renderer2) { }

    public processNode(node: ChildNode): ProcessNodeReturnType  {
      const nodeName = node.nodeName.toLowerCase();
      const textContentLength: number = node.textContent.length;

      if (nodeName === 'span' || nodeName === '#text') {
        if (textContentLength > 0 && !(textContentLength === 1 && nodeName === 'span')) {
          return node.textContent.split('').map((char: string): HTMLElement => {
            let newNode: HTMLElement;

            newNode = this.renderer.createElement('span');
            this.renderer.setProperty(newNode, 'innerText', char);

            return newNode;
          });
        }

        return node;
      }

      return this.getNewLineBreak();
    }

    getNewLineBreak(): HTMLElement[] {
      const elementToBeEditedFurther: HTMLElement = this.renderer.createElement('span');

      this.renderer.setProperty(elementToBeEditedFurther, 'innerText', '\n');

      return [this.renderer.createElement('br'), elementToBeEditedFurther];
    }
}
