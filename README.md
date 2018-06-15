# ngx-rslide

## Installation

To install slider, run:

```bash
$ npm install ngx-rslide --save
```

## Using slider

You can import slider module in any Angular application by running:

```bash
$ npm install ngx-rslide --save
```

and then add `SliderModule` in your module, for example `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// import SliderModule
import { SliderModule } from './modules/slider/slider.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Declare SliderModule in the 'imports' section of your module
    SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Once slider is imported, you can use it in your Angular application:

`app.component.html`:

```xml
<ngx-rslide [step]="5" [min]="20" [max]="60" [(values)]="values"></ngx-rslide>
```

`app.component.ts`:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  values = [0, 50];
}
```

## Common API

| Property | Description | Default | Type |
|:---|:---|:---|:---|
|`@Input() min`          | The minimum value of the slider | `0` | `number` / `null` |
|`@Input() max`          | The minimum value of the slider | `100` | `number` / `null`
|`@Input() step`         | The values at which the thumb will snap | `1` | `number` / `null`
|`@Input() values`       | Values of slider | `[0]` | `Array<number>` / `null`
|`@Output() valuesChange`| Event emitted when the slider values has changed | | `EventEmitter<Array<number>>`

## License

MIT © [bezzubov egor](mailto:bezzubov.egor@gmail.com)
