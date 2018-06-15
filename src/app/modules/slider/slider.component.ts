import { Component, ElementRef, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Thumb } from './thumb';

@Component({
  selector: 'ngx-rslide',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() public max = 100;

  @Input() public min = 0;

  @Input() public step = 1;

  @Input() public set values(vals: Array<number>) {
    this._values = vals.sort((a, b) => a - b);
    this.thumbs = (this._values || [0]).map(this.mapValueToThumb);
  }

  @Output() public valuesChange: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();

  @ViewChild('slider') slider: ElementRef;

  public thumbs: Array<Thumb> = [{val: 0}];

  private _values = [0];

  constructor(private elementRef: ElementRef) { }

  public ngOnInit() {
    this.emitChanges();
  }

  public mousedown(event: any, thumb: Thumb) {
    const item = event.target;

    document.onmousemove = (e) => {
      const conteinerD = this.getContainerDimensions();
      if (e.clientX >= conteinerD.left && e.clientX <= conteinerD.right) {
        const left = e.clientX - conteinerD.left;
        const scale = conteinerD.width / 100;
        const step = this.getPercentStep();
        const percent = Math.round(left / conteinerD.width * 100 / step) * step;

        thumb.val = percent;

      } else if (e.clientX < conteinerD.left) {
        thumb.val = 0;

      } else if (e.clientX > conteinerD.right) {
        thumb.val = 100;

      }
      this.emitChanges();
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }

  public focus(event: any, thumb: Thumb) {
    const { target } = event;

    this.slider.nativeElement.classList.add('focused');

    document.onkeydown = (e) => {
      const step = this.getPercentStep();
      switch (e.which) {
        case 37: { // left
          thumb.val -= step;
          if (thumb.val < 0) { thumb.val = 0; }
          break;
        }

        case 38: // up
        break;

        case 39: { // right
          thumb.val += step;
          if (thumb.val > 100) { thumb.val = 100; }
          break;
        }

        case 40: // down
          break;
      }
    };

    target.onblur = () => {
      document.onkeydown = null;
      this.slider.nativeElement.classList.remove('focused');
    };
  }

  public emitChanges() {
    this._values.splice(0, this._values.length);
    const values = this.thumbs.map(this.mapThumbToValue);
    values.forEach(val => this._values.push(val));
    this.valuesChange.emit(this._values);
}

  public getMax(): number {
    return Math.max.apply(null, this.thumbs.map(thumb => thumb.val));
  }

  public getMin(): number {
    return Math.min.apply(null, this.thumbs.map(thumb => thumb.val));
  }


  public mapThumbToValue = (thumb: Thumb) => {
    return Math.round((thumb.val / 100 * this.getRange()) + this.min);
  }

  private mapValueToThumb = val => {
    if (val < this.min) {
      val = this.min;
    } else if (val > this.max) {
      val = this.max;
    }
    return { val: (val - this.min) / this.getRange() * 100 };
  }

  private getContainerDimensions(): any {
    const rootElement = this.elementRef.nativeElement;
    return rootElement.getBoundingClientRect();
  }

  private getRange(): number {
    return this.max - this.min;
  }

  private getPercentStep(): number {
    return this.step / this.getRange() * 100;
  }
}
