import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EditableTextareaService, ProcessNodeReturnType } from './editable-textarea-service';

type TextareaCallbackFunction = (text: string) => void;

interface InputEvent {
  data: string;
  target: HTMLElement;
}

interface PresentProcessResultToDomParams {
  nodeToBeProcessed: ChildNode;
  processedResult: ProcessNodeReturnType;
  textareaElement: HTMLElement;
}

@Component({
  selector: 'app-editable-textarea',
  templateUrl: './editable-textarea.component.html',
  styleUrls: ['./editable-textarea.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: EditableTextareaComponent, multi: true },
    EditableTextareaService
  ]
})
export class EditableTextareaComponent implements ControlValueAccessor {
  @ViewChild('editableTextarea') private textarea: ElementRef;
  private onChange: TextareaCallbackFunction;

  constructor(private renderer: Renderer2, private editableTextareaService: EditableTextareaService) { }

  public writeValue(value: string): void {
    this.renderer.setProperty(this.textarea.nativeElement, 'value', value);
  }

  public registerOnChange(fn: TextareaCallbackFunction): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void { }

  public change(event: InputEvent): void {
    const target: HTMLElement = event.target;

    this.handleTextareaDomChanges(target);
    this.onChange(target.innerText);
  }

  private handleTextareaDomChanges(target: HTMLElement): void {
    const childNodes: NodeListOf<ChildNode> = target.childNodes;
    const length: number = childNodes.length;
    const self = this;

    if (target.textContent.length !== 0) {
      if (length <= 1000) {
        childNodes.forEach(handlingFn);
      } else {
        self.boostTextareaDomChangesHandling(childNodes, length, handlingFn);
      }

      return;
    }

    childNodes.forEach(node => node.remove());

    function handlingFn(nodeToBeProcessed: ChildNode): void {
      const processedResult: ProcessNodeReturnType = self.editableTextareaService.processNode(nodeToBeProcessed);
      const textareaElement: HTMLElement = self.textarea.nativeElement;

      self.presentProcessedResultToDom({ nodeToBeProcessed, processedResult, textareaElement });
    }
  }

  // Duff's device. Potentially could be useful for a huuuge number of iterations.
  // (tried to work around with deferred iteration handlers, but some issues occur - probably, need more time for that)
  private boostTextareaDomChangesHandling(childNodes: NodeListOf<ChildNode>, length: number, handlingFn: (node: ChildNode) => void): void {
    let iterations: number = length % 8;
    let i = length - 1;

    while (iterations) {
      handlingFn(childNodes[i--]);
      iterations--;
    }

    iterations = Math.floor(length / 8);

    while (iterations) {
      handlingFn(childNodes[i--]);
      handlingFn(childNodes[i--]);
      handlingFn(childNodes[i--]);
      handlingFn(childNodes[i--]);
      handlingFn(childNodes[i--]);
      handlingFn(childNodes[i--]);
      handlingFn(childNodes[i--]);
      handlingFn(childNodes[i--]);

      iterations--;
    }
  }

  private presentProcessedResultToDom({
    nodeToBeProcessed,
    processedResult,
    textareaElement
  }: PresentProcessResultToDomParams): void {
    if (processedResult instanceof Array) {
      (processedResult as HTMLElement[]).forEach((nodeToAppend: HTMLElement) => {
        this.renderer.insertBefore(textareaElement, nodeToAppend, nodeToBeProcessed);
      });

      this.renderer.removeChild(textareaElement, nodeToBeProcessed);
    }
  }

}
