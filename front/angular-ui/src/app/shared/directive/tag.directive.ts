import { Directive, ElementRef, Input, Renderer2, OnChanges, SimpleChanges, OnInit, AfterViewInit } from '@angular/core';

import { isNullOrUndefined } from 'util';

enum TagClass {
  PRIMARY = 'app-tag-primary',
  SECONDARY = 'app-tag-secondary',
  SUCCESS = 'app-tag-success',
  DANGER = 'app-tag-danger',
  WARNING = 'app-tag-warning',
  INFO = 'app-tag-info',
}

@Directive({
  selector: '[appTag]'
})
export class TagDirective implements OnInit, OnChanges, AfterViewInit {

  @Input() tagValue: any;
  @Input() tagSuccess: any;
  @Input() tagDanger: any;
  @Input() tagWarning: any;
  @Input() tagInfo: any;
  @Input() tagDefaultType: 'primary'|'secondary' = 'primary';

  private tagMap: Map<any, TagClass>;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(this.element.nativeElement, 'app-tag');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tagValue']) {
      this.changeTag();
    }
  }

  ngAfterViewInit(): void {
    if (isNullOrUndefined(this.tagValue)) {
      this.tagValue = (this.element.nativeElement.innerText as string).trim();
      this.changeTag();
    }
  }

  changeTag(): void {
    this.clearTagClasses();
    this.loadTagMap();
    this.addTagClass();
  }

  private loadTagMap(): void {
    this.tagMap = new Map();
    this.addItemTagMap(String(this.tagSuccess), TagClass.SUCCESS);
    this.addItemTagMap(String(this.tagDanger), TagClass.DANGER);
    this.addItemTagMap(String(this.tagWarning), TagClass.WARNING);
    this.addItemTagMap(String(this.tagInfo), TagClass.INFO);
  }

  private addItemTagMap(tagType: any, tagClass: TagClass): void {
    if (!isNullOrUndefined(tagType)) {
      this.tagMap.set(tagType, tagClass);
    }
  }

  private clearTagClasses(): void {
    Object.values(TagClass).forEach(value => this.renderer.removeClass(this.element.nativeElement, value));
  }

  private addTagClass(): void {
    const className = this.tagMap.has(String(this.tagValue))
      ? this.tagMap.get(String(this.tagValue))
      : ('primary' === this.tagDefaultType ? TagClass.PRIMARY : TagClass.SECONDARY);
    this.renderer.addClass(this.element.nativeElement, className);
  }
}
